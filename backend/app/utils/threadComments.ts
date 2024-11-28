import { Comment } from "../db/seeds/data/test/comments";

export const threadComments = (
  comments: Comment[]
): (Comment & { replies: Comment[] })[] => {
  const top: { [key: number]: Comment & { replies: Comment[] } } = {};
  const belows: (Comment & { replies: Comment[] })[] = [];
  comments.forEach((comment) => {
    if (comment.id !== undefined) {
      top[comment.id] = { ...comment, replies: [] };
    }
  });

  comments.forEach((comment) => {
    const { id, parent_id } = comment;
    if (id !== undefined) {
      if (parent_id && top[parent_id]) {
        top[parent_id].replies.push(top[id]);
      } else belows.push(top[id]);
    }
  });
  return belows;
};
