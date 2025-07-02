import React, { useState } from "react";
import './ColumnDisability.css'

const ColumnVisibilityDropdown = ({ selectedColumns, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleColumnChange = (event) => {
    const { value, checked } = event.target;
    onChange(value, checked);
  };

  return (
    <div className="testadd-column-dropdown">
      <button className="view-button" onClick={handleDropdownToggle}>
        View
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {["owner", "type", "marks", "actions"].map((column) => (
            <label key={column} className="testquestionadd-dropdown-item">
              <input
                type="checkbox"
                value={column}
                checked={selectedColumns[column] || false}
                onChange={handleColumnChange}
                className="dropdown-checkbox"
              />
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnVisibilityDropdown;
