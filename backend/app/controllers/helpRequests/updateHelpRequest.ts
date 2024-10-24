import { Request, Response, NextFunction } from "express";
import * as helpRequestsServices from "../../services/helpRequests";
import { checkValidInput } from "../../utils/checkValidation";

export const updateHelpRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    const helpRequestBody = req.body;
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");
    const updatedHelpRequest = await helpRequestsServices.updateHelpRequest(
      authUserId,
      helpRequestId,
      helpRequestBody
    );
    res.status(200).send({ updatedHelpRequest });
  } catch (error) {
    next(error);
  }
};
