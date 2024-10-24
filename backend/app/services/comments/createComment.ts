import * as commentsRepo from "../../repositories/comments";
import { NewCommentBody } from "../../db/seeds/data/test/comments";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { helpRequestExists } from "../../utils";

export const createComment = async (newCommentBody: NewCommentBody) => {
  await helpRequestExists(newCommentBody.help_request_id);
  if (newCommentBody.parent_id !== null) {
    const comments = await commentsRepo.getCommentsByRequestId(
      newCommentBody.help_request_id
    );
    const parentComment = comments.find(
      (comment) => comment.id === newCommentBody.parent_id
    );
    if (!parentComment) {
      throw new AppError(errors.COMMENT_NOT_FOUND);
    }
  }

  const newComment = await commentsRepo.createComment(newCommentBody);

  if (!newComment) {
    throw new AppError(errors.REPOSITORY_ERROR);
  }
  return newComment;
};
