import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function HelpRequestCard({ helpRequest }) {
  const { isLoggedIn, user, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <ul key={helpRequest.id} className="help-request-list">
      <div className="help-request-header">
        <h3>{helpRequest.title}</h3>
        <p>Help needed by: {helpRequest.author_username}</p>
        <p>{helpRequest.description}</p>
        <p>Help location: {helpRequest.author_postcode}</p>
      </div>
    </ul>
  );
}

export default HelpRequestCard;
