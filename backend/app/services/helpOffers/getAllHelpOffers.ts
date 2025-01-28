import * as helpOffersRepo from "../../repositories/helpOffers";

export const getAllHelpOffers = async () => {
  const helpOffers = await helpOffersRepo.getAllHelpOffers();
  return helpOffers;
};
