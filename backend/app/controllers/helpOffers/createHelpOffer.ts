import { Request, Response, NextFunction } from "express";
import * as helpOffersService from "../../services/helpOffers";
import { HelpOffer } from "../../db/seeds/data/test/help-offers";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { checkValidInput } from "../../utils/checkValidation";

export const createHelpOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helperId: number = Number(req.params.user_id);
    await checkValidInput(helperId, "USER");
    const helpOfferBody: HelpOffer = req.body;
    const newHelpOffer = await helpOffersService.createHelpOffer(
      helperId,
      helpOfferBody
    );
    if (authUserId !== helperId) {
      throw new AppError(errors.AUTHORISATION_ERROR);
    }
    res.status(201).send({ newHelpOffer });
  } catch (error) {
    next(error);
  }
};
