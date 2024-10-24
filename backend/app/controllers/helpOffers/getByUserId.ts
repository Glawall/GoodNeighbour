import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as helpOffersService from "../../services/helpOffers/getByUserId";
import { checkValidInput } from "../../utils/checkValidation";

export const getByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const userId = Number(req.params.user_id);
    await checkValidInput(userId, "USER");
    if (authUserId !== userId) {
      throw new AppError(errors.AUTHORISATION_ERROR);
    }
    const userHelpOffers = await helpOffersService.getByUserId(userId);
    res.status(200).send({ userHelpOffers });
  } catch (error) {
    next(error);
  }
};
