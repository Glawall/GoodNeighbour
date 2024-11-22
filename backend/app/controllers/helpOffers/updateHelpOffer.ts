import { Request, Response, NextFunction } from "express";
import { checkValidInput } from "../../utils/checkValidation";
import * as helpOffersService from "../../services/helpOffers";
export const updateHelpOffer = async (
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
    const updatedHelpOffer = await helpOffersService.updateHelpOffer(
      helpRequestId,
      helperId,
      authUserId,
      req.body
    );

    res.status(200).send({ updatedHelpOffer });
  } catch (error) {
    next(error);
  }
};
