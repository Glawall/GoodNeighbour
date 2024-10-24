import * as helpRequestsRepo from "../../repositories/helpRequests";

export const getAllHelpRequests = async () => {
  const allHelpRequests = await helpRequestsRepo.getAllHelpRequests();
  return allHelpRequests;
};
