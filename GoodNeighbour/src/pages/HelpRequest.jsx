import { useAuth } from "../context/AuthProvider";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useHelpRequest } from "../hooks/useHelpRequest";
import CommentAndReplies from "../components/CommentsAndReplies";
import "../styling/HelpRequest.css";
import { useCallback, useEffect, useState } from "react";
import { useComments } from "../hooks/useComments";
import HelpOffers from "../components/HelpOffersComponent";
import ConfirmBox from "../common/ConfirmBox";
import { useHelpOffers } from "../hooks/useHelpOffers";
import { useHelpTypes } from "../hooks/useHelpTypes";
import StatusBadge from "../common/StatusBadge";
import LoadingSpinner from "../common/LoadingSpinner";
import MiniMapComponent from "../components/MiniMapComponent";
import { formatDate } from "../utils/DateFormatting";

const HelpRequest = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get("edit") === "true";
  const navigate = useNavigate();
  const { getHelpRequest, updateHelpRequest, deleteHelpRequest } =
    useHelpRequest(id);
  const { getComments, addComment, deleteComment } = useComments(id);
  const { createHelpOffer, getByUserId } = useHelpOffers();
  const { getAllHelpTypes } = useHelpTypes();

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
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    help_type: "",
    req_date: "",
    status: "",
  });
  const [deleteRequestDialog, setDeleteRequestDialog] = useState({
    isOpen: false,
  });
  const [helpTypes, setHelpTypes] = useState([]);
  const [hasOffered, setHasOffered] = useState(false);

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
      const { request: requestDetails } = requestData.helpRequest;
      setEditForm({
        title: requestDetails.title,
        description: requestDetails.description,
        help_type: requestDetails.help_type,
        req_date: requestDetails.req_date.split("T")[0],
        status: requestDetails.status,
      });

      const userOffers = await getByUserId(user.id);
      const existingOffer = userOffers.data.userHelpOffers.find(
        (offer) => offer.request.id === parseInt(id)
      );
      setHasOffered(!!existingOffer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, getHelpRequest, getComments, getByUserId, user.id]);

  const handleHelpOffersUpdate = useCallback(() => {
    getHelpRequest()
      .then((requestData) =>
        setRequest((prev) => ({
          ...prev,
          helpRequest: {
            ...prev.helpRequest,
            offers: requestData.helpRequest.offers,
          },
        }))
      )
      .catch((err) => console.error("Failed to update offers:", err));
  }, [getHelpRequest]);

  useEffect(() => {
    fetchHelpRequest();
  }, [fetchHelpRequest]);

  useEffect(() => {
    const fetchHelpTypes = async () => {
      try {
        const types = await getAllHelpTypes();
        setHelpTypes(types);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHelpTypes();
  }, [getAllHelpTypes]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHelpRequest(editForm);
      const updatedRequest = await getHelpRequest();
      setRequest(updatedRequest);
      navigate(`/help-requests/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteRequest = async () => {
    try {
      await deleteHelpRequest();
      navigate("/my-help-requests");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteRequestDialog({ isOpen: false });
    }
  };

  const handleCreateOffer = async () => {
    try {
      await createHelpOffer(id);
      setHasOffered(true);
      const requestData = await getHelpRequest();
      setRequest((prev) => ({
        ...prev,
        helpRequest: {
          ...prev.helpRequest,
          offers: requestData.helpRequest.offers,
        },
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWithdrawOffer = useCallback(() => {
    setHasOffered(false);
  }, []);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <div>Error: {error}</div>;
  if (!request?.helpRequest) return <div>Help request not found</div>;

  const { helpRequest } = request;
  const { request: requestDetails, requester, offers } = helpRequest;

  return (
    <div className="help-request-page">
      <div className="content-wrapper">
        <div className="card-container help-request-container">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="help_type">Help Type</label>
                <select
                  id="help_type"
                  name="help_type"
                  value={editForm.help_type}
                  onChange={handleChange}
                >
                  {helpTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="req_date">Date Needed</label>
                <input
                  type="date"
                  id="req_date"
                  name="req_date"
                  value={editForm.req_date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={editForm.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="button-container">
                <button type="submit" className="btn save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn cancel-button"
                  onClick={() => navigate(`/help-requests/${id}`)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="request-content">
              <div className="request-info">
                <div className="request-header">
                  <h2 className="title">{requestDetails.title}</h2>
                  <div className="request-status-and-actions">
                    <StatusBadge status={requestDetails.status} />
                    {user.id === requestDetails.author_id ? (
                      <div className="request-actions">
                        <button
                          className="btn edit-button"
                          onClick={() =>
                            navigate(`/help-requests/${id}?edit=true`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn delete-button"
                          onClick={() =>
                            setDeleteRequestDialog({ isOpen: true })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      !hasOffered && (
                        <button
                          className="btn offer-help-button"
                          onClick={handleCreateOffer}
                        >
                          Offer Help
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="request-details">
                  <div className="details-container">
                    <div className="details-left">
                      <div className="info-section">
                        <h3>Description</h3>
                        <p>{requestDetails.description}</p>
                      </div>

                      <div className="info-section">
                        <h3>Request Date</h3>
                        <p>{formatDate(requestDetails.req_date)}</p>
                      </div>

                      <div className="info-section">
                        <h3>Requester</h3>
                        <p>
                          {requester.first_name} {requester.last_name}
                        </p>
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${requester.latitude},${requester.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        View on Google Maps
                      </a>
                    </div>

                    <div className="details-right">
                      <div className="location-section">
                        <h3>Location</h3>
                        <div className="mini-map-container">
                          {requester.latitude && requester.longitude ? (
                            <>
                              <MiniMapComponent
                                latitude={requester.latitude}
                                longitude={requester.longitude}
                              />
                            </>
                          ) : (
                            <div className="no-location">
                              Location not available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider" />
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
          )}
        </div>
        <div className="card-container offers-container">
          <HelpOffers
            offers={offers}
            helpRequestId={id}
            requestAuthorId={requestDetails.author_id}
            onUpdate={handleHelpOffersUpdate}
            onWithdraw={handleWithdrawOffer}
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

      <ConfirmBox
        isOpen={deleteRequestDialog.isOpen}
        message="Are you sure you want to delete this help request? This cannot be undone."
        onConfirm={handleDeleteRequest}
        onCancel={() => setDeleteRequestDialog({ isOpen: false })}
      />
    </div>
  );
};

export default HelpRequest;
