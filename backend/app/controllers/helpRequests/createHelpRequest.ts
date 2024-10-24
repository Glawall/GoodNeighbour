import { Request, Response, NextFunction } from "express";
import * as helpRequestsService from "../../services/helpRequests/createHelpRequest";
import { HelpRequestBody } from "../../db/seeds/data/test/help-requests";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { userExists } from "../../utils/checkExists";
import { checkValidInput } from "../../utils/checkValidation";

export const createHelpRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = Number(req.header("X-User-ID"));
    await checkValidInput(authUserId, "USER");

    await userExists(authUserId);
    if (!authUserId) {
      throw new AppError(errors.AUTHORISATION_ERROR);
    }

    const helpRequestBody: HelpRequestBody = req.body;
    const newHelpRequest = await helpRequestsService.createHelpRequest(
      authUserId,
      helpRequestBody
    );
    res.status(201).send({ newHelpRequest });
  } catch (error) {
    next(error);
  }
};
