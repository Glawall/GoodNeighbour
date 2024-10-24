import { Request, Response, NextFunction } from "express";
import * as usersService from "../../services/users";
import { checkValidInput } from "../../utils/checkValidation";

export const getByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.user_id);
    await checkValidInput(userId, "USER");
    const user = await usersService.getByUserId(userId);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
