import { Request, Response, NextFunction } from "express";
import * as helpOffersService from "../../services/helpOffers/getByHelpRequestId";
import { checkValidInput } from "../../utils/checkValidation";

export const getByHelpRequestId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");

    const helpOffers = await helpOffersService.getByHelpRequestId(
      helpRequestId
    );
    res.status(200).send({ helpOffers });
  } catch (error) {
    next(error);
  }
};
