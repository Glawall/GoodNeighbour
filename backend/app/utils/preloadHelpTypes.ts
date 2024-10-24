import db from "../connection";

let helpTypesCache: { [key: string]: number } = {};

export const preloadHelpTypes = async () => {
  const { rows } = await db.query("SELECT id, name FROM help_types");
  rows.forEach((row: { id: number; name: string }) => {
    helpTypesCache[row.name] = row.id;
  });
};

export const getHelpTypeId = (help_type: string): number | null => {
  return helpTypesCache[help_type] || null;
};
