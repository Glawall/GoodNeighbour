import { helpTypeExists } from "../../utils";

export const getByHelpTypeId = async (helpTypeId: number) => {
  const helpType = helpTypeExists(helpTypeId);
  return helpType;
};
