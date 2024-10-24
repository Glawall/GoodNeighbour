import * as helpOffersRepo from "../../repositories/helpOffers/getByHelpRequestId";
import { helpRequestExists } from "../../utils";

export const getByHelpRequestId = async (helpRequestId: number) => {
  await helpRequestExists(helpRequestId);
  const helpOffersByRequestId = await helpOffersRepo.getByHelpRequestId(
    helpRequestId
  );
  return helpOffersByRequestId;
};
