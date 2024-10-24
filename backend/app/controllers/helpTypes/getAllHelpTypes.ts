import { Request, Response, NextFunction } from "express";
import * as helpTypesService from "../../services/helpTypes";

export const getAllHelpTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpTypes = await helpTypesService.getAllHelpTypes();
    res.status(200).send({ helpTypes });
  } catch (error) {
    next(error);
  }
};
