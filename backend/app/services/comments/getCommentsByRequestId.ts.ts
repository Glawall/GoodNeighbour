import * as commentsRepo from "../../repositories/comments";
import { threadComments } from "../../utils/threadComments";
import { helpRequestExists } from "../../utils";

export const getCommentsByRequestId = async (helpRequestId: number) => {
  await helpRequestExists(helpRequestId);

  const comments = await commentsRepo.getCommentsByRequestId(helpRequestId);
  return threadComments(comments);
};
