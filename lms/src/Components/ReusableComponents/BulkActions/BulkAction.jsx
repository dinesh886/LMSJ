import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaArchive, FaDownload, FaTag } from "react-icons/fa";
import "./BulkAction.css";
import AddTagModal from "../../ReusableComponents/AddTagModal/AddTagModal";

const BulkActions = ({ selectedRows = [], availableActions = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const tagOptionsRef = useRef(null);
  const moreOptionsRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const tagColors = {
    Urgent: "#FF0000",
    Review: "#FF9900",
    Completed: "#008000",
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const renderActionButton = (action, index) => {
    switch (action) {
      case "delete":
        return (
          <button className="tube-action-button" data-tooltip="Delete">
            <FaTrash size={14} />
          </button>
        );
      case "archive":
        return (
          <button className="tube-action-button" data-tooltip="Archive">
            <FaArchive size={14} />
          </button>
        );
      case "download":
        return (
          <button className="tube-action-button" data-tooltip="Download">
            <FaDownload size={14} />
          </button>
        );
      case "tag":
        return (
          <button
            className={`tube-action-button dropdown-toggle2 ${activeDropdown === "tag" ? "active" : ""
              }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("tag");
            }}
            ref={tagOptionsRef}
          >
            <FaTag size={14} />
          </button>
        );
      case "more":
        // Only show More button when single row is selected
        if (selectedRows.length === 1) {
          return (
            <button
              className={`tube-action-button dropdown-toggle2 ${activeDropdown === "more" ? "active" : ""
                }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("more");
              }}
              ref={moreOptionsRef}
            >
              More
            </button>
          );
        }
        return null;
      default:
        return null;
    }
  };

  // Hide divider before More button when More is hidden
  const shouldShowDivider = (index) => {
    // Don't show divider after last element
    if (index === availableActions.length - 1) return false;

    // Special case for divider before More button
    if (availableActions[index + 1] === "more") {
      return selectedRows.length === 1; // Only show if More is visible
    }

    // Show all other dividers
    return true;
  };

  if (!selectedRows.length || !availableActions.length) return null;

  return (
    <div className="tube-bulk-actions-container" ref={dropdownRef}>
      <div className="tube-bulk-actions">
        {availableActions.map((action, index) => (
          <React.Fragment key={`${action}-${index}`}>
            <div className="tube-bulk-button">
              {renderActionButton(action, index)}
            </div>
            {shouldShowDivider(index) && <div className="tube-divider" />}
          </React.Fragment>
        ))}

        {/* Dropdown menus */}
        {activeDropdown === "tag" && (
          <div className="tag-options">
            <p className="addtotag-box-heading">Add to tag</p>
            <ul>
              {Array.isArray(tags) &&
                tags.map((tag, index) => (
                  <li key={index} className="tag-item">
                    <span
                      className="tag-dot"
                      style={{ backgroundColor: tagColors[tag] || "#000" }}
                    ></span>
                    {tag}
                  </li>
                ))}
            </ul>
            <div>
              <button
                className="add-tag-button add-tag-button2"
                onClick={() => setIsNewTagModalOpen(true)}
              >
                Create New tag
              </button>
            </div>
          </div>
        )}

        {activeDropdown === "more" && (
          <div className="more-options">
            <ul>
              <li className="dropdown-item">Rename</li>
              <li className="dropdown-item">Make a Copy</li>
            </ul>
          </div>
        )}
      </div>

      <AddTagModal
        isOpen={isNewTagModalOpen}
        onClose={() => setIsNewTagModalOpen(false)}
        heading="Create New Tag"
      />
    </div>
  );
};

export default BulkActions;