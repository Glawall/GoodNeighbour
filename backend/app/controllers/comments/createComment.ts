import { Request, Response, NextFunction } from "express";
import * as commentsService from "../../services/comments";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { NewCommentBody } from "../../db/seeds/data/test/comments";
import { checkValidInput } from "../../utils/checkValidation";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestId = Number(req.params.help_request_id);
    const { description }: NewCommentBody = req.body;
    const parentId = req.params.parent_id ? Number(req.params.parent_id) : null;
    if (!authUserId) {
      throw new AppError(errors.AUTHORISATION_ERROR);
    }
    await checkValidInput(authUserId, "USER");
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    if (Number.isNaN(parentId)) {
      throw new AppError(errors.VALIDATION_ERROR);
    }
    if (!description) {
      throw new AppError(errors.MANDATORY_FIELD_ERROR);
    }

    const newComment = {
      author_id: authUserId,
      help_request_id: helpRequestId,
      parent_id: parentId,
      description,
    };

    const newCommentBody = await commentsService.createComment(newComment);
    res.status(201).send({ newCommentBody });
  } catch (error) {
    next(error);
  }
};
