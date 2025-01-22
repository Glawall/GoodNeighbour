import { Request, Response, NextFunction } from "express";
import * as authService from "../../services/auth/login";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(errors.MANDATORY_FIELD_ERROR);
    }

    const result = await authService.login({ email, password });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
