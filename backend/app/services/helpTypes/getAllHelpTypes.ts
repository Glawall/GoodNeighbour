import * as helpTypesRepo from "../../repositories/helpTypes";

export const getAllHelpTypes = async () => {
  const allHelpTypes = await helpTypesRepo.getAllHelpTypes();
  return allHelpTypes;
};
