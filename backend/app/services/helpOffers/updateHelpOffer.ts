import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as helpOffersRepo from "../../repositories/helpOffers";
import { helpRequestExists, userExists, helpOfferExists } from "../../utils";

export const updateHelpOffer = async (
  helpRequestId: number,
  helperId: number,
  authUserId: number,
  helpOfferBody: any
) => {
  await userExists(helperId);
  const request = await helpRequestExists(helpRequestId);

  const helpOffer = await helpOfferExists(helpRequestId, helperId);
  if (!helpOffer) {
    throw new AppError(errors.HELP_OFFER_NOT_FOUND);
  }
  const requesterUserId = request.author_id;

  if (!(requesterUserId === authUserId || helperId === authUserId)) {
    throw new AppError(errors.AUTHORISATION_ERROR);
  }

  const updatedHelpOffer = await helpOffersRepo.updateHelpOffer(
    helpRequestId,
    helperId,
    helpOfferBody
  );

  return updatedHelpOffer;
};
