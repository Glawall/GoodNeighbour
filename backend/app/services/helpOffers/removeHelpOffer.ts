import * as helpOffersRepo from "../../repositories/helpOffers/removeHelpOffer";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { helpOfferExists, helpRequestExists, userExists } from "../../utils";

export const removeHelpOffer = async (
  helpRequestId: number,
  helperId: number,
  authUserId: number
): Promise<void> => {
  await userExists(helperId);
  await helpOfferExists(helpRequestId, helperId);

  const request = await helpRequestExists(helpRequestId);
  const requesterUserId = request.author_id;

  if (!(requesterUserId === authUserId || helperId === authUserId)) {
    throw new AppError(errors.AUTHORISATION_ERROR);
  }

  await helpOffersRepo.removeHelpOffer(helpRequestId, helperId);
};
