"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Menu,
  Folder,
  Plus
} from "lucide-react";
import NewTeacherModal from "../../../ReusableComponents/NewTeacherModal/NewTeacherModal";
import AddFolderModal from "../../../ReusableComponents/AddFolderModal/AddFolderModal";
import TagActionsDropdown from "../../../ReusableComponents/TagActionsDropdown/TagActionsDropdown";
import "./TeachersSidebar.css";

const TeachersSidebar = () => {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isNewTeacherModalOpen, setIsNewTeacherModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("AllTeachers");
  const [activeTag, setActiveTag] = useState("");
  const [folders, setFolders] = useState(["Folder 1", "Folder 2"]);
  const [modalHeading, setModalHeading] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // Icon colors for folders
  const iconColors = ['#f44336', '#2196f3', '#ff9800', '#9c27b0'];

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileOpen(false);
  };

  const handleSetActiveTag = (tag) => {
    setActiveTag(tag);
    setIsMobileOpen(false);
  };

  const handleFolderClick = (index) => {
    setShowMoreOptions(showMoreOptions === index ? null : index);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleAddFolder = ({ name, color }) => {
    console.log("New Folder Created:", { name, color });
  };

  const handleCreateTeacher = (teacherName) => {
    console.log("New Teacher Created:", teacherName);
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
              onClick={() => setIsNewTeacherModalOpen(true)}
              className="allbuttons"
              aria-label="Create New Teacher"
            >
              <span className="sidebar-letters">New Teacher</span>
            </button>
          </div>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to="allteachers"
                className={`sidebar-contents ${activeSection === "AllTeachers" ? "active" : ""}`}
                aria-label="All Teachers"
                onClick={() => handleSetActive("AllTeachers")}
              >
                <Users className="icon" size={18} />
                <span className="sidebar-letters">All Teachers</span>
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
            aria-label="Create New Folder"
            onClick={() => {
              setIsFolderModalOpen(true);
              setModalHeading("New Folder");
            }}
          >
            <Plus className="icon" size={18} />
            <span className="sidebar-letters">New Folder</span>
          </button>

          <ul className="test-sidebar-menu tags">
            {folders.map((folder, index) => (
              <li key={index} className="tag-item">
                <Link
                  className="sidebar-contents"
                  aria-label={`Folder: ${folder}`}
                >
                  <Folder
                    className="icon"
                    size={18}
                    style={{
                      color: iconColors[index % iconColors.length],
                    }}
                  />
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="sidebar-letters">{folder}</span>

                    <button className="tag-button">
                      <span className="tag-dropdown-toggle" onClick={() => handleFolderClick(index)}></span>
                    </button>

                    <TagActionsDropdown
                      isOpen={showMoreOptions === index}
                      onEdit={() => {
                        setIsFolderModalOpen(true);
                        setShowMoreOptions(null);
                        setModalHeading("Edit ");
                        setSelectedSection(folders[index]);
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
      <NewTeacherModal
        isOpen={isNewTeacherModalOpen}
        onClose={() => setIsNewTeacherModalOpen(false)}
        onCreate={handleCreateTeacher}
      />

      <AddFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onAddFolder={handleAddFolder}
        heading={modalHeading}
        selectedSection={selectedSection}
      />
    </div>
  );
};

export default TeachersSidebar;