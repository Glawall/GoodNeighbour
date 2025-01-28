import { useAuth } from "../context/AuthProvider";
import { useParams } from "react-router-dom";
import { useHelpRequest } from "../hooks/useHelpRequest";
import CommentAndReplies from "../components/CommentsAndReplies";
import "../styling/HelpRequest.css";
import { useCallback, useEffect, useState } from "react";
import { useComments } from "../hooks/useComments";
import HelpOffers from "../components/HelpOffersComponent";
import ConfirmBox from "../common/ConfirmBox";

const HelpRequest = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const { getHelpRequest } = useHelpRequest(id);
  const { getComments, addComment, deleteComment } = useComments(id);

  const [request, setRequest] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    helperId: null,
  });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    isOpen: false,
    commentId: null,
  });

  const fetchHelpRequest = useCallback(async () => {
    if (!id) {
      setError("No help request ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [requestData, commentsData] = await Promise.all([
        getHelpRequest(),
        getComments(),
      ]);
      setRequest(requestData);
      const commentArray = Array.isArray(commentsData) ? commentsData : [];
      setComments(commentArray);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, getHelpRequest, getComments]);

  useEffect(() => {
    fetchHelpRequest();
  }, [fetchHelpRequest]);

  const handleAddComment = async (commentData) => {
    try {
      await addComment(commentData);
      const newComments = await getComments();
      setComments(newComments);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateComments = async () => {
    try {
      const newComments = await getComments();
      setComments(newComments);
    } catch (err) {
      console.error("Failed to refresh comments:", err);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      await updateHelpOffer(id, confirmDialog.helperId, { status: "accepted" });
      fetchHelpRequest();
    } catch (err) {
      console.error("Failed to accept offer:", err);
    } finally {
      setConfirmDialog({ isOpen: false, helperId: null });
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeleteConfirmDialog({
      isOpen: true,
      commentId,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteComment(deleteConfirmDialog.commentId);
      updateComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    } finally {
      setDeleteConfirmDialog({ isOpen: false, commentId: null });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!request?.helpRequest) return <div>Help request not found</div>;

  const { helpRequest } = request;
  const { request: requestDetails, requester, offers } = helpRequest;

  return (
    <div className="help-request-page">
      <div className="content-wrapper">
        <div className="card-container help-request-container">
          <div className="request-content">
            <div className="main-content">
              <h2 className="title">{requestDetails.title}</h2>
              <div className="request-info">
                <div className="request-header">
                  <span className={`status ${requestDetails.status}`}>
                    {requestDetails.status}
                  </span>
                </div>

                <div className="request-details">
                  <div className="info-section">
                    <h3>Description</h3>
                    <p>{requestDetails.description}</p>
                  </div>

                  <div className="info-section">
                    <h3>Request Date</h3>
                    <p>
                      {new Date(requestDetails.req_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="info-section">
                    <h3>Requester</h3>
                    <p>
                      {requester.first_name} {requester.last_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="comments-section">
                <CommentAndReplies
                  comments={comments}
                  addComment={handleAddComment}
                  deleteComment={handleDeleteComment}
                  helpRequestId={id}
                  onCommentUpdate={updateComments}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-container offers-container">
          <HelpOffers
            offers={offers}
            helpRequestId={id}
            requestAuthorId={requestDetails.author_id}
          />
        </div>
      </div>

      <ConfirmBox
        isOpen={confirmDialog.isOpen}
        message="Please be aware all other help offers will be declined. Are you sure?"
        onConfirm={handleConfirmAccept}
        onCancel={() => setConfirmDialog({ isOpen: false, helperId: null })}
      />

      <ConfirmBox
        isOpen={deleteConfirmDialog.isOpen}
        message="Are you sure you want to delete this comment? This cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirmDialog({ isOpen: false, commentId: null })
        }
      />
    </div>
  );
};

export default HelpRequest;
