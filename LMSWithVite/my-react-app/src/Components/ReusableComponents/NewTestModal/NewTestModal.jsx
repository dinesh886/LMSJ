import React, { useState } from "react";
import './NewTestModal.css'
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal"; // Import the custom hook

const NewTestModal = ({ isOpen, onClose, onCreate }) => {

    const { modalRef, isBouncing } = useBounceModal(isOpen); // Corrected line

    const [testName, setTestName] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [errors, setErrors] = useState({}); // State to store validation errors

    // Check if all fields are filled and valid
    const isFormValid = () => {
        return (
            testName.trim() !== "" &&
            duration !== "" && // Ensure duration is not empty
            !isNaN(duration) && // Ensure duration is a number
            duration >= 0 && // Ensure duration is non-negative
            duration <= 600 && // Ensure duration is not greater than 600
            description.trim() !== "" &&
            instructions.trim() !== ""
        );
    };

    const handleCreate = () => {
        // Clear previous errors
        setErrors({});

        // Validate input
        const newErrors = {};

        if (!testName) {
            newErrors.testName = "Test Name is required.";
        }
        if (!duration) {
            newErrors.duration = "Duration is required.";
        } else if (isNaN(duration)) {
            newErrors.duration = "Duration must be a number.";
        } else if (duration < 0) {
            newErrors.duration = "Duration cannot be negative.";
        } else if (duration > 600) {
            newErrors.duration = "Duration cannot be greater than 600.";
        }
        if (!description) {
            newErrors.description = "Description is required.";
        }
        if (!instructions) {
            newErrors.instructions = "Instructions are required.";
        }

        // If there are errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Call the onCreate function with the test details
        onCreate({ testName, duration, description, instructions });

        // Clear the input and close the modal
        setTestName("");
        setDuration("");
        setDescription("");
        setInstructions("");
        onClose();
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDuration(value); // Allow any input but validate later

        // Validate duration immediately
        if (value !== "" && !isNaN(value)) {
            const numericValue = parseFloat(value);
            if (numericValue > 600) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    duration: "Duration cannot be greater than 600.",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    duration: "",
                }));
            }
        }
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="newtest-modal-overlay">
            <div className={`newtest-modal-content newtest-modal-content2 ${isBouncing ? "bounce" : ""}`} ref={modalRef}>
                {/* Modal Header */}
                <div className="newtest-modal-header">
                    <h5>Create New Test</h5>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="newtest-modal-body">
                    <div className="newtest-form-group">
                        {/* <label>Test Name</label> */}
                        <input
                            type="text"
                            value={testName}
                            className="newtest-form-control"
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="Enter test name"
                        />
                        {errors.testName && (
                            <p className="error-message">{errors.testName}</p>
                        )}
                    </div>

                    <div className="newtest-form-group">
                        {/* <label>Duration (in minutes)</label> */}
                        <input
                            type="number"
                            value={duration}
                            className="newtest-form-control"
                            onChange={handleDurationChange}
                            placeholder="Enter duration"
                            min="0" // Prevent negative values
                            max="600" // Prevent values greater than 600
                        />
                        {errors.duration && (
                            <p className="error-message">{errors.duration}</p>
                        )}
                    </div>

                    <div className="newtest-form-group">
                        {/* <label>Description</label> */}
                        <textarea
                            value={description}
                            className="newtest-form-control"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            rows="3"
                        />
                        {errors.description && (
                            <p className="error-message">{errors.description}</p>
                        )}
                    </div>

                    <div className="newtest-form-group">
                        {/* <label>Instructions</label> */}
                        <textarea
                            value={instructions}
                            className="newtest-form-control"
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Enter instructions"
                            rows="3"
                        />
                        {errors.instructions && (
                            <p className="error-message">{errors.instructions}</p>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="newtest-modal-footer">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn create-btn" // Add a unique class
                        onClick={handleCreate}
                        disabled={!isFormValid()} // Disable button if form is invalid
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTestModal;