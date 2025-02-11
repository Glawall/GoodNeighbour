import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import ConfirmBox from "../common/ConfirmBox";
import "../styling/Header.css";
import React, { useState } from "react";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutDialog, setLogoutDialog] = useState(false);

  if (!isLoggedIn) return null;

  const handleLogoutClick = () => {
    setLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
    setLogoutDialog(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo-link">
          <img src="/Logo.png" alt="Good Neighbour" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-container">
        <nav className="nav-links">
          <Link to="/help-requests" className="nav-link">
            View Help Requests
          </Link>
          <Link to="/help-requests/create" className="nav-link create-request">
            Create Help Request
          </Link>
          <Link to="/my-help-requests" className="nav-link">
            My Help Requests
          </Link>
          <Link to="/help-offers" className="nav-link">
            My Help Offers
          </Link>
        </nav>
        <div className="profile-section">
          <Link to="/profile">
            <img
              className="user-avatar"
              src={user.avatar_url}
              alt="useravatar"
            />
          </Link>
          <p className="username-text">{user.username}</p>
          <button className="nav-link" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
      <ConfirmBox
        isOpen={logoutDialog}
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutDialog(false)}
      />
    </header>
  );
};

export default Header;
