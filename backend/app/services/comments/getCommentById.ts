import { commentExists, helpRequestExists } from "../../utils";

export const getCommentById = async (
  helpRequestId: number,
  commentId: number
) => {
  await helpRequestExists(helpRequestId);
  const comment = await commentExists(commentId);
  return comment;
};
