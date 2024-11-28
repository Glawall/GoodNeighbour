import { useNavigate, Link } from "react-router-dom";
import "../styling/HelpCard.css";
import { formattedDate, formattedTime } from "../utils/DateFormatting";

function HelpRequestCard({ helpRequest }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/help-requests/${helpRequest.id}`);
  }
  return (
    <ul key={helpRequest.title} className="help-request-list">
      <div className="help-request-card">
        <h3 onClick={handleClick}>{helpRequest.title}</h3>
        <p>
          Help needed by: {helpRequest.author_first_name}{" "}
          {helpRequest.author_last_name}
        </p>
        <p>
          When: {formattedDate(helpRequest.created_at)}{" "}
          {formattedTime(helpRequest.created_at)}{" "}
        </p>
        <p>{helpRequest.description}</p>
        <Link to={`/helpRequests/${helpRequest.id}`}>
          Get more details here{" "}
        </Link>
      </div>
    </ul>
  );
}

export default HelpRequestCard;
