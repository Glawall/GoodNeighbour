import { Request, Response, NextFunction } from "express";
import * as helpRequestsService from "../../services/helpRequests";
import { getHelpTypeId } from "../../utils/preloadHelpTypes";

interface HelpRequestsQuery {
  sort_by?: string;
  order?: string;
  help_type?: string;
}

export const getAllHelpRequests = async (
  req: Request<{}, {}, {}, HelpRequestsQuery>,
  res: Response,
  next: NextFunction
) => {
  const { sort_by, order, help_type } = req.query;

  const sortBy = sort_by || "created_at";
  const orderBy = order || "desc";
  const helpType = help_type || "";

  try {
    const helpRequests = await helpRequestsService.getAllHelpRequests(
      sortBy,
      orderBy,
      helpType
    );
    res.status(200).send({ helpRequests });
  } catch (error) {
    next(error);
  }
};
