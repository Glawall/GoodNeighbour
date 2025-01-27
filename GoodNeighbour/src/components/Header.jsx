import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styling/Header.css";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/help-requests" className="nav-link">
          Help Requests
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </nav>

      <Link to="/" className="logo-link">
        <img src="/Logo.png" alt="Good Neighbour" className="nav-logo" />
      </Link>

      <div className="profile-section">
        <Link to="/profile">
          <img className="user-avatar" src={user.avatar_url} alt="Profile" />
        </Link>
        <p className="username-text">{user.username}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
