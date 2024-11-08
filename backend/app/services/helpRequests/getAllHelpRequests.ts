import * as helpRequestsRepo from "../../repositories/helpRequests";

export const getAllHelpRequests = async (
  sort_by: string,
  order: string,
  help_type: string
) => {
  const allHelpRequests = await helpRequestsRepo.getAllHelpRequests(
    sort_by,
    order,
    help_type
  );
  return allHelpRequests;
};
