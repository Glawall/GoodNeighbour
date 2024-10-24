import db from "../../connection";
import { HelpRequest } from "../../db/seeds/data/test/help-requests";

export const getAllHelpRequests = async (): Promise<HelpRequest[]> => {
  const { rows } = await db.query(`SELECT * FROM help_requests`);
  return rows;
};
