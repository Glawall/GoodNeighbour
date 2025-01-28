import db from "../../connection";

export const getAllHelpOffers = async () => {
  const query = `
    SELECT 
      help_offers.help_request_id,
      help_offers.helper_id,
      help_offers.status as offer_status,
      help_offers.created_at as offer_created_at,
      help_requests.title,
      help_requests.description,
      help_requests.created_at as request_created_at,
      help_requests.req_date,
      help_requests.status as request_status,
      help_requests.help_type_id,
      help_types.name as help_type_name,
      helpers.first_name as helper_first_name,
      helpers.last_name as helper_last_name,
      helpers.postcode as helper_postcode,
      helpers.email as helper_email,
      requesters.first_name as requester_first_name,
      requesters.last_name as requester_last_name,
      requesters.postcode as requester_postcode,
      requesters.email as requester_email
    FROM 
      help_offers
    LEFT JOIN 
      help_requests ON help_offers.help_request_id = help_requests.id
    LEFT JOIN 
      help_types ON help_requests.help_type_id = help_types.id
    LEFT JOIN 
      users as helpers ON help_offers.helper_id = helpers.id
    LEFT JOIN 
      users as requesters ON help_requests.author_id = requesters.id
    ORDER BY 
      help_offers.created_at DESC
  `;

  const { rows } = await db.query(query);
  return rows;
};
