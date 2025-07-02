"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Plus,
  FileText,
  Share2,
  Send,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Menu,
  Tag,

} from "lucide-react";
import NewTestModal from "../../../ReusableComponents/NewTestModal/NewTestModal";
import AddTagModal from "../../../ReusableComponents/AddTagModal/AddTagModal";
import TagActionsDropdown from "../../../ReusableComponents/TagActionsDropdown/TagActionsDropdown";
import "./TestSidebar.css";

const TestSidebar = () => {
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Alltest");
  const [activeTag, setActiveTag] = useState("");
  const [tags, setTags] = useState(["Tag 1", "Tag 2"]);
  const [modalHeading, setModalHeading] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // Icon colors for tags
  const iconColors = ['#f44336', '#2196f3', '#ff9800', '#9c27b0'];

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileOpen(false);
  };

  const handleSetActiveTag = (tag) => {
    setActiveTag(tag);
    setIsMobileOpen(false);
  };

  const handleTagClick = (index) => {
    setShowMoreOptions(showMoreOptions === index ? null : index);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleAddtag = ({ name, color }) => {
    console.log("New Tag Created:", { name, color });
  };

  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Container */}
      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Main Navigation">
        <div className="test-sidebar-header">
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={() => setIsNewTestModalOpen(true)}
              className="allbuttons"
              aria-label="Create New Test"
            >
              <span className="sidebar-letters">New Test</span>
            </button>
          </div>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to="Alltest"
                className={`sidebar-contents ${activeSection === "Alltest" ? "active" : ""}`}
                aria-label="All Tests"
                onClick={() => handleSetActive("Alltest")}
              >
                <FileText className="icon" size={18} />
                <span className="sidebar-letters">All Tests</span>
              </Link>
            </li>
            <li>
              <Link
                to="shared-with-me"
                className={`sidebar-contents ${activeSection === "shared-with-me" ? "active" : ""}`}
                aria-label="Shared with me"
                onClick={() => handleSetActive("shared-with-me")}
              >
                <Share2 className="icon" size={18} />
                <span className="sidebar-letters">Shared with me</span>
              </Link>
            </li>
            <li>
              <Link
                to="dispatched"
                className={`sidebar-contents ${activeSection === "dispatched" ? "active" : ""}`}
                aria-label="Dispatched"
                onClick={() => handleSetActive("dispatched")}
              >
                <Send className="icon" size={18} />
                <span className="sidebar-letters">Published</span>
              </Link>
            </li>
            <li>
              <Link
                to="archived"
                className={`sidebar-contents ${activeSection === "archived" ? "active" : ""}`}
                aria-label="Archived"
                onClick={() => handleSetActive("archived")}
              >
                <Archive className="icon" size={18} />
                <span className="sidebar-letters">Archived</span>
              </Link>
            </li>
            <li>
              <Link
                to="trashed"
                className={`sidebar-contents ${activeSection === "trashed" ? "active" : ""}`}
                aria-label="Trashed"
                onClick={() => handleSetActive("trashed")}
              >
                <Trash2 className="icon" size={18} />
                <span className="sidebar-letters">Trashed</span>
              </Link>
            </li>
          </ul>
        </div>

        <hr />

        <div className="test-sidebar-section">
          <button
            className="newtag"
            aria-label="Create New Tag"
            onClick={() => {
              setIsNewTagModalOpen(true);
              setModalHeading("New Tag");
            }}
          >
            <Plus className="icon" size={18} />
            <span className="sidebar-letters">New Tag</span>
          </button>

          <ul className="test-sidebar-menu tags">
            {tags.map((tag, index) => (
              <li key={index} className="tag-item">
                <Link
                  className="sidebar-contents"
                  aria-label={`Tag: ${tag}`}
                >
                  <Tag
                    className="icon"
                    size={18}
                    style={{
                      color: iconColors[index % iconColors.length],
                    }}
                  />
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="sidebar-letters">{tag}</span>

                    <button className="tag-button">
                      <span className="tag-dropdown-toggle" onClick={() => handleTagClick(index)}></span>
                    </button>

                    <TagActionsDropdown
                      isOpen={showMoreOptions === index}
                      onEdit={() => {
                        setIsNewTagModalOpen(true);
                        setShowMoreOptions(null);
                        setModalHeading("Edit ");
                        setSelectedSection(tags[index]);
                      }}
                      onRemove={() => setShowMoreOptions(null)}
                      onClose={() => setShowMoreOptions(null)}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="sidebar-contents" style={{ fontStyle: "italic" }}> Uncategorized<span className="number">(5)</span></p>
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className={`mobile-toggle-btn ${isMobileOpen ? "sidebar-open" : ""}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Modals */}
      <NewTestModal
        isOpen={isNewTestModalOpen}
        onClose={() => setIsNewTestModalOpen(false)}
        onCreate={() => { }}
      />

      <AddTagModal
        isOpen={isNewTagModalOpen}
        onClose={() => setIsNewTagModalOpen(false)}
        onAddFolder={handleAddtag}
        heading={modalHeading}
        selectedSection={selectedSection}
      />
    </div>
  );
};

export default TestSidebar;