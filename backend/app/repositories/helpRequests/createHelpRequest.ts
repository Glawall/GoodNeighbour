import db from "../../connection";
import { HelpRequestBody } from "../../db/seeds/data/test/help-requests";
import { getHelpTypeId } from "../../utils/preloadHelpTypes";

export const createHelpRequest = async (
  authorId: number,
  helpRequestBody: HelpRequestBody
): Promise<HelpRequestBody> => {
  const { title, help_type, description, req_date } = helpRequestBody;

  const helpTypeId = getHelpTypeId(help_type);

  const query = `INSERT INTO help_requests (title, author_id, help_type_id, description, req_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [title, authorId, helpTypeId, description, req_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};
