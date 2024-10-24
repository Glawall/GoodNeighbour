import db from "../../connection";
import { HelpOffer } from "../../db/seeds/data/test/help-offers";

export const getByHelpRequestId = async (
  helpRequestId: number
): Promise<HelpOffer[]> => {
  const { rows } = await db.query(
    `SELECT
            users.id AS user_id,
            users.first_name,
            users.address,
            users.email,
            users.phone_number,
            help_requests.id AS help_request_id,
            help_offers.status
        FROM
            users
        LEFT JOIN
            help_offers
        ON
            help_offers.helper_id = users.id
        LEFT JOIN
            help_requests
        ON
            help_requests.id = help_offers.help_request_id
        WHERE
            help_requests.id = $1`,
    [helpRequestId]
  );
  return rows;
};
