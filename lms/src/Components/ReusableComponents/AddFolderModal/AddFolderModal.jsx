import React, { useState,useEffect ,useRef } from "react";
import "./AddFolderModal.css"; // Import the CSS file
import { FaPlus } from "react-icons/fa";
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal"; // Import the custom hook

const AddFolderModal = ({ isOpen, onClose, onAddFolder, heading, selectedSection }) => {
        const { modalRef, isBouncing } = useBounceModal(isOpen); // Corrected line
    const [folderName, setFolderName] = useState("");

    const [customColor, setCustomColor] = useState("#000000"); // Default custom color
    const [error, setError] = useState("");
    const colorPickerRef = useRef(null); // Ref for the color picker input
        const inputRef = useRef(null); // Ref for the input field
    // Auto-focus the input field when the modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    // Predefined color options
    const colorOptions = [
        "#F04343", // Red
        "#DD8A3E", // Teal
        "#43A7F0", // Blue
        "#33CF67", // Yellow
        "#FF4BCD",
        "#B943F0", // Pink
    ];
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]); // Default selected color

    const handleAddFolder = () => {
        if (!folderName.trim()) {
            setError("Folder name is required.");
            return;
        }

        const finalColor = selectedColor || customColor; // Use selected color or custom color
        if (!finalColor) {
            setError("Please select a color.");
            return;
        }

        // Call the onAddFolder function with folder details
        onAddFolder({ name: folderName, color: finalColor });

        // Reset form and close modal
        setFolderName("");
        setSelectedColor(null);
        setCustomColor("#000000"); // Reset custom color
        setError("");
        onClose();
    };

    const handleCustomColorChange = (e) => {
        const color = e.target.value;
        setCustomColor(color);
        setSelectedColor(color); // Automatically select the custom color
    };

    const openColorPicker = () => {
        colorPickerRef.current.click(); // Programmatically open the color picker
    };

    if (!isOpen) return null;

    return (
        <div className="newfolder-modal-overlay" >
            <div className={`newfolder-modal-content newtag-modal-content2 ${isBouncing ? "bounce" : ""}`} ref={modalRef}>
                {/* Modal Header */}
                <div className="newfolder-modal-header">
                    <h5>{heading}{selectedSection}</h5> {/* Display the dynamic heading */}
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="newfolder-modal-body">
                    {/* Folder Name Input */}
                    <div className="newfolder-form-group">
                        {/* <label>Folder Name</label> */}
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => {
                                setFolderName(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter folder name"
                            className="newfolder-form-control"
                            ref={inputRef} // Attach the ref to the input field
                        />
                        {/* Error Message */}
                        {error && <p className="error-message">{error}</p>}
                    </div>

                    {/* Color Selection */}
                    <div className="newfolder-form-group">
                        <label>Choose Color</label>
                        <div className="color-options">
                            {/* Predefined Color Options */}
                            {colorOptions.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-option ${selectedColor === color ? "selected" : ""
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        setCustomColor("#000000"); // Reset custom color when a predefined color is selected
                                    }}
                                >
                                    {selectedColor === color && (
                                        <span className="tick-icon">✔</span>
                                    )}
                                </div>
                            ))}

                            {/* Custom Color Option */}
                            <div
                                className={`color-option custom-color ${selectedColor === customColor ? "selected" : ""}`}
                                style={{ backgroundColor: customColor }}
                                onClick={openColorPicker}
                            >
                                {/* Show tick mark only if a custom color is selected */}
                                {selectedColor === customColor ? (
                                    <span className="tick-icon">✔</span>
                                ) : (
                                    <span className="custom-color-label"><FaPlus /></span> // Plus icon is hidden after selection
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

                    {/* Error Message */}
                    {/* {error && <p className="error-message">{error}</p>} */}
                </div>

                {/* Modal Footer */}
                <div className="newfolder-modal-footer">
                    <button className="btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className={`btn create-btn ${folderName.trim() ? "" : "disabled"}`}
                        onClick={handleAddFolder}
                        disabled={!folderName.trim()} // Disable if folderName is empty
                    >
                        Add Folder
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddFolderModal;