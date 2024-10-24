import * as commentsRepo from "../../repositories/comments";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { NewCommentBody } from "../../db/seeds/data/test/comments";
import { commentExists, helpRequestExists } from "../../utils";
export const updateComment = async (
  helpRequestId: number,
  commentId: number,
  commentBody: NewCommentBody
) => {
  await commentExists(commentId);
  await helpRequestExists(helpRequestId);

  if (!commentBody) {
    throw new AppError(errors.MANDATORY_FIELD_ERROR);
  }

  const updatedComment = await commentsRepo.updateComment(
    commentId,
    commentBody
  );

  return updatedComment;
};
