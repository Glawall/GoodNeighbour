import db from "../../connection";
import { HelpRequest } from "../../db/seeds/data/test/help-requests";

export const getByUserId = async (userId: number): Promise<HelpRequest[]> => {
  const { rows } = await db.query(
    "SELECT * FROM help_requests WHERE author_id =$1",
    [userId]
  );
  return rows;
};
