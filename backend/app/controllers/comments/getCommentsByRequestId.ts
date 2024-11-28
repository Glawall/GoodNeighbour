import { Request, Response, NextFunction } from "express";
import * as commentsService from "../../services/comments";
import { checkValidInput } from "../../utils/checkValidation";

export const getCommentsByRequestId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    const comments = await commentsService.getCommentsByRequestId(
      helpRequestId
    );
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
