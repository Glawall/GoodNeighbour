import { Request, Response, NextFunction } from "express";
import * as usersService from "../../services/users";
import { User } from "../../db/seeds/data/test/users";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBody: User = req.body;
    const newUser = await usersService.createUser(userBody);
    res.status(201).send({ newUser });
  } catch (error) {
    next(error);
  }
};
