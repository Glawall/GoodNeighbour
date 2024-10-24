import { Request, Response, NextFunction } from "express";
import * as helpRequestsService from "../../services/helpRequests";

export const getAllHelpRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpRequests = await helpRequestsService.getAllHelpRequests();
    res.status(200).send({ helpRequests });
  } catch (error) {
    next(error);
  }
};
