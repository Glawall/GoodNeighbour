import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styling/Header.css";

function Header() {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="header-container">
      <h1>Good Neighbour</h1>
      <div className="navigation">
        <Link to="/profile"> My Profile</Link>
        <Link to="/helpRequests">HelpRequests</Link>
        <Link to="/helpOffers">My Help Offers</Link>
      </div>
      <div className="user-profile-container">
        <a href="/profile">
          <img
            className="user-avatar"
            src={user.avatar_url}
            alt="user avatar"
          />
          <p className="username-header">{user.username}</p>
        </a>{" "}
      </div>
    </header>
  );
}

export default Header;
