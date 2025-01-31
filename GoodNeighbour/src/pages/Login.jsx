import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import FormInput from "../common/FormInput";
import "../styling/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await login({
        email: email.trim(),
        password: password.trim(),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src="/Logo.png" alt="Good Neighbour" className="nav-logo" />
      </div>
      <h2 className="auth-title">Login</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
      </form>
      <button
        onClick={handleSubmit}
        className="btn login-button"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="signup-prompt">
        <p>Don't have an account?</p>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
