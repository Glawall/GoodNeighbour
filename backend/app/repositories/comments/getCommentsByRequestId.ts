import db from "../../connection";
import { Comment } from "../../db/seeds/data/test/comments";

export const getCommentsByRequestId = async (
  helpRequestId: number
): Promise<Comment[]> => {
  console.log(helpRequestId);
  const query =
    "SELECT * FROM comments WHERE help_request_id =$1 ORDER BY created_at";
  const values = [helpRequestId];
  const { rows } = await db.query(query, values);
  return rows;
};
