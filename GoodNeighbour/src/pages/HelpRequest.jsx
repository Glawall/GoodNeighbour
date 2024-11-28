import { useAuth } from "../context/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSendRequest } from "../hooks/useSendRequest";
import HelpRequestCard from "../components/HelpRequestCard";

const HelpRequest = () => {
  const { user } = useAuth();
  const [helpRequest, setHelpRequest] = useState({});
  const [comments, setComments] = useState([]);
  const { isLoading, error, sendRequest } = useSendRequest();
  const { help_request_id } = useParams();

  const fetchHelpRequest = async () => {
    try {
      const response = await sendRequest(
        `help-requests/${help_request_id}`,
        "GET"
      );
      const helpRequest = response?.helpRequest?.request || {};
      setHelpRequest(helpRequest);
      console.log(helpRequest);
    } catch (err) {
      console.error("Error fetching helpRequest:", err);
    }
  };

  const fetchComments = async () => {
    console.log(help_request_id, "in fetch comments");
    try {
      const { comments } = await sendRequest(
        `help-requests/${help_request_id}/comments`,
        "GET"
      );
      setComments(comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchHelpRequest();
    fetchComments();
  }, [setHelpRequest, setComments]);
  console.log(comments);
  if (isLoading) return <p>Loading help request...</p>;
  if (error)
    return (
      <p>Error loading help request: {error?.message || "Unknown error"}</p>
    );
  return (
    <div>
      <HelpRequestCard helpRequest={helpRequest} />
      <p>{helpRequest.id}</p>
      <p>{helpRequest.title}</p>
      <p>{helpRequest.description}</p>
      <p>I've rendered</p>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <p key={comment.id}>Comment ID: {comment.id}</p>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default HelpRequest;
