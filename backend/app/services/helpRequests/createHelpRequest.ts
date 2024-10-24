import { AppError } from "../../errors/AppError";
import * as helpRequestsRepo from "../../repositories/helpRequests";
import { errors } from "../../errors/errors";
import { HelpRequestBody } from "../../db/seeds/data/test/help-requests";

export const createHelpRequest = async (
  author_id: number,
  helpOfferBody: HelpRequestBody
) => {
  const newHelpRequest = await helpRequestsRepo.createHelpRequest(
    author_id,
    helpOfferBody
  );
  if (!newHelpRequest) {
    throw new AppError(errors.REPOSITORY_ERROR);
  }
  return newHelpRequest;
};
