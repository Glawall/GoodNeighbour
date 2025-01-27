import React from "react";
import { useAuth } from "../context/AuthProvider";
import "../styling/HelpRequestCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormatting";

const HelpRequestCard = ({ helpRequest, onSelect, onUpdate }) => {
  const { user } = useAuth();

  if (!helpRequest) return null;

  return (
    <div className="help-request-card" onClick={() => onSelect?.(helpRequest)}>
      <div className="help-request-header">
        <h3>{helpRequest.title}</h3>
        <span className={`status ${helpRequest.status}`}>
          {helpRequest.status}
        </span>
      </div>
      <p className="help-type">{helpRequest.help_type}</p>
      <p className="description">{helpRequest.description}</p>
      <div className="help-request-footer">
        <div className="author-info">
          <p>
            Posted by: {helpRequest.author_first_name}{" "}
            {helpRequest.author_last_name}
          </p>
          <p>Location: {helpRequest.author_postcode}</p>
          <p>When: {formatDate(helpRequest.created_at)}</p>
        </div>
      </div>
      <div className="card-actions">
        <Link
          to={`/help-requests/${helpRequest.id}`}
          className="view-details-link"
          onClick={(e) => e.stopPropagation()}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HelpRequestCard;
