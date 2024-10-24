import db from "../../connection";
import { Comment, NewCommentBody } from "../../db/seeds/data/test/comments";

export const createComment = async (
  newCommentBody: NewCommentBody
): Promise<Comment> => {
  const query = `
    INSERT INTO comments (author_id, help_request_id, parent_id, description) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  const values = [
    newCommentBody.author_id,
    newCommentBody.help_request_id,
    newCommentBody.parent_id,
    newCommentBody.description,
  ];

  const { rows } = await db.query(query, values);

  return rows[0];
};
