import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHelpRequests } from "../hooks/useHelpRequests";
import { useAuth } from "../context/AuthProvider";
import { useHelpRequest } from "../hooks/useHelpRequest";
import { formatDate } from "../utils/DateFormatting";
import ConfirmBox from "../common/ConfirmBox";
import "../styling/MyHelpRequests.css";
import LoadingSpinner from "../common/LoadingSpinner";
import StatusBadge from "../common/StatusBadge";

const MyHelpRequests = () => {
  const navigate = useNavigate();
  const { getByUserId } = useHelpRequests();
  const { user } = useAuth();
  const [helpRequests, setHelpRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const { deleteHelpRequest } = useHelpRequest(requestToDelete);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    isOpen: false,
    requestId: null,
  });

  useEffect(() => {
    const fetchHelpRequests = async () => {
      setLoading(true);
      try {
        const data = await getByUserId(user.id);
        const requests = data.data.helpRequests.helpRequests || [];
        const helpOffers = data.data.helpRequests.helpOffers || [];
        const requestsWithOffers = requests.map((request) => ({
          ...request,
          help_offers: helpOffers.filter(
            (offer) => offer.help_request_id === request.id
          ),
        }));

        setHelpRequests(requestsWithOffers);
        setFilteredRequests(requestsWithOffers);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, [getByUserId, user.id]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRequests(helpRequests);
    } else {
      setFilteredRequests(
        helpRequests.filter((request) => request.status === statusFilter)
      );
    }
  }, [statusFilter, helpRequests]);

  const handleEdit = (requestId) => {
    navigate(`/help-requests/${requestId}?edit=true`);
  };

  const handleDeleteClick = (requestId) => {
    setDeleteConfirmDialog({
      isOpen: true,
      requestId,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmDialog.requestId) {
      console.error("No request ID to delete");
      return;
    }

    try {
      await deleteHelpRequest(deleteConfirmDialog.requestId);
      setHelpRequests(
        helpRequests.filter(
          (request) => request.id !== deleteConfirmDialog.requestId
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteConfirmDialog({ isOpen: false, requestId: null });
    }
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-help-requests-page">
      <h2>My Help Requests</h2>
      <div className="status-filters">
        <button className={`btn`} onClick={() => setStatusFilter("all")}>
          All
        </button>
        <button className={`btn`} onClick={() => setStatusFilter("active")}>
          Active
        </button>
        <button className={`btn`} onClick={() => setStatusFilter("completed")}>
          Completed
        </button>
        <button className={`btn`} onClick={() => setStatusFilter("closed")}>
          Closed
        </button>
      </div>
      <div className="requests-grid">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <h3>{request.title}</h3>
              <p className="description">{request.description}</p>
              <p className="date">
                Date Needed: {formatDate(request.req_date)}
              </p>
              <StatusBadge status={request.status} />
              <div className="help-offers-count">
                <span className="count-label">Help Offers Received:</span>
                <span className="count-number">
                  {request.help_offers?.length || 0}
                </span>
              </div>
              <div className="button-container">
                <button
                  className="btn view-button"
                  onClick={() => navigate(`/help-requests/${request.id}`)}
                >
                  View Comments
                </button>
                <button
                  className="btn edit-button"
                  onClick={() => handleEdit(request.id)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-button"
                  onClick={() => handleDeleteClick(request.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>
            {helpRequests.length === 0
              ? "You haven't created any help requests yet."
              : `No ${statusFilter} help requests found.`}
          </p>
        )}
      </div>

      <ConfirmBox
        isOpen={deleteConfirmDialog.isOpen}
        message="Are you sure you want to delete this help request? This cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirmDialog({ isOpen: false, requestId: null })
        }
      />
    </div>
  );
};

export default MyHelpRequests;
