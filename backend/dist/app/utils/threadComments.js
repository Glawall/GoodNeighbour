"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadComments = void 0;
const threadComments = (comments) => {
    const map = {};
    const roots = [];
    comments.forEach((comment) => {
        if (comment.id !== undefined) {
            map[comment.id] = Object.assign(Object.assign({}, comment), { replies: [] });
        }
    });
    comments.forEach((comment) => {
        const { id, parent_id } = comment;
        if (id !== undefined) {
            if (parent_id && map[parent_id]) {
                map[parent_id].replies.push(map[id]);
            }
            else
                roots.push(map[id]);
        }
    });
    return roots;
};
exports.threadComments = threadComments;
