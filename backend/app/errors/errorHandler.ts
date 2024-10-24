import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import getHttpError from "./getHttpError";

const errorHandler = (
  appErr: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (appErr instanceof AppError) {
    const httpError = getHttpError(appErr);
    res
      .status(httpError.statusCode)
      .send({ error: { message: httpError.message } });
  } else if (appErr instanceof Error) {
    const pgError = appErr as any;
    if (pgError.code === "23503") {
      res.status(400).send({
        error: {
          message: "User was not found",
        },
      });
    } else {
      console.error("CRITICAL ERROR:", pgError);
      res
        .status(500)
        .send({ error: { code: 500, msg: "An unexpected error occurred." } });
    }
  } else {
    console.error("CRITICAL ERROR:", appErr);
    res
      .status(500)
      .send({ error: { code: 500, msg: "An unexpected error occurred." } });
  }
};

export default errorHandler;
