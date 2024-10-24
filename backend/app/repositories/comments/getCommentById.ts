import db from "../../connection";
import { Comment } from "../../db/seeds/data/test/comments";

export const getCommentById = async (commentId: number): Promise<Comment> => {
  const query = "SELECT * FROM comments WHERE id=$1;";
  const values = [commentId];
  const { rows } = await db.query(query, values);
  return rows[0];
};
