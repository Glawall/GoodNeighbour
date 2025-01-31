import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useHelpOffers } from "../hooks/useHelpOffers";
import "../styling/HelpOffers.css";

const HelpOffers = ({
  offers,
  helpRequestId,
  requestAuthorId,
  onUpdate,
  onAcceptOffer,
  onWithdraw,
}) => {
  const { user } = useAuth();
  const { updateHelpOffer, deleteHelpOffer } = useHelpOffers();
  const [currentOffers, setCurrentOffers] = useState(offers);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    setCurrentOffers(offers);
  }, [offers]);

  const handleStatusUpdate = async (helpRequestId, helperId, newStatus) => {
    if (newStatus === "accepted") {
      onAcceptOffer(helperId);
      return;
    }
    try {
      await updateHelpOffer(helpRequestId, helperId, { status: newStatus });
      setCurrentOffers(
        currentOffers.map((offer) =>
          offer.helper.id === helperId ? { ...offer, status: newStatus } : offer
        )
      );
      onUpdate?.();
    } catch (err) {
      console.error("Failed to update offer status:", err);
    }
  };

  const handleWithdrawOffer = async (helpRequestId, helperId) => {
    setIsWithdrawing(true);
    try {
      await deleteHelpOffer(helpRequestId, helperId);
      setCurrentOffers(
        currentOffers.filter((offer) => offer.helper.id !== helperId)
      );
      onUpdate?.();
      if (onWithdraw) {
        onWithdraw();
      }
    } catch (err) {
      console.error("Failed to withdraw offer:", err);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="help-offers-section">
      <h3>Help Offers</h3>
      <div className="offers-list">
        {currentOffers?.length > 0 ? (
          currentOffers.map((offer) => (
            <div key={offer.helper.id} className="offer">
              <div className="offer-details">
                <div className="helper-info">
                  <p className="helper-name">
                    {offer.helper.first_name} {offer.helper.last_name}
                  </p>
                </div>

                {user.id === requestAuthorId ? (
                  <div className="offer-status">
                    <button
                      className="btn"
                      onClick={() =>
                        handleStatusUpdate(
                          helpRequestId,
                          offer.helper.id,
                          "accepted"
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleStatusUpdate(
                          helpRequestId,
                          offer.helper.id,
                          "active"
                        )
                      }
                    >
                      Pending
                    </button>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleStatusUpdate(
                          helpRequestId,
                          offer.helper.id,
                          "declined"
                        )
                      }
                    >
                      Decline
                    </button>
                  </div>
                ) : user.id === offer.helper.id ? (
                  <div className="offer-actions">
                    <p className={`status ${offer.status}`}>{offer.status}</p>
                    {offer.status === "active" && (
                      <button
                        className="btn delete-button"
                        onClick={() =>
                          handleWithdrawOffer(helpRequestId, offer.helper.id)
                        }
                        disabled={isWithdrawing}
                      >
                        {isWithdrawing ? "Withdrawing..." : "Withdraw Offer"}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className={`status ${offer.status}`}>{offer.status}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-offers">No offers yet</p>
        )}
      </div>
    </div>
  );
};

export default HelpOffers;
