import React, { useState, useEffect, useRef } from "react";
import "./NewQBModal.css";
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal"; // Import the custom hook

const NewQBModal = ({ isOpen, onClose, onCreate }) => {
    const { modalRef, isBouncing } = useBounceModal(isOpen); // Corrected line
    const [qbName, setQBName] = useState("");
    const [error, setError] = useState(""); // State to store validation error
    const inputRef = useRef(null); // Ref for the input field
    const handleCreate = () => {
        if (!qbName.trim()) {
            setError("QB Name is required.");
            return;
        }

        // Call the onCreate function with the QB name
        onCreate(qbName);

        // Clear input and close modal
        setQBName("");
        setError(""); // Clear error after successful creation
        onClose();
    };
    // Auto-focus the input field when the modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        isOpen && (
            <div className="newqb-modal-overlay">
                <div className={`newqb-modal-content newqb-modal-content2 ${isBouncing ? "bounce" : ""}`} ref={modalRef}>
                    <div className="newqb-modal-header">
                        <h5>Create New QB</h5>
                        <button className="close-btn" onClick={onClose}>
                            &times;
                        </button>
                    </div>

                    <div className="newqb-modal-body">
                        <div className="newqb-form-group">
                            <input
                                type="text"
                                value={qbName}
                                className="newqb-form-control"
                                onChange={(e) => {
                                    setQBName(e.target.value);
                                    setError(""); // Clear error when user starts typing
                                   
                                }}
                                placeholder="Enter QB name"
                                ref={inputRef} // Attach the ref to the input field
                            />
                            {error && <p className="error-message">{error}</p>} {/* Show error below input */}
                        </div>
                    </div>

                    <div className="newqb-modal-footer">
                        <button className="btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn create-btn" onClick={handleCreate} disabled={!qbName.trim()}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default NewQBModal;
