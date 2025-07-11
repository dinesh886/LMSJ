import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaArchive, FaDownload, FaTag } from "react-icons/fa";
import { Trash2, Archive, Download, Tag } from "lucide-react";
import { BiSolidTag } from "react-icons/bi";

import "./BulkAction.css";
import AddTagModal from "../../ReusableComponents/AddTagModal/AddTagModal";

const BulkActions = ({ selectedRows = [], availableActions = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const tagOptionsRef = useRef(null);
  const moreOptionsRef = useRef(null);
  const dropdownRef = useRef(null);
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);

  const tagColors = {
    Urgent: "#FF0000",
    Review: "#FF9900",
    Completed: "#008000",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const renderActionButton = (action, index, isLastVisible) => {
    const baseClass = `tube-action-button ${isLastVisible ? "last-visible" : ""}`;
    switch (action) {
      case "delete":
        return <button className={baseClass} data-tooltip="Delete"><Trash2 size={18} /></button>;
      case "archive":
        return <button className={baseClass} data-tooltip="Archive"><Archive size={18} /></button>;
      case "download":
        return <button className={baseClass} data-tooltip="Download"><Download size={18} /></button>;
      case "tag":
        return (
          <button
            className={`${baseClass} dropdown-toggle2 ${activeDropdown === "tag" ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("tag");
            }}
            ref={tagOptionsRef}
          >
            <BiSolidTag size={18} className=" tag-flipped" />
          </button>
        );
      case "more":
        if (selectedRows.length === 1) {
          return (
            <button
              className={`${baseClass} dropdown-toggle2 moreoption ${activeDropdown === "more" ? "active" : ""}`}
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

  const shouldShowDivider = (index) => {
    if (index === availableActions.length - 1) return false;
    if (availableActions[index + 1] === "more") {
      return selectedRows.length === 1;
    }
    return true;
  };

  if (!selectedRows.length || !availableActions.length) return null;

  // ✅ Filter visible actions and get the last one
  const visibleActions = availableActions.filter(action => {
    if (action === "more") return selectedRows.length === 1;
    return true;
  });
  const lastVisibleAction = visibleActions[visibleActions.length - 1];

  return (
    <div className="tube-bulk-actions-container" ref={dropdownRef}>
      <div className="tube-bulk-actions">
        {availableActions.map((action, index) => {
          const isVisible = action !== "more" || selectedRows.length === 1;
          if (!isVisible) return null;

          const isLastVisible = action === lastVisibleAction;

          return (
            <React.Fragment key={`${action}-${index}`}>
              <div className="tube-bulk-button">
                {renderActionButton(action, index, isLastVisible)}
              </div>
              {shouldShowDivider(index) && <div className="tube-divider" />}
            </React.Fragment>
          );
        })}

        {/* Dropdowns */}
        {activeDropdown === "tag" && (
          <div className="tag-options">
            <p className="addtotag-box-heading">Add to tag</p>
            <ul className="tag-options-list">
              {tags.map((tag, index) => (
                <li key={index} className="tag-options-item">
                  <span className="tag-dot" style={{ backgroundColor: tagColors[tag] || "#000" }}></span>
                  {tag}
                </li>
              ))}
            </ul>
            <div>
              <button className="tags-create-button" onClick={() => setIsNewTagModalOpen(true)}>
                Create New tag
              </button>
            </div>
          </div>
        )}

        {activeDropdown === "more" && (
          <div className="more-options">
            <ul>
              <li className="more-options-item">Rename</li>
              <li className="more-options-item">Make a Copy</li>
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