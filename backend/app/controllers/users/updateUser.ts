import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";
import * as usersService from "../../services/users";
import { checkValidInput } from "../../utils/checkValidation";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.user_id);
    await checkValidInput(userId, "USER");
    const authUserId = Number(req.header("X-User-ID"));
    if (authUserId !== userId) {
      throw new AppError(errors.USER_UPDATE_AUTHORISATION_ERROR);
    }
    const updateBody = req.body;
    const updatedUser = await usersService.updateUser(userId, updateBody);
    res.status(200).send({ updatedUser });
  } catch (error) {
    next(error);
  }
};
