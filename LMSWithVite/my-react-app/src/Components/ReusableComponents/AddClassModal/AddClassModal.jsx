import React, { useState } from "react";
import "./AddClassModal.css";

const AddClassModal = ({ open, onClose }) => {
    const [className, setClassName] = useState("");
    const [addStudentsOption, setAddStudentsOption] = useState("onlyByAdmin"); // Default option
    const [maxStrengthOption, setMaxStrengthOption] = useState("unlimited"); // For "Only by Admin"
    const [maxStrength, setMaxStrength] = useState(0); // For "Limited" option
    const [permissionOption, setPermissionOption] = useState("autoActivation"); // For "By Themself" and "Hybrid"
    const [expiryDate, setExpiryDate] = useState(""); // For "By Themself" and "Hybrid"

    // Handle form submission
    const handleSubmit = () => {
        const classData = {
            className,
            addStudentsOption,
            maxStrengthOption,
            maxStrength: maxStrengthOption === "limited" ? maxStrength : null,
            permissionOption,
            expiryDate,
        };
        console.log(classData); // Log the form data
        onClose(); // Close the modal
    };

    if (!open) return null;

    return (
        <div className="add-class-modal-overlay">
            <div className="add-class-modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                    <h5>Add New Class</h5>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    {/* Class Name Field */}
                    <div className="form-group">
                        <label>Class Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="Enter class name"
                        />
                    </div>

                    {/* Add Students Options */}
                    <div className="form-group">
                        <label>Add Students</label>
                        <div className="options">
                            <label>
                                <input
                                    type="radio"
                                    value="onlyByAdmin"
                                    checked={addStudentsOption === "onlyByAdmin"}
                                    onChange={() => setAddStudentsOption("onlyByAdmin")}
                                />
                                Only by Admin
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="byThemself"
                                    checked={addStudentsOption === "byThemself"}
                                    onChange={() => setAddStudentsOption("byThemself")}
                                />
                                By Themself (Students)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="hybrid"
                                    checked={addStudentsOption === "hybrid"}
                                    onChange={() => setAddStudentsOption("hybrid")}
                                />
                                Both Way (Hybrid)
                            </label>
                        </div>
                    </div>

                    {/* Conditional Fields Based on Add Students Option */}
                    {addStudentsOption === "onlyByAdmin" && (
                        <div className="form-group">
                            <label>Max Strength</label>
                            <div className="options">
                                <label>
                                    <input
                                        type="radio"
                                        value="unlimited"
                                        checked={maxStrengthOption === "unlimited"}
                                        onChange={() => setMaxStrengthOption("unlimited")}
                                    />
                                    Unlimited
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="limited"
                                        checked={maxStrengthOption === "limited"}
                                        onChange={() => setMaxStrengthOption("limited")}
                                    />
                                    Limited
                                </label>
                            </div>
                            {maxStrengthOption === "limited" && (
                                <input
                                    type="number"
                                    className="form-control"
                                    value={maxStrength}
                                    onChange={(e) => setMaxStrength(e.target.value)}
                                    placeholder="Enter max strength"
                                />
                            )}
                        </div>
                    )}

                    {(addStudentsOption === "byThemself" || addStudentsOption === "hybrid") && (
                        <>
                            <div className="form-group">
                                <label>Permission</label>
                                <div className="options">
                                    <label>
                                        <input
                                            type="radio"
                                            value="autoActivation"
                                            checked={permissionOption === "autoActivation"}
                                            onChange={() => setPermissionOption("autoActivation")}
                                        />
                                        Auto Activation
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="manualActivation"
                                            checked={permissionOption === "manualActivation"}
                                            onChange={() => setPermissionOption("manualActivation")}
                                        />
                                        Manual Activation
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Expiry Date and Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* Generate Class Link */}
                    <div className="form-group">
                        <button className="btn-generate-link">
                            Generate Class Link
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Add Class
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddClassModal;