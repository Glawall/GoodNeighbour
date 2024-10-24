import db from "../../connection";
import { Comment, NewCommentBody } from "../../db/seeds/data/test/comments";

export const updateComment = async (
  commentId: number,
  commentBody: NewCommentBody
): Promise<Comment> => {
  const query = "UPDATE comments SET description = $1 WHERE id=$2 RETURNING *";
  const values = [commentBody, commentId];
  const { rows } = await db.query(query, values);
  return rows[0];
};
