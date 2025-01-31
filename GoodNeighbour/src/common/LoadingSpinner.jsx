import React from "react";
import "../styling/LoadingSpinner.css";

const LoadingSpinner = ({ size = "medium" }) => (
  <div className={`spinner-container ${size}`}>
    <div className="spinner"></div>
  </div>
);

export default LoadingSpinner;
