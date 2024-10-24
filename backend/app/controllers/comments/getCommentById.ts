import { Request, Response, NextFunction } from "express";
import * as commentsService from "../../services/comments";
import { commentExists } from "../../utils/checkExists";
import { checkValidInput } from "../../utils/checkValidation";

export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpRequestId = Number(req.params.help_request_id);
    const commentId = Number(req.params.comment_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(commentId, "COMMENT");
    await commentExists(commentId);

    const comment = await commentsService.getCommentById(
      helpRequestId,
      commentId
    );

    res.status(200).send({ comment });
  } catch (error) {
    next(error);
  }
};
