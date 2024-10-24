import { Request, Response, NextFunction } from "express";
import * as commentsService from "../../services/comments";
import { checkValidInput } from "../../utils/checkValidation";
import { commentExists } from "../../utils";
import { checkAuthorization } from "../../utils/checkAuthorization";

export const removeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestId = Number(req.params.help_request_id);
    const commentId = Number(req.params.comment_id);

    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(commentId, "COMMENT");
    const comment = await commentExists(commentId);
    if (comment) {
      checkAuthorization(comment, authUserId, "COMMENT_DELETE");
    }

    await commentsService.removeComment(helpRequestId, commentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
