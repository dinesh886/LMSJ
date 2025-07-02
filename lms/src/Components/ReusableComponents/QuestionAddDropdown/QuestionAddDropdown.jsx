import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaCopy, FaTrashAlt, FaArrowRight, FaFolderPlus } from "react-icons/fa";


const QuestionAddDropdown = ({ onAddAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddClick = (actionType, e) => {
        e.stopPropagation();
        onAddAction(actionType);
        setIsOpen(false);
    };

    const addActions = [
        {
            type: 'copy',
            label: 'Copy',
            icon: <FaCopy className="action-dropdown-icon" />,
            className: 'copy-item'
        },
        {
            type: 'edit',
            label: 'Edit',
            icon: <FaEdit className="action-dropdown-icon" />,
            className: 'edit-item'
        },
        {
            type: 'move',
            label: 'Move to Test',
            icon: <FaArrowRight className="action-dropdown-icon" />,
            className: 'move-item'
        },
        {
            type: 'folder',
            label: 'Add to Section',
            icon: <FaFolderPlus className="action-dropdown-icon" />,
            className: ''
        },
        {
            type: 'delete',
            label: 'Delete',
            icon: <FaTrashAlt className="action-dropdown-icon" />,
            className: 'delete-item'
          }
    ];

    return (
        <div className="action-dropdown-container" ref={dropdownRef}>
            <button
                className="action-dropdown-button"
                onClick={toggleDropdown}
                aria-label="Add questions"
            >
                <HiDotsVertical />
            </button>

            <div className={`action-dropdown-menu ${isOpen ? "show" : ""}`}>
                {addActions.map((action, index) => (
                    <div
                        key={index}
                        className={`action-dropdown-item ${action.className}`}
                        onClick={(e) => handleAddClick(action.type, e)}
                    >
                        {action.icon}
                        <span>{action.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionAddDropdown;