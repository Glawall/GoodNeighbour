import { Comment } from "../db/seeds/data/test/comments";

export const threadComments = (
  comments: Comment[]
): (Comment & { replies: Comment[] })[] => {
  const map: { [key: number]: Comment & { replies: Comment[] } } = {};
  const roots: (Comment & { replies: Comment[] })[] = [];

  comments.forEach((comment) => {
    if (comment.id !== undefined) {
      map[comment.id] = { ...comment, replies: [] };
    }
  });

  comments.forEach((comment) => {
    const { id, parent_id } = comment;
    if (id !== undefined) {
      if (parent_id && map[parent_id]) {
        map[parent_id].replies.push(map[id]);
      } else roots.push(map[id]);
    }
  });
  return roots;
};
