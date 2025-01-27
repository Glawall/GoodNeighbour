import React from "react";

const ReplyForm = ({ onSubmit, replyText, setReplyText, onCancel }) => (
  <form onSubmit={onSubmit} className="reply-form">
    <textarea
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      placeholder="Write your reply..."
      required
    />
    <div className="form-actions">
      <button type="submit" className="btn">
        Submit Reply
      </button>
      <button type="button" className="btn delete-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  </form>
);

export default ReplyForm;
