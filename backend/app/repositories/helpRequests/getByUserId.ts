import db from "../../connection";

export const getByUserId = async (userId: number): Promise<any> => {
  const helpRequests = await db.query(
    `SELECT
      help_requests.*,
      help_types.name as help_type_name
    FROM help_requests
    JOIN help_types ON help_types.id = help_requests.help_type_id
    WHERE help_requests.author_id = $1`,
    [userId]
  );

  const helpOffers = await db.query(
    `SELECT
      help_offers.help_request_id,
      help_offers.status,
      help_offers.created_at,
      help_offers.helper_id,
      users.username as helper_username,
      users.email as helper_email,
      users.avatar_url as helper_avatar_url
    FROM help_offers
    JOIN users ON help_offers.helper_id = users.id
    WHERE help_request_id IN (
      SELECT id FROM help_requests WHERE author_id = $1
    )`,
    [userId]
  );

  return {
    helpRequests: helpRequests.rows,
    helpOffers: helpOffers.rows,
  };
};
