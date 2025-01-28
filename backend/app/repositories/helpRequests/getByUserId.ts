import db from "../../connection";
import { HelpRequest } from "../../db/seeds/data/test/help-requests";

export const getByUserId = async (userId: number): Promise<any[]> => {
  const { rows } = await db.query(
    `SELECT 
      help_requests.*,
      help_offers.help_request_id,
      help_offers.status as offer_status,
      help_offers.created_at as offer_created_at,
      help_offers.helper_id,
      users.username as helper_username,
      users.email as helper_email,
      users.avatar_url as helper_avatar_url
    FROM help_requests
    LEFT JOIN help_offers ON help_requests.id = help_offers.help_request_id
    LEFT JOIN users ON help_offers.helper_id = users.id
    WHERE help_requests.author_id = $1`,
    [userId]
  );
  return rows;
};
