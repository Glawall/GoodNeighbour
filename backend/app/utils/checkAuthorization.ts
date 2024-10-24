import { AppError } from "../errors/AppError";
import { errors } from "../errors/errors";

interface Result {
  id: number;
  author_id: number;
}

type ResultType =
  | "HELP_OFFER_DELETE"
  | "HELP_REQUEST_DELETE"
  | "COMMENT_DELETE"
  | "HELP_OFFER_UPDATE"
  | "HELP_REQUEST_UPDATE"
  | "COMMENT_UPDATE";

export const checkAuthorization = (
  result: Result,
  author_id: number,
  resultType: ResultType
): void => {
  if (result.author_id !== author_id) {
    switch (resultType) {
      case "COMMENT_UPDATE":
        throw new AppError(errors.COMMENT_UPDATE_AUTHORISATION_ERROR);
      case "HELP_OFFER_UPDATE":
        throw new AppError(errors.HELP_OFFER_UPDATE_AUTHORISATION_ERROR);
      case "HELP_REQUEST_UPDATE":
        throw new AppError(errors.HELP_REQUEST_UPDATE_AUTHORISATION_ERROR);
      case "COMMENT_DELETE":
        throw new AppError(errors.COMMENT_DELETE_AUTHORISATION_ERROR);
      case "HELP_OFFER_DELETE":
        throw new AppError(errors.HELP_OFFER_DELETE_AUTHORISATION_ERROR);
      case "HELP_REQUEST_DELETE":
        throw new AppError(errors.HELP_REQUEST_DELETE_AUTHORISATION_ERROR);
      default:
        throw new AppError(errors.AUTHORISATION_ERROR);
    }
  }
};
