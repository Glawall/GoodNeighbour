import db from "../../connection";

export const removeHelpOffer = async (
  help_request_id: number,
  helper_id: number
): Promise<void> => {
  const query = `
    DELETE FROM help_offers
    WHERE help_request_id = $1 AND helper_id = $2;
  `;

  const values = [help_request_id, helper_id];
  const { rowCount } = await db.query(query, values);
};
