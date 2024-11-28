import { useSendRequest } from "../hooks/useSendRequest";
import { formattedDate, formattedTime } from "../utils/DateFormatting";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const CommentAndReplies = ({ comment, setComments, helpRequestId }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    author_id: user.id,
    help_request_id: helpRequestId,
    parent_id: comment.id ? comment.id : null,
    description: "",
  });
  const { isLoading, error, sendRequest } = useSendRequest(
    `help-requests/${helpRequestId}/comments/${
      formData.parent_id ? formData.parent_id : ""
    }`,
    "POST"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { "X-User-ID": user?.id };
    console.log(headers, "headers");
    try {
      const response = await sendRequest(
        `help-requests/${helpRequestId}/comments/${
          formData.parent_id ? formData.parent_id : ""
        }`,
        "POST",
        formData,
        headers
      );
      setComments((prev) => [...prev, response.newCommentBody]);
      setFormData((prev) => ({ ...prev, description: "" }));
      console.log(response);
    } catch (error) {
      console.log(error);
      console.error("Error creating comment:", error);
    }
  };
  return (
    <div key={comment.id} className="comment-container">
      <p>{comment.description}</p>
      <p>
        {comment.author_first_name} {comment.author_last_name}
      </p>
      <p>
        {formattedDate(comment.created_at)} {formattedTime(comment.created_at)}
      </p>
      {comment.replies && comment.replies.length > 0 ? (
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <CommentAndReplies key={reply.id} comment={reply} />
          ))}
        </div>
      ) : (
        <p>No replies available</p>
      )}
      <form className="create-user-form" onSubmit={handleSubmit}>
        <label htmlFor="New comment">Post Comment</label>
        <input
          type="text"
          id="new-comment"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading || !formData.description}>
          {isLoading ? "Creating..." : "Write your comment here"}
        </button>
      </form>
    </div>
  );
};

export default CommentAndReplies;
