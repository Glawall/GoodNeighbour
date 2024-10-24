import { AppError, ErrorObj } from "../errors/AppError";
import { errors } from "../errors/errors";
import * as commentsRepo from "../repositories/comments";
import * as helpRequestsRepo from "../repositories/helpRequests";
import * as helpOffersRepo from "../repositories/helpOffers";
import * as usersRepo from "../repositories/users";

export const checkExists = async (
  getById: (id: number) => Promise<any>,
  id: number,
  errorObj: ErrorObj
) => {
  const result = await getById(id);
  if (
    !result ||
    (Array.isArray(result) && result.length === 0) ||
    (Array.isArray(result.helpRequestOffersRows) &&
      result.helpRequestOffersRows.length === 0)
  ) {
    throw new AppError(errorObj);
  }
  return result;
};

export const helpRequestExists = async (help_request_id: number) => {
  return await checkExists(
    helpRequestsRepo.getByHelpRequestId,
    help_request_id,
    errors.HELP_REQUEST_NOT_FOUND
  );
};

export const commentExists = async (comment_id: number) => {
  return await checkExists(
    commentsRepo.getCommentById,
    comment_id,
    errors.COMMENT_NOT_FOUND
  );
};

export const helpOfferExists = async (
  help_request_id: number,
  helperId: number
) => {
  return await checkExists(
    async (id: number) =>
      helpOffersRepo.getByHelpRequestIdAndHelperId(help_request_id, helperId),
    help_request_id,
    errors.HELP_OFFER_NOT_FOUND
  );
};

export const userExists = async (user_id: number) => {
  return await checkExists(
    usersRepo.getByUserId,
    user_id,
    errors.USER_NOT_FOUND
  );
};
