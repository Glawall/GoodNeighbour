import db from "../../connection";

export const removeHelpRequest = async (
  helpRequestId: number
): Promise<void> => {
  const query = `DELETE from help_requests WHERE id = $1 `;
  const values = [helpRequestId];
  await db.query(query, values);
};
