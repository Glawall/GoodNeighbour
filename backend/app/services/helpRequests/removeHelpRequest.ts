import * as helpRequestsRepo from "../../repositories/helpRequests";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { helpRequestExists } from "../../utils";

export const removeHelpRequest = async (
  helpRequestId: number,
  AuthUserId: number
): Promise<void> => {
  const request = await helpRequestExists(helpRequestId);

  const requesterUserId = request.author_id;

  if (requesterUserId !== AuthUserId) {
    throw new AppError(errors.HELP_REQUEST_DELETE_AUTHORISATION_ERROR);
  }
  await helpRequestsRepo.removeHelpRequest(helpRequestId);
};
