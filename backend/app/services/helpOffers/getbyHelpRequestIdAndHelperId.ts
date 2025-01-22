import * as helpOffersRepo from "../../repositories/helpOffers";
import { helpRequestExists, userExists } from "../../utils";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const getByHelpRequestIdAndHelperId = async (
  helpRequestId: number,
  helperId: number
) => {
  await helpRequestExists(helpRequestId);
  await userExists(helperId);
  const helpOffer = await helpOffersRepo.getByHelpRequestIdAndHelperId(
    helpRequestId,
    helperId
  );

  if (!helpOffer) {
    throw new AppError(errors.HELP_OFFER_NOT_FOUND);
  }

  return helpOffer;
};
