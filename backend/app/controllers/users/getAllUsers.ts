import { Request, Response, NextFunction } from "express";
import * as usersService from "../../services/users";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};
