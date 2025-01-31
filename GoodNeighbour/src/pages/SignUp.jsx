import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import "../styling/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    postcode: "",
    phone_number: "",
    help_radius: 500,
    additional_contacts: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await createUser(formData);
      navigate("/login", {
        state: { message: "Account created successfully! Please log in." },
      });
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img
          src={process.env.PUBLIC_URL + "/Logo.png"}
          alt="Good Neighbour"
          className="nav-logo"
        />
      </div>
      <div className="auth-header">
        <Link to="/login" className="return-link">
          Return to Login
        </Link>
        <h2 className="title">Create Account</h2>
      </div>
      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className="signup-form">
          <FormInput
            label="Username*"
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email*"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Password*"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormInput
            label="First Name*"
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Last Name*"
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Address*"
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Postcode*"
            type="text"
            id="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <FormInput
            label="Help Radius (m)*"
            type="number"
            id="help_radius"
            value={formData.help_radius}
            onChange={handleChange}
            min="1"
            max="1000"
            required
          />

          <FormInput
            label="Additional Contacts"
            type="textarea"
            id="additional_contacts"
            value={formData.additional_contacts}
            onChange={handleChange}
          />

          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
