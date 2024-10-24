import { Request, Response, NextFunction } from "express";
import * as helpOffersServices from "../../services/helpOffers/removeHelpOffer";
import { checkValidInput } from "../../utils/checkValidation";

export const removeHelpOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helperId = Number(req.params.helper_id);
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(helperId, "USER");

    await helpOffersServices.removeHelpOffer(
      helpRequestId,
      helperId,
      authUserId
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
