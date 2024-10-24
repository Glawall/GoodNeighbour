import * as commentsRepo from "../../repositories/comments";
import { helpRequestExists, commentExists } from "../../utils";

export const removeComment = async (
  helpRequestId: number,
  commentId: number
) => {
  await helpRequestExists(helpRequestId);
  await commentExists(commentId);

  await commentsRepo.removeComment(commentId);
};
