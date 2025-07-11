"use client";

import React, { useRef, useEffect } from "react";
import './TagActionsDropdown.css';

const TagActionsDropdown = ({
    isOpen,
    onEdit,
    onRemove,
    onClose,
    tagId,
    tagName,
    tagColor
}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit({ name: tagName, color: tagColor, id: tagId });
        onClose();
    };

    const handleRemoveClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to remove the tag "${tagName}"?`)) {
            onRemove(tagId);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="tag-rename-options" ref={dropdownRef}>
            <ul className="tag-list-dropdown">
                <li
                    className="testquestionadd-dropdown-item testquestionadd-dropdown-item2"
                    onClick={handleEditClick}
                >
                    Edit
                </li>
                <li
                    className="testquestionadd-dropdown-item"
                    onClick={handleRemoveClick}
                >
                    Remove
                </li>
            </ul>
        </div>
    );
};

export default TagActionsDropdown;