import db from "../../connection";
import { HelpRequest } from "../../db/seeds/data/test/help-requests";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const getAllHelpRequests = async (
  sort_by: string = "created_at",
  order: string = "desc",
  help_type?: string
): Promise<HelpRequest[]> => {
  let queryString = `
    SELECT
      help_requests.id AS id,
      help_requests.description,
      help_requests.created_at,
      help_requests.help_type_id,
      help_requests.req_date,
      help_requests.status,
      help_requests.title,
      help_requests.author_id,
      users.first_name AS author_first_name,
      users.last_name AS author_last_name,
      users.username AS author_username,
      users.address AS author_address,
      users.postcode AS author_postcode,
      users.longitude AS author_longitude,
      users.latitude AS author_latitude,
      help_types.name AS help_type
    FROM 
      help_requests
    LEFT JOIN 
      users 
    ON 
      help_requests.author_id = users.id
    LEFT JOIN 
      help_types 
    ON 
      help_requests.help_type_id = help_types.id
  `;

  const queryVals: any[] = [];

  if (help_type) {
    queryString += ` WHERE help_types.name = $1`;
    queryVals.push(help_type);
  }

  queryString += ` ORDER BY ${sort_by} ${order}`;

  try {
    const { rows } = await db.query(queryString, queryVals);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
