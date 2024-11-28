import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import HelpOffers from "./pages/HelpOffers.jsx";
import HelpRequests from "./pages/HelpRequests.jsx";
import Profile from "./pages/Profile.jsx";
import { useAuth } from "./context/AuthProvider.jsx";
import HelpRequest from "./pages/HelpRequest.jsx";

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();

  return (
    <div className="app-container">
      <Header></Header>
      <main className="main-app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/helpRequests" element={<HelpRequests />} />
          <Route
            path="/helpRequests/:help_request_id"
            element={<HelpRequest />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
