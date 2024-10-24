import db from "../../connection";

export const removeComment = async (commentId: number): Promise<void> => {
  const query = "DELETE FROM comments WHERE id =$1";
  const values = [commentId];
  await db.query(query, values);
};
