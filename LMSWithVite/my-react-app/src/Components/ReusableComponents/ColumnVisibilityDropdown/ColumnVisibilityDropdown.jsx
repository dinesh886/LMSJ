import { useState, useRef, useEffect } from "react";
import "./ColumnVisibilityDropdown.css";

const ColumnVisibilityDropdown = ({ columns, onToggleColumn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
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

    return (
        <div className="columnvisibility-dropdown-container" ref={dropdownRef}>
            <button
                className={`columnvisibility-dropdown-button load-more-button2 ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}
            >
                View
            </button>


            <div className={`columnvisibility-dropdown-menu ${isOpen ? "show" : ""}`}>
                {columns.map((column, index) => (
                    <div
                        key={index}
                        className="columnvisibility-dropdown-item"
                        onClick={(e) => {
                            if (e.target.tagName !== 'INPUT') {
                                onToggleColumn(column.selector);
                            }
                        }}
                    >
                        
                        <input
                            type="checkbox"
                            checked={column.isVisible}
                            onChange={() => onToggleColumn(column.selector)}
                            className="columnvisibility-checkbox"
                        />
                        <span>{column.name}</span>
                    </div>
                 
                ))}
            </div>
        </div>
    );
};

export default ColumnVisibilityDropdown;
