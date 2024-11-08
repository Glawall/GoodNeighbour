import db from "../../connection";
import { HelpType } from "../../db/seeds/data/test/help-types";

export const getByHelpTypeId = async (
  helpTypeId: number
): Promise<HelpType[]> => {
  const { rows } = await db.query("SELECT * FROM help_types WHERE id =$1", [
    helpTypeId,
  ]);
  return rows[0];
};
