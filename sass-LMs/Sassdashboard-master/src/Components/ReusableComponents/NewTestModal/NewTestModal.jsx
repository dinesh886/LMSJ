import React, { useState, useEffect } from "react";
import './NewTestModal.css';
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal";

const NewTestModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialName = "",
    initialDuration = "",
    initialDescription = "",
    initialInstructions = "",
    mode = "create"
}) => {
    const { modalRef, isBouncing } = useBounceModal(isOpen);

    const [testName, setTestName] = useState(initialName);
    const [duration, setDuration] = useState(initialDuration);
    const [description, setDescription] = useState(initialDescription);
    const [instructions, setInstructions] = useState(initialInstructions);
    const [errors, setErrors] = useState({});

    // Reset form when initial values change (for edit mode)
    useEffect(() => {
        if (isOpen) {
            setTestName(initialName);
            setDuration(initialDuration);
            setDescription(initialDescription);
            setInstructions(initialInstructions);
            setErrors({});
        }
    }, [isOpen, initialName, initialDuration, initialDescription, initialInstructions]);

    const isFormValid = () => {
        // For create mode, allow empty fields initially
        if (mode === "create") {
            return true;
        }
        // For edit mode, require all fields
        return (
            testName.trim() !== "" &&
            duration !== "" &&
            !isNaN(duration) &&
            duration >= 0 &&
            duration <= 600 &&
            description.trim() !== "" &&
            instructions.trim() !== ""
        );
    };

    const handleSubmit = () => {
        setErrors({});
        const newErrors = {};

        if (!testName.trim()) newErrors.testName = "Test Name is required.";
        if (duration === "") {
            newErrors.duration = "Duration is required.";
        } else if (isNaN(duration)) {
            newErrors.duration = "Duration must be a number.";
        } else if (duration < 0) {
            newErrors.duration = "Duration cannot be negative.";
        } else if (duration > 600) {
            newErrors.duration = "Duration cannot be greater than 600.";
        }
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!instructions.trim()) newErrors.instructions = "Instructions are required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            name: testName,
            duration: Number(duration),
            description,
            instructions
        });
        onClose();
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDuration(value);

        if (value !== "" && !isNaN(value)) {
            const numericValue = parseFloat(value);
            if (numericValue > 600) {
                setErrors(prev => ({ ...prev, duration: "Duration cannot be greater than 600." }));
            } else {
                setErrors(prev => ({ ...prev, duration: "" }));
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="newtest-modal-overlay">
            <div className={`newtest-modal-content newtest-modal-content2 ${isBouncing ? "bounce" : ""}`} ref={modalRef}>
                <div className="newtest-modal-header">
                    <h5>{mode === "create" ? "Create New Test" : "Edit Test"}</h5>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="newtest-modal-body">
                    <div className="newtest-form-group">
                        <input
                            type="text"
                            value={testName}
                            className={`newtest-form-control ${errors.testName ? 'error' : ''}`}
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="Enter test name"
                        />
                        {errors.testName && <p className="error-message">{errors.testName}</p>}
                    </div>

                    <div className="newtest-form-group">
                        <input
                            type="number"
                            value={duration}
                            className={`newtest-form-control ${errors.duration ? 'error' : ''}`}
                            onChange={handleDurationChange}
                            placeholder="Enter duration (minutes)"
                            min="0"
                            max="600"
                        />
                        {errors.duration && <p className="error-message">{errors.duration}</p>}
                    </div>

                    <div className="newtest-form-group">
                        <textarea
                            value={description}
                            className={`newtest-form-control ${errors.description ? 'error' : ''}`}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            rows="3"
                        />
                        {errors.description && <p className="error-message">{errors.description}</p>}
                    </div>

                    <div className="newtest-form-group">
                        <textarea
                            value={instructions}
                            className={`newtest-form-control ${errors.instructions ? 'error' : ''}`}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Enter instructions"
                            rows="3"
                        />
                        {errors.instructions && <p className="error-message">{errors.instructions}</p>}
                    </div>
                </div>

                <div className="newtest-modal-footer">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn create-btn"
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Create" : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTestModal;