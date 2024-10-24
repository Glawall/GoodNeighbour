import { Request, Response, NextFunction } from "express";
import * as helpRequestsServices from "../../services/helpRequests";
import { checkValidInput } from "../../utils/checkValidation";

export const removeHelpRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    await checkValidInput(authUserId, "USER");
    await helpRequestsServices.removeHelpRequest(helpRequestId, authUserId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
