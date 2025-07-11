import React, { useState } from "react";
import "./AddStudentModal.css";
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal"; // Import the custom hook

const AddStudentModal = ({ isOpen, onClose, onSave }) => {
  const { modalRef, isBouncing } = useBounceModal(isOpen);

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle input changes and validate fields
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Update field value
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);

    // Validate field and update errors
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "This field is required.",
      }));
    } else if (field === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  // Check if all fields are valid
  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && validateEmail(email);
  };

  // Handle save action
  const handleSave = () => {
    if (!isFormValid()) {
      // If form is invalid, show errors for empty fields
      setErrors({
        name: name.trim() === "" ? "This field is required." : "",
        email:
          email.trim() === ""
            ? "This field is required."
            : !validateEmail(email)
              ? "Please enter a valid email address."
              : "",
      });
      return;
    }

    // Call the onSave function with the student data
    onSave({ name, email });

    // Clear the form and close the modal
    setName("");
    setEmail("");
    setErrors({ name: "", email: "" });
    onClose();
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="new-student-modal-overlay">
      <div
        className={`new-student-modal-content new-student-modal-content2 ${isBouncing ? "bounce" : ""
          }`}
        ref={modalRef}
      >
        <div className="new-student-modal-header">
          <h5>Add Student</h5>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="new-student-modal-body">
          <div className="new-student-form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              placeholder="Enter student name"
              className="new-student-form-control"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="new-student-form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              placeholder="Enter student email"
              className="new-student-form-control"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <div className="new-student-modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button
            className="btn create-btn"
            onClick={handleSave}
            disabled={!isFormValid()} // Disable Save button if form is invalid
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;