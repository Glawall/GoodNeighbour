import React from "react";
import "./ConfirmBox.css";

const ConfirmBox = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-btn confirm-yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="confirm-btn confirm-no" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
