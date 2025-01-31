import React from "react";
import "../styling/HelpRequestCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormatting";
import StatusBadge from "../common/StatusBadge";

const HelpRequestCard = ({ helpRequest, onSelect, selected, distance }) => {
  if (!helpRequest) return null;

  return (
    <div
      className={`help-request-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(helpRequest)}
    >
      <div className="help-request-header">
        <h3>{helpRequest.title}</h3>
        <StatusBadge status={helpRequest.status} />
      </div>
      <p className="help-type">{helpRequest.help_type}</p>
      <div className="help-request-footer">
        <div className="author-info">
          <p>
            Posted by: {helpRequest.author_first_name}{" "}
            {helpRequest.author_last_name}
          </p>
          <p>Location: {helpRequest.author_postcode}</p>
          <p>When: {formatDate(helpRequest.created_at)}</p>
          {distance && (
            <p className="distance">
              {distance < 1
                ? `${(distance * 1609).toFixed(0)}m away`
                : `${distance.toFixed(1)} miles away`}
            </p>
          )}
        </div>
      </div>
      <div className="card-actions">
        <Link
          to={`/help-requests/${helpRequest.id}`}
          className="view-details-link"
          onClick={(e) => e.stopPropagation()}
        >
          View Details & Respond
        </Link>
      </div>
    </div>
  );
};

export default HelpRequestCard;
