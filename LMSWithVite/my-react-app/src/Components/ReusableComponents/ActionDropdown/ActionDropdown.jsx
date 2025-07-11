import { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaCopy, FaTrashAlt, FaArrowRight } from "react-icons/fa";
import "./ActionDropdown.css";

const ActionDropdown = ({ questionId, onAction }) => {
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

    const handleActionClick = (actionType, e) => {
        e.stopPropagation();
        onAction(actionType, questionId);
        setIsOpen(false);
    };

    const actions = [
        {
            type: 'edit',
            label: 'Edit',
            icon: <FaEdit className="action-dropdown-icon" />,
            className: 'edit-item'
        },
        {
            type: 'copy',
            label: 'Copy',
            icon: <FaCopy className="action-dropdown-icon" />,
            className: 'copy-item'
        },
        {
            type: 'delete',
            label: 'Delete',
            icon: <FaTrashAlt className="action-dropdown-icon" />,
            className: 'delete-item'
        },
        {
            type: 'move',
            label: 'Move to Test',
            icon: <FaArrowRight className="action-dropdown-icon" />,
            className: 'move-item'
        },
        {
            type: 'setmarks',
            label: 'Set Mark',
            icon: <span className="action-dropdown-icon mark-symbol">M</span>,
            className: 'marks-item'
        }
      ];

    return (
        <div className="action-dropdown-container" ref={dropdownRef}>
            <button
                className="action-dropdown-button"
                onClick={toggleDropdown}
                aria-label="More actions"
            >
                <HiDotsVertical />
            </button>

            <div className={`action-dropdown-menu ${isOpen ? "show" : ""}`}>
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className={`action-dropdown-item ${action.className}`}
                        onClick={(e) => handleActionClick(action.type, e)}
                    >
                        {action.icon}
                        <span>{action.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActionDropdown;
