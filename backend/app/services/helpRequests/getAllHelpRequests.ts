import * as helpRequestsRepo from "../../repositories/helpRequests";
import { helpTypeExists } from "../../utils";
import { getHelpTypeId } from "../../utils/preloadHelpTypes";
export const getAllHelpRequests = async (
  sort_by: string,
  order: string,
  help_type: string
) => {
  if (help_type) {
    const helpTypeId = getHelpTypeId(help_type);
    if (helpTypeId) {
      await helpTypeExists(helpTypeId);
    }
  }

  const allHelpRequests = await helpRequestsRepo.getAllHelpRequests(
    sort_by,
    order,
    help_type
  );
  return allHelpRequests;
};
