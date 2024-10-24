import db from "../../connection";

export const getByHelpRequestIdAndHelperId = async (
  helpRequestId: number,
  helperId: number
) => {
  const query = `
      SELECT * FROM help_offers
      WHERE help_request_id = $1 AND helper_id = $2
    `;
  const { rows } = await db.query(query, [helpRequestId, helperId]);
  return rows[0];
};
