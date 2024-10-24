import { Request, Response, NextFunction } from "express";
import * as commentsService from "../../services/comments";
import { checkValidInput } from "../../utils/checkValidation";
import { commentExists } from "../../utils";
import { checkAuthorization } from "../../utils/checkAuthorization";

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestId = Number(req.params.help_request_id);
    const commentId = Number(req.params.comment_id);
    const { description } = req.body;
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(commentId, "COMMENT");
    const comment = await commentExists(commentId);
    if (comment) {
      await checkAuthorization(comment, authUserId, "COMMENT_UPDATE");
    }

    const updatedComment = await commentsService.updateComment(
      helpRequestId,
      commentId,
      description
    );
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};
