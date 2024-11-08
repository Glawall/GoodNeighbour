import { Request, Response, NextFunction } from "express";
import * as helpTypesService from "../../services/helpTypes";
import { checkValidInput } from "../../utils/checkValidation";

export const getByHelpTypeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const helpTypeId = Number(req.params.help_type_id);
    await checkValidInput(helpTypeId, "HELP_TYPE");
    const helpType = await helpTypesService.getByHelpTypeId(helpTypeId);
    res.status(200).send({ helpType });
  } catch (error) {
    next(error);
  }
};
