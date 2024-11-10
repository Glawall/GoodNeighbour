import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import HelpOffers from "./pages/HelpOffers.jsx";
import HelpRequests from "./pages/HelpRequests.jsx";
import Profile from "./pages/Profile.jsx";
import { useAuth } from "./context/AuthProvider.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { isLoggedIn, user, login, logout } = useAuth();

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/helpRequests" element={<HelpRequests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
