"use client"

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Database,
  Folder,
  Plus,
  FileText,
  Archive,
  Trash2,
  Tag,
  Menu,
  X
} from "lucide-react";
import AddTagsComponent from "../../../ReusableComponents/AddTagsComponent/AddTagsComponent";
import NewQBModal from "../../../ReusableComponents/NewQBModal/NewQBModal";
import AddFolderModal from "../../../ReusableComponents/AddFolderModal/AddFolderModal";
import TagActionsDropdown from "../../../ReusableComponents/TagActionsDropdown/TagActionsDropdown";
import "./Sidebar.css";

const Sidebar = ({ openModal }) => {
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");
    return storedFolders ? JSON.parse(storedFolders) : [];
  });
  const [modalHeading, setModalHeading] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isQbModalOpen, setIsQbModalOpen] = useState(false);
  const [qbs, setQBs] = useState([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("questionBank");
  const [tags, setTags] = useState(["Folder 1", "Folder 2"]);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const iconColors = ['#f44336', '#2196f3', '#ff9800', '#9c27b0'];
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const location = useLocation();

  const handleTagClick = (index) => {
    setShowMoreOptions((prev) => (prev === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !toggleRef.current?.contains(event.target)
    ) {
      setShowMoreOptions(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddFolder = ({ name, color }) => {
    console.log("New Folder Created:", { name, color });
  };

  const handleCreateQB = (qbName) => {
    setQBs([...qbs, qbName]);
  };

  const addNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: `New Folder ${folders.length + 1}`,
    };
    setFolders([...folders, newFolder]);
  };

  const startEditingFolder = (id, name) => {
    setEditingFolderId(id);
    setEditedFolderName(name);
  };

  const saveFolderName = (id) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, name: editedFolderName } : folder
    );
    setFolders(updatedFolders);
    setEditingFolderId(null);
    setEditedFolderName("");
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Container */}
      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Question Bank Navigation">
        <div className="test-sidebar-header">
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={() => setIsQbModalOpen(true)}
              className="allbuttons"
              aria-label="Create New Question Bank"
            >
              <span className="sidebar-letters">New QB</span>
            </button>
          </div>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to="/Questionbank"
                className={`sidebar-contents ${isActive("/Questionbank") ? "active" : ""}`}
                aria-label="All Question Banks"
                onClick={() => handleSetActive("all")}
              >
                <FileText className="icon" size={20} />
                <span className="sidebar-letters">All QB</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Questionbank/archived"
                className={`sidebar-contents ${isActive("/Questionbank/archived") ? "active" : ""}`}
                aria-label="Archived"
                onClick={() => handleSetActive("archived")}
              >
                <Archive className="icon" size={20} />
                <span className="sidebar-letters">Archived</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Questionbank/Trashed"
                className={`sidebar-contents ${isActive("/Questionbank/Trashed") ? "active" : ""}`}
                aria-label="Trashed"
                onClick={() => handleSetActive("trashed")}
              >
                <Trash2 className="icon" size={20} />
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
            <Plus className="icon" size={20} />
            <span className="sidebar-letters">New Folder</span>
          </button>
          <ul className="test-sidebar-menu tags">
            {tags.map((tag, index) => (
              <li key={index} className="tag-item">
                <Link className="sidebar-contents" aria-label={`Tag: ${tag}`}>
                  <Tag
                    className="icon"
                    size={20}
                    color={iconColors[index % iconColors.length]}
                  />
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="sidebar-letters">{tag}</span>

                    <button className="tag-button" ref={toggleRef}>
                      <span
                        className="tag-dropdown-toggle"
                        onClick={() => handleTagClick(index)}
                      ></span>
                    </button>

                    <TagActionsDropdown
                      isOpen={showMoreOptions === index}
                      onEdit={() => {
                        setIsFolderModalOpen(true);
                        setShowMoreOptions(null);
                        setModalHeading("Edit");
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
          <p className="sidebar-contents" style={{ fontStyle: "italic" }}>
            Uncategorized<span className="number">(5)</span>
          </p>
        </div>
        {/* Modals */}
        <NewQBModal
          isOpen={isQbModalOpen}
          onClose={() => setIsQbModalOpen(false)}
          onCreate={handleCreateQB}
        />
        <AddFolderModal
          isOpen={isFolderModalOpen}
          onClose={() => setIsFolderModalOpen(false)}
          onAddFolder={handleAddFolder}
          heading={modalHeading}
          selectedSection={selectedSection}
        />
        <AddTagsComponent
          isOpen={isTagModalOpen}
          onClose={() => setIsTagModalOpen(false)}
        />
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className={`mobile-toggle-btn ${isMobileOpen ? "sidebar-open" : ""}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;