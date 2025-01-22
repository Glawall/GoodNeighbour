import { AppError } from "../../errors/AppError";
import * as helpRequestsRepo from "../../repositories/helpRequests";
import { errors } from "../../errors/errors";
import { HelpRequestBody } from "../../db/seeds/data/test/help-requests";

export const createHelpRequest = async (
  authorId: number,
  helpRequestBody: HelpRequestBody
) => {
  // Add mandatory field checks here
  const mandatoryFields = ["title", "help_type", "description", "req_date"];

  for (const field of mandatoryFields) {
    if (!helpRequestBody[field as keyof HelpRequestBody]) {
      throw new AppError(errors.MANDATORY_FIELD_ERROR);
    }
  }

  const newHelpRequest = await helpRequestsRepo.createHelpRequest(
    authorId,
    helpRequestBody
  );

  if (!newHelpRequest) {
    throw new AppError(errors.REPOSITORY_ERROR);
  }

  return newHelpRequest;
};
