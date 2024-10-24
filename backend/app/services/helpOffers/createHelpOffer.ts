import * as helpOffersRepo from "../../repositories/helpOffers";
import { HelpOffer } from "../../db/seeds/data/test/help-offers";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const createHelpOffer = async (
  helperId: number,
  helpOfferBody: HelpOffer
) => {
  if (!helpOfferBody.help_request_id || !helpOfferBody.status) {
    throw new AppError(errors.VALIDATION_ERROR);
  }
  const newHelpOffer = await helpOffersRepo.createHelpOffer(
    helperId,
    helpOfferBody
  );
  if (!newHelpOffer) {
    throw new AppError(errors.REPOSITORY_ERROR);
  }

  return newHelpOffer;
};
