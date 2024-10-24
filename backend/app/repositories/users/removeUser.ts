import db from "../../connection";

export const removeUser = async (user_id: any) => {
  const query = `DELETE FROM users WHERE id =$1`;

  const result = await db.query(query, [user_id]);
  return result;
};
