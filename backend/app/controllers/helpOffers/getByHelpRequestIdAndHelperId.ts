import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as helpOffersService from "../../services/helpOffers";
import { checkValidInput } from "../../utils/checkValidation";

export const getByHelpRequestIdAndHelperId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestId = Number(req.params.help_request_id);
    const helperId = Number(req.params.helper_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(helperId, "USER");

    if (authUserId !== helperId) {
      throw new AppError(errors.AUTHORISATION_ERROR);
    }

    const helpOffer = await helpOffersService.getByHelpRequestIdAndHelperId(
      helpRequestId,
      helperId
    );
    res.status(200).send({ helpOffer });
  } catch (error) {
    next(error);
  }
};
