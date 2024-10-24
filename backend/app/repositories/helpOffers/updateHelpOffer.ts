import db from "../../connection";

export const updateHelpOffer = async (
  help_request_id: number,
  helper_id: number,
  helpOfferBody: any
): Promise<any> => {
  const { status } = helpOfferBody;
  const values = [status, helper_id, help_request_id];

  const query = `
    UPDATE 
        help_offers 
    SET status = $1 
    WHERE helper_id = $2 
    AND help_request_id = $3 
    RETURNING helper_id, help_request_id, status`;

  const { rows } = await db.query(query, values);
  return rows[0];
};
