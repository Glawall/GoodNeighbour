import db from "../../connection";
import { Comment } from "../../db/seeds/data/test/comments";

export const getCommentsByRequestId = async (
  helpRequestId: number
): Promise<Comment[]> => {
  const query =
    "SELECT comments.id, comments.parent_id, comments.help_request_id, comments.created_at, comments.description, users.first_name AS author_first_name, users.last_name AS author_last_name, users.username AS author_username, users.address AS author_address, users.postcode AS author_postcode, users.longitude AS author_longitude, users.latitude AS author_latitude, users.phone_number AS author_phone_number FROM comments LEFT JOIN users on comments.author_id = users.id WHERE help_request_id =$1 ORDER BY created_at";
  const values = [helpRequestId];
  const { rows } = await db.query(query, values);
  return rows;
};
