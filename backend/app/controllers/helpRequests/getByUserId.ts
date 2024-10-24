import { Request, Response, NextFunction } from "express";
import * as helpRequestsServices from "../../services/helpRequests";
import { checkValidInput } from "../../utils/checkValidation";

export const getByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.user_id);
    await checkValidInput(userId, "USER");

    const helpRequests = await helpRequestsServices.getByUserId(userId);
    res.status(200).send({ helpRequests });
  } catch (error) {
    next(error);
  }
};
