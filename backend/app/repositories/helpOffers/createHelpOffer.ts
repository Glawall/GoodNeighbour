import db from "../../connection";
import { HelpOffer } from "../../db/seeds/data/test/help-offers";

export const createHelpOffer = async (
  helperId: number,
  helpOfferBody: HelpOffer
): Promise<HelpOffer> => {
  const { status, help_request_id } = helpOfferBody;

  const query = `
    INSERT INTO help_offers
    (helper_id, help_request_id, status)
    VALUES ($1, $2, $3)
    RETURNING helper_id, help_request_id, status
    `;

  const values = [helperId, help_request_id, status];

  const { rows } = await db.query(query, values);

  return rows[0];
};
