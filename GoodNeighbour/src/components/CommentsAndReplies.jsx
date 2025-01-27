import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useComments } from "../hooks/useComments";
import Comment from "./Comment";
import "../styling/CommentsAndReplies.css";

const CommentsAndReplies = ({ comments, helpRequestId, onCommentUpdate }) => {
  const { user, isLoggedIn } = useAuth();
  const { addComment, deleteComment, updateComment } =
    useComments(helpRequestId);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment({
        description: newComment,
        author_id: user.id,
        help_request_id: helpRequestId,
      });
      setNewComment("");
      onCommentUpdate();
      setError(null);
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleReply = async (replyData) => {
    try {
      await addComment({
        ...replyData,
        author_id: user.id,
        help_request_id: helpRequestId,
      });
      onCommentUpdate();
      setError(null);
    } catch (err) {
      setError("Failed to add reply");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      onCommentUpdate();
      setError(null);
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  const handleUpdate = async (commentId, updateData) => {
    try {
      await updateComment(commentId, updateData);
      onCommentUpdate();
      setError(null);
    } catch (err) {
      setError("Failed to update comment");
    }
  };

  const threadedComments =
    comments?.reduce((acc, comment) => {
      if (!comment.parent_id) {
        comment.replies = comment.replies || [];
        acc[comment.id] = comment;
      } else {
        const parent = acc[comment.parent_id];
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(comment);
        }
      }
      return acc;
    }, {}) || {};

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <div className="form-actions">
          <button type="submit" className="btn">
            Post Comment
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments && comments.length > 0 ? (
          Object.values(threadedComments).map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              userId={user?.id}
            />
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
};

export default CommentsAndReplies;
