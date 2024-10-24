import { HelpRequestBody } from "../../db/seeds/data/test/help-requests";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as helpRequestsRepo from "../../repositories/helpRequests";
import { helpRequestExists } from "../../utils";

export const updateHelpRequest = async (
  authUserId: number,
  helpRequestId: number,
  helpRequestBody: HelpRequestBody
) => {
  const { request } = await helpRequestExists(helpRequestId);
  const requester = request[0];
  const requesterUserId = requester.author_id;

  if (requesterUserId !== authUserId) {
    throw new AppError(errors.HELP_REQUEST_UPDATE_AUTHORISATION_ERROR);
  }

  const helpRequest = await helpRequestsRepo.updateHelpRequest(
    authUserId,
    helpRequestId,
    helpRequestBody
  );

  return helpRequest;
};
