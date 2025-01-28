import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Login from "./pages/Login";
import Header from "./components/Header";
import HelpRequests from "./pages/HelpRequests";
import HelpRequest from "./pages/HelpRequest";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import HelpOffers from "./pages/HelpOffers";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/help-requests" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navigate to="/help-requests" replace />
              </PrivateRoute>
            }
          />
          <Route
            path="/help-requests"
            element={
              <PrivateRoute>
                <HelpRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/help-requests/:id"
            element={
              <PrivateRoute>
                <HelpRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/help-offers"
            element={
              <PrivateRoute>
                <HelpOffers />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
