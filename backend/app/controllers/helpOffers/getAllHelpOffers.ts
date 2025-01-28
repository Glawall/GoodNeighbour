import * as helpOffersService from "../../services/helpOffers";
import { Request, Response, NextFunction } from "express";

export const getAllHelpOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpOffers = await helpOffersService.getAllHelpOffers();
    res.status(200).send({ helpOffers });
  } catch (error) {
    console.error("Error in getAllHelpOffers:", error);
    next(error);
  }
};
