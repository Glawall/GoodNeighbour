import { Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return null;
  }

  return (
    <header>
      <h1>Good Neighbour</h1>
      <div className="navigation">
        <Link to="/profile"> My Profile</Link>
        <Link to="/helpRequests">HelpRequests</Link>
        <Link to="/helpOffers">My Help Offers</Link>
      </div>
      <a href="/profile">
        <img className="user-avatar" src={user.avatar_url} alt="user avatar" />
      </a>{" "}
    </header>
  );
}

export default Header;
