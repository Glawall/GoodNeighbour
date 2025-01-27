import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import { useAuth } from "../context/AuthProvider";
import { formatDate } from "../utils/DateFormatting";

const Comment = ({
  comment,
  level = 0,
  onReply,
  onDelete,
  onUpdate,
  userId,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.description);
  const { user } = useAuth();

  const isAuthor = comment.author_username === user?.username;

  const handleReplyClick = () => {
    setEditText("");
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply({
      description: editText,
      parent_id: comment.id,
    });
    setEditText("");
    setShowReplyForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(comment.id, { description: editText });
    setIsEditing(false);
  };

  return (
    <div
      className={`comment ${comment.parent_id ? "reply" : ""}`}
      style={{ marginLeft: `${level * 20}px` }}
    >
      <div className="comment-header">
        <span className="comment-author">
          {comment.author_first_name} {comment.author_last_name}
        </span>
        <span className="comment-date">{formatDate(comment.created_at)}</span>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn">
              Save
            </button>
            <button
              type="button"
              className="btn delete-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="comment-body">{comment.description}</p>
          <div className="comment-actions">
            <button className="btn reply-button" onClick={handleReplyClick}>
              Reply
            </button>
            {isAuthor && (
              <>
                <button
                  className="btn edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-button"
                  onClick={() => onDelete(comment.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}

      {showReplyForm && (
        <ReplyForm
          onSubmit={handleReplySubmit}
          replyText={editText}
          setReplyText={setEditText}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          level={level + 1}
          onReply={onReply}
          onDelete={onDelete}
          onUpdate={onUpdate}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default Comment;
