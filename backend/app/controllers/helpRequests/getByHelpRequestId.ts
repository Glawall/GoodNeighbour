import { Request, Response, NextFunction } from "express";
import * as helpRequestsService from "../../services/helpRequests/getByHelpRequestId";
import { checkValidInput } from "../../utils/checkValidation";

export const getByHelpRequestId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpRequestId = Number(req.params.help_request_id);
    await checkValidInput(helpRequestId, "HELP_REQUEST");

    const helpRequest = await helpRequestsService.getByHelpRequestId(
      helpRequestId
    );

    res.status(200).send({ helpRequest });
  } catch (error) {
    next(error);
  }
};
