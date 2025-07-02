import React, { useRef, useEffect } from "react";
import './TagActionsDropdown.css';

const TagActionsDropdown = ({ isOpen, onEdit, onRemove, onClose }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the dropdown and not on the button that opened it
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !event.target.closest(".dropdown-toggle") // Add this class to the button that opens the dropdown
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="tag-rename-options" ref={dropdownRef}>
            <ul className="tag-list-dropdown">
                <li className="testquestionadd-dropdown-item testquestionadd-dropdown-item2" onClick={onEdit}>
                    Edit
                </li>
                <li className="testquestionadd-dropdown-item" onClick={onRemove}>
                    Remove
                </li>
            </ul>
        </div>
    );
};

export default TagActionsDropdown;