import React from "react";
import "../styling/ConfirmBox.css";

const ConfirmBox = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "primary",
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-box-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="confirm-box-actions">
          <button
            className={`btn ${
              type === "delete" ? "btn-delete" : "btn-primary"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="btn btn-delete" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
