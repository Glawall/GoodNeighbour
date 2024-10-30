import db from "../../connection";
import { HelpRequest } from "../../db/seeds/data/test/help-requests";

export const getAllHelpRequests = async (): Promise<HelpRequest[]> => {
  const { rows } = await db.query(`
    SELECT 
      help_requests.id AS id,
      help_requests.description,
      help_requests.created_at,
      help_requests.help_type_id,
      help_requests.req_date,
      help_requests.status,
      help_requests.title,
      help_requests.author_id,
      users.first_name AS author_first_name,
      users.last_name AS author_last_name,
      users.username AS author_username,
      users.address AS author_address,
      users.postcode AS author_postcode,
      users.longitude AS author_longitude,
      users.latitude AS author_latitude
    FROM 
      help_requests
    LEFT JOIN 
      users 
    ON 
      help_requests.author_id = users.id
  `);
  return rows;
};
