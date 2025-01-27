import React from "react";
import "../styling/HelpOffers.css";

const HelpOffers = ({ offers }) => (
  <div className="help-offers-section">
    <h3>Help Offers</h3>
    <div className="offers-list">
      {offers?.length > 0 ? (
        offers.map((offer) => (
          <div key={offer.helper.id} className="offer">
            <div className="offer-details">
              <p>
                {offer.helper.first_name} {offer.helper.last_name} has offered
                to help
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No offers yet</p>
      )}
    </div>
  </div>
);

export default HelpOffers;
