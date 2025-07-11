import React from "react";


const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button submit" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
