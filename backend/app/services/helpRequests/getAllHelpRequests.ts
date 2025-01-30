import * as helpRequestsRepo from "../../repositories/helpRequests";
import { helpTypeExists } from "../../utils";
import { getHelpTypeId } from "../../utils/preloadHelpTypes";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const getAllHelpRequests = async (
  sort_by: string = "req_date",
  order: string = "desc",
  help_type?: string
) => {
  if (help_type) {
    const helpTypeId = getHelpTypeId(help_type);
    if (helpTypeId) {
      await helpTypeExists(helpTypeId);
    }
  }

  const validSortColumns = ["author_username", "help_type", "req_date"];
  const validOrders = ["desc", "asc"];

  if (!validSortColumns.includes(sort_by)) {
    throw new AppError(errors.VALIDATION_ERROR);
  }

  if (!validOrders.includes(order)) {
    throw new AppError(errors.VALIDATION_ERROR);
  }

  const helpRequests = await helpRequestsRepo.getAllHelpRequests(
    sort_by,
    order,
    help_type
  );
  return helpRequests;
};
