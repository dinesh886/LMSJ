import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';

const AddTagsComponent = ({ isOpen, onClose }) => {
    const [newTag, setNewTag] = useState("");
    const defaultColors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#33FFEC",
        "#F7FF33", "#FF9633", "#9B33FF", "#33A6FF"
    ];
    const [tagColor, setTagColor] = useState(defaultColors[0]); // Default to the first color
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [isCustomColor, setIsCustomColor] = useState(false);
    const [customColor, setCustomColor] = useState("#000000");
    const [tags, setTags] = useState(["Tag 1", "Tag 2", "Tag 3", "Tag 4"]);

    const handleCreateClick = () => {
        if (newTag.trim() && tagColor) {
            console.log("New Tag Created:", newTag, tagColor);
            setTags([...tags, { name: newTag, color: tagColor }]);
            onClose(); // Close modal after tag creation
        } else {
            setTooltipVisible(true); // Show tooltip if tag is empty or color is not selected
        }
    };

    const handleTagChange = (e) => {
        setNewTag(e.target.value);
        if (tooltipVisible && e.target.value.trim()) {
            setTooltipVisible(false);
        }
    };


    const isAddButtonEnabled = newTag.trim() !== '' && tagColor;
const [isZoomOut, setIsZoomOut] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen); // Ensure modal remains visible

  useEffect(() => {
    if (isOpen) {
      setIsZoomOut(false);
      setIsVisible(true); // Keep modal visible after zoom-out
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsZoomOut(true); // Trigger zoom-out animation
  };

  const handleAnimationEnd = () => {
    if (isZoomOut) {
      setIsZoomOut(false); // Reset zoom effect without closing modal
    }
  };

  const handleOverlayClick = () => {
    setIsZoomOut(true); // Trigger zoom-out on outside click
    setTimeout(() => {
      setIsZoomOut(false); // Reset zoom after animation
    }, 300);
  };

    return (
        <>
            {isOpen && (
                <div className="newtest-modal-overlay" onClick={handleOverlayClick}>
                    <div  className={`tag-modal ${isZoomOut ? "zoom-out" : "zoom-in"}`}
                        onAnimationEnd={handleAnimationEnd}
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="all-modal-headings">Create New Tag
                            <CloseIcon
                                className="close-icon"
                                onClick={onClose}
                                sx={{ color: "#037de2" }}
                            />
                        </h2>
                        <div className="tag-modal-body">
                            {/* <label>New Tag Name:</label> */}
                            <input
                                type="text"
                                value={newTag}
                                onChange={handleTagChange}
                                placeholder="New Tag Name"
                            />
                            {tooltipVisible && !newTag.trim() && (
                                <div className="tag-tooltip">Please enter a tag name!</div>
                            )}

                            <label>Tag Color:</label>
                            <div className="color-selection-container">
                                {defaultColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`color-box ${color === tagColor ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setTagColor(color)}
                                    >
                                        {color === tagColor && <FaCheck className="checkmark" />}
                                    </div>
                                ))}
                                {isCustomColor && (
                                    <div className="color-picker-container color-box">
                                        <input
                                            type="color"
                                            value={customColor}
                                            onChange={(e) => {
                                                setCustomColor(e.target.value);
                                                setTagColor(e.target.value); // Set the custom color as the selected color
                                            }}
                                        />
                                    </div>
                                )}
                                <div
                                    className="color-box custom-color-box"
                                    onClick={() => setIsCustomColor(true)}
                                >
                                    <FaPlus />
                                </div>
                            </div>
                        </div>

                        <div className="newtest-modal-actions">
                            <button
                                onClick={handleCreateClick}

                                className={`newtest-modal-button create ${!isAddButtonEnabled ? 'muted' : ''}`}

                               

                                disabled={!isAddButtonEnabled}
                            >
                                Create
                            </button>
                            <button onClick={onClose} className="load-more-button cancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTagsComponent;