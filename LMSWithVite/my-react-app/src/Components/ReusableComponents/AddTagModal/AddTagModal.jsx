"use client";

import React, { useState, useRef, useEffect } from "react";
import './AddTagModal.css';
import { FaPlus } from "react-icons/fa";
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal";

const AddTagModal = ({ isOpen, onClose, onAddFolder, heading, selectedSection }) => {
    const { modalRef, isBouncing } = useBounceModal(isOpen);
    const [folderName, setFolderName] = useState("");
    const [customColor, setCustomColor] = useState("#000000");
    const [error, setError] = useState("");
    const colorPickerRef = useRef(null);
    const inputRef = useRef(null);

    const colorOptions = [
        "#F04343", "#DD8A3E", "#43A7F0",
        "#33CF67", "#FF4BCD", "#B943F0",
    ];
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

    // Initialize form with selectedSection data when editing
    useEffect(() => {
        if (isOpen && selectedSection) {
            setFolderName(selectedSection.name || "");
            setSelectedColor(selectedSection.color || colorOptions[0]);
            setCustomColor(selectedSection.color || "#000000");
        } else {
            // Reset form for new tag
            setFolderName("");
            setSelectedColor(colorOptions[0]);
            setCustomColor("#000000");
        }
    }, [isOpen, selectedSection]);

    // Auto-focus the input field when the modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleAddtag = () => {
        if (!folderName.trim()) {
            setError("Folder name is required.");
            return;
        }

        const finalColor = selectedColor || customColor;
        if (!finalColor) {
            setError("Please select a color.");
            return;
        }

        onAddFolder({ name: folderName, color: finalColor });
        onClose();
    };

    const handleCustomColorChange = (e) => {
        const color = e.target.value;
        setCustomColor(color);
        setSelectedColor(color);
    };

    const openColorPicker = () => {
        colorPickerRef.current.click();
    };

    if (!isOpen) return null;

    return (
        <div className="newtag-modal-overlay">
            <div className={`newtag-modal-content newtag-modal-content2 ${isBouncing ? "bounce" : ""}`} ref={modalRef}>
                <div className="newtag-modal-header">
                    <h5>{heading}</h5>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="newtag-modal-body">
                    <div className="newtag-form-group">
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => {
                                setFolderName(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter Tag name"
                            className="newtag-form-control"
                            ref={inputRef}
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>

                    <div className="newtag-form-group">
                        <label>Choose Color</label>
                        <div className="color-options">
                            {colorOptions.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-option ${selectedColor === color ? "selected" : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        setCustomColor("");
                                    }}
                                >
                                    {selectedColor === color && <span className="tick-icon">✔</span>}
                                </div>
                            ))}

                            <div
                                className={`color-option custom-color ${selectedColor === customColor ? "selected" : ""}`}
                                style={{ backgroundColor: customColor }}
                                onClick={openColorPicker}
                            >
                                {selectedColor === customColor ? (
                                    <span className="tick-icon">✔</span>
                                ) : (
                                    <span className="custom-color-label"><FaPlus /></span>
                                )}
                                <input
                                    type="color"
                                    ref={colorPickerRef}
                                    value={customColor}
                                    onChange={handleCustomColorChange}
                                    className="color-picker"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="newtag-modal-footer">
                    <button className="btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className={`btn create-btn ${folderName.trim() ? "" : "disabled"}`}
                        onClick={handleAddtag}
                        disabled={!folderName.trim()}
                    >
                        {heading.startsWith("Edit") ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTagModal;