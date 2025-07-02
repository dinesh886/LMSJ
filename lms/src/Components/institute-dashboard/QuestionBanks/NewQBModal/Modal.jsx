import React, { useState ,useEffect } from "react";
import "./Modal.css";

const Modal = ({ onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [date, setDate] = useState(new Date().toLocaleDateString()); // Set the current date

  // Update date every second (if you want real-time updates)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleDateString());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval when the component is unmounted
  }, []);


  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name });
      setName(""); // Reset the input after submit
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>
            {initialData ? "Edit Question Bank" : "Add Question Bank"}
          </h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="modal-footer">
          <button className="modal-button submit" onClick={handleSubmit}>
            {initialData ? "Update" : "Add"}
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
