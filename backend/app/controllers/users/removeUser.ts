import { Request, Response, NextFunction } from "express";
import * as userServices from "../../services/users";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import { checkValidInput } from "../../utils/checkValidation";

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.user_id);
    await checkValidInput(userId, "USER");
    const authUserId = Number(req.header("X-User-ID"));
    if (authUserId !== userId) {
      throw new AppError(errors.USER_DELETE_AUTHORISATION_ERROR);
    }
    await userServices.removeUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
