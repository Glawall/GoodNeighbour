import * as helpOffersRepo from "../../repositories/helpOffers";
import { helpOfferExists, helpRequestExists, userExists } from "../../utils";

export const getByHelpRequestIdAndHelperId = async (
  helpRequestId: number,
  helperId: number
) => {
  await helpRequestExists(helpRequestId);
  await userExists(helperId);
  await helpOfferExists(helpRequestId, helperId);
  const helpOffersByRequestId =
    await helpOffersRepo.getByHelpRequestIdAndHelperId(helpRequestId, helperId);
  return helpOffersByRequestId;
};
