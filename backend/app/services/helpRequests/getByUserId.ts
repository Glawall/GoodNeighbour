import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as helpRequestsRepo from "../../repositories/helpRequests";
import { userExists } from "../../utils";

export const getByUserId = async (userId: number) => {
  await userExists(userId);

  const helpRequest = await helpRequestsRepo.getByUserId(userId);
  if (!helpRequest) {
    throw new AppError(errors.HELP_REQUEST_NOT_FOUND);
  }
  return helpRequest;
};
