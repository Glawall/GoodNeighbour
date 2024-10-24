import db from "../../connection";
import { HelpType } from "../../db/seeds/data/test/help-types";

export const getAllHelpTypes = async (): Promise<HelpType[]> => {
  const { rows } = await db.query("SELECT * from help_types");
  return rows;
};
