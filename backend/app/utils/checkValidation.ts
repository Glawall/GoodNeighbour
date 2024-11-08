import { AppError } from "../errors/AppError";
import { errors } from "../errors/errors";

type ResultType =
  | "USER"
  | "HELP_OFFER"
  | "HELP_REQUEST"
  | "COMMENT"
  | "HELP_TYPE";

export const checkValidInput = async (id: number, resultType: ResultType) => {
  if (isNaN(id)) {
    switch (resultType) {
      case "USER":
        throw new AppError(errors.USER_VALIDATION_ERROR);
      case "HELP_OFFER":
        throw new AppError(errors.HELP_OFFER_VALIDATION_ERROR);
      case "HELP_REQUEST":
        throw new AppError(errors.HELP_REQUEST_VALIDATION_ERROR);
      case "COMMENT":
        throw new AppError(errors.COMMENT_VALIDATION_ERROR);
      case "HELP_TYPE":
        throw new AppError(errors.HELP_TYPE_VALIDATION_ERROR);
      default:
        throw new AppError(errors.VALIDATION_ERROR);
    }
  }
};
