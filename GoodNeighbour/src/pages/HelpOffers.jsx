import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useHelpOffers } from "../hooks/useHelpOffers";
import { useHelpRequests } from "../hooks/useHelpRequests";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/DateFormatting";
import "../styling/HelpOffers.css";
import ConfirmBox from "../common/ConfirmBox";

const HelpOffers = () => {
  const { user } = useAuth();
  const { getByUserId, updateHelpOffer, deleteHelpOffer } = useHelpOffers();
  const { getByUserId: getHelpRequestsByUserId } = useHelpRequests();
  const navigate = useNavigate();
  const [myOffers, setMyOffers] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [viewMode, setViewMode] = useState("myOffers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    requestId: null,
    helperId: null,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (viewMode === "myOffers") {
        const data = await getByUserId(user.id);
        setMyOffers(data.userHelpOffers || []);
        setMyRequests([]);
      } else {
        const data = await getHelpRequestsByUserId(user.id);

        const requestsWithOffers = data.helpRequests.map((request) => ({
          ...request,
          offers: data.helpOffers
            .filter((offer) => offer.help_request_id === request.id)
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
        }));

        setMyRequests(requestsWithOffers);
        setMyOffers([]);
      }
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.id, getByUserId, getHelpRequestsByUserId, viewMode]);

  useEffect(() => {
    fetchData();
  }, [viewMode]);

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  const handleStatusUpdate = async (helpRequestId, helperId, newStatus) => {
    if (newStatus === "accepted") {
      setConfirmDialog({
        isOpen: true,
        requestId: helpRequestId,
        helperId: helperId,
      });
      return;
    }
    try {
      await updateHelpOffer(helpRequestId, helperId, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Failed to update offer status:", err);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      await updateHelpOffer(confirmDialog.requestId, confirmDialog.helperId, {
        status: "accepted",
      });
      fetchData();
    } catch (err) {
      console.error("Failed to accept offer:", err);
    } finally {
      setConfirmDialog({ isOpen: false, requestId: null, helperId: null });
    }
  };

  if (loading) return <div>Loading help offers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="help-offers-page">
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "myOffers" ? "active" : ""}`}
          onClick={() => handleViewModeChange("myOffers")}
        >
          My Help Offers
        </button>
        <button
          className={`toggle-btn ${
            viewMode === "receivedOffers" ? "active" : ""
          }`}
          onClick={() => handleViewModeChange("receivedOffers")}
        >
          Received Help Offers
        </button>
      </div>

      {viewMode === "myOffers" ? (
        <div className="offers-section">
          <h2>My Help Offers</h2>
          <div className="offers-grid">
            {myOffers.map((helpOffer) => (
              <div
                key={`${helpOffer.request.id}-${user.id}`}
                className="offer-card"
              >
                <h3>{helpOffer.request.title}</h3>
                <p className="description">{helpOffer.request.description}</p>
                <p className="requester">
                  Requested by: {helpOffer.requester.first_name}{" "}
                  {helpOffer.requester.last_name}
                </p>
                <p className="location">
                  Location: {helpOffer.requester.postcode}
                </p>
                <p className="help-type">Type: {helpOffer.request.help_type}</p>
                <p className="date">
                  Date Needed: {formatDate(helpOffer.request.req_date)}
                </p>
                <p className={`status ${helpOffer.offers[0].status}`}>
                  {helpOffer.offers[0].status}
                </p>
                <div className="button-container">
                  <button
                    className="view-details-btn"
                    onClick={() =>
                      navigate(`/help-requests/${helpOffer.request.id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
                {helpOffer.offers[0].status === "active" && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteOffer(helpOffer.request.id, user.id)
                    }
                  >
                    Withdraw Offer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="offers-section">
          <div className="requests-list">
            {myRequests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-summary">
                  <h3>{request.title}</h3>
                  <p className="date">
                    Help Neeeded: {formatDate(request.created_at)}
                  </p>
                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/help-requests/${request.id}`)}
                  >
                    View Details
                  </button>
                </div>

                <div className="received-offers">
                  <h4>Offers Received:</h4>
                  {request.offers && request.offers.length > 0 ? (
                    request.offers.map((offer) => (
                      <div
                        key={`${request.id}-${offer.helper_id}`}
                        className="offer-details"
                      >
                        <div className="helper-info">
                          <p className="helper-name">{offer.helper_username}</p>
                          <p className="helper-email">{offer.helper_email}</p>
                          <p className="offer-date">
                            Offered on: {formatDate(offer.created_at)}
                          </p>
                        </div>
                        <div className="offer-status">
                          <button
                            className={`status-btn ${
                              offer.status === "accepted"
                                ? "active"
                                : "not-selected"
                            }`}
                            onClick={() =>
                              handleStatusUpdate(
                                request.id,
                                offer.helper_id,
                                "accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className={`status-btn ${
                              offer.status === "declined"
                                ? "active"
                                : "not-selected"
                            }`}
                            onClick={() =>
                              handleStatusUpdate(
                                request.id,
                                offer.helper_id,
                                "declined"
                              )
                            }
                          >
                            Decline
                          </button>
                          <button
                            className={`status-btn ${
                              offer.status === "active"
                                ? "active"
                                : "not-selected"
                            }`}
                            onClick={() =>
                              handleStatusUpdate(
                                request.id,
                                offer.helper_id,
                                "active"
                              )
                            }
                          >
                            Active
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-offers">No offers received yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmBox
        isOpen={confirmDialog.isOpen}
        message="Please be aware all other help offers will be declined. Are you sure?"
        onConfirm={handleConfirmAccept}
        onCancel={() =>
          setConfirmDialog({ isOpen: false, requestId: null, helperId: null })
        }
      />
    </div>
  );
};

export default HelpOffers;
