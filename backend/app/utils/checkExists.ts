import { AppError, ErrorObj } from "../errors/AppError";
import { errors } from "../errors/errors";
import * as commentsRepo from "../repositories/comments";
import * as helpRequestsRepo from "../repositories/helpRequests";
import * as helpOffersRepo from "../repositories/helpOffers";
import * as usersRepo from "../repositories/users";
import * as helpTypesRepo from "../repositories/helpTypes";

export const checkExists = async (
  getById: (id: number, helperId: number) => Promise<any>,
  id: number,
  errorObj: ErrorObj,
  helperId?: number
) => {
  const result = await getById(id, helperId!);
  if (
    !result ||
    (Array.isArray(result) && result.length === 0) ||
    (Array.isArray(result.request) && result.request.length === 0)
  ) {
    throw new AppError(errorObj);
  }
  return result.request ? result.request[0] : result;
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
  helper_id: number
) => {
  return await checkExists(
    helpOffersRepo.getByHelpRequestIdAndHelperId,
    help_request_id,
    errors.HELP_OFFER_NOT_FOUND,
    helper_id
  );
};

export const userExists = async (user_id: number) => {
  return await checkExists(
    usersRepo.getByUserId,
    user_id,
    errors.USER_NOT_FOUND
  );
};

export const helpTypeExists = async (help_type_id: number) => {
  return await checkExists(
    helpTypesRepo.getByHelpTypeId,
    help_type_id,
    errors.HELP_TYPE_NOT_FOUND
  );
};
