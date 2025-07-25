"use client";

import React, { useState, useEffect } from "react";
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

const TestSidebar = ({
  tags = [],
  uncategorizedCount,
  onTagClick,
  onUncategorizedClick,
  activeTag,
  onAddTag,
  setTags,
  onCreateTest
}) => {
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Alltest");
  const [modalHeading, setModalHeading] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileOpen(false);
  };

  const handleSetActiveTag = (tag) => {
    setActiveTag(tag);
    setIsMobileOpen(false);
  };

  const handleTagClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMoreOptions(showMoreOptions === index ? null : index);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleAddTag = ({ name, color }) => {
    if (editingTag) {
      setTags(tags.map(tag =>
        tag.id === editingTag.id ? { ...tag, name, color } : tag
      ));
      setEditingTag(null);
    } else {
      setTags([...tags, {
        name,
        color,
        id: Date.now().toString(),
        questions: []
      }]);
    }
    setIsNewTagModalOpen(false);
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setModalHeading("Edit Tag");
    setIsNewTagModalOpen(true);
  };

  const handleRemoveTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    setShowMoreOptions(null);
    if (activeTag === tags.find(t => t.id === tagId)?.name) {
      onTagClick(null);
    }
  };

  return (
    <div className="sidebar-wrapper">
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

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
                to="/test/Alltest"
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
                to="/test/shared-with-me"
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
                to="/test/dispatched"
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
                to="/test/archived"
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
                to="/test/trashed"
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
              setModalHeading("Create New Tag");
              setEditingTag(null);
            }}
          >
            <Plus className="icon" size={18} />
            <span className="sidebar-letters">New Tag</span>
          </button>

          <ul className="test-sidebar-menu tags">
            {tags.map((tag, index) => (
              <li key={tag.id} className="tag-item">
                <Link
                  className={`sidebar-contents ${activeTag === tag.name ? "active" : ""}`}
                  onClick={() => onTagClick(tag.name)}
                >
                  <Tag className="icon" size={18} style={{ color: tag.color }} />
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="sidebar-letters tag-letters-container">
                      <span className="tag-name-wrapper">
                        <span className="tag-name-text">
                          {tag.name}
                        </span>
                      </span>
                      <span className="tag-count">
                        ({tag.questions.length})
                      </span>
                    </span>
                    <button
                      className="tag-button"
                      type="button"
                      onClick={(e) => handleTagClick(e, index)}
                    >
                      <span className="tag-dropdown-toggle"> </span>
                    </button>

                    <TagActionsDropdown
                      isOpen={showMoreOptions === index}
                      onEdit={() => handleEditTag(tag)}
                      onRemove={() => handleRemoveTag(tag.id)}
                      onClose={() => setShowMoreOptions(null)}
                      tagId={tag.id}
                      tagName={tag.name}
                      tagColor={tag.color}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p
            className={`sidebar-contents ${activeTag === "uncategorized" ? "active" : ""}`}
            style={{ fontStyle: "italic" }}
            onClick={onUncategorizedClick}
          >
            Uncategorized<span className="number">({uncategorizedCount})</span>
          </p>
        </div>
      </nav>

      {/* Modals */}
      <AddTagModal
        isOpen={isNewTagModalOpen}
        onClose={() => {
          setIsNewTagModalOpen(false);
          setEditingTag(null);
        }}
        onAddFolder={handleAddTag}
        heading={modalHeading}
        selectedSection={editingTag}
      />

      <NewTestModal
        isOpen={isNewTestModalOpen}
        onClose={() => setIsNewTestModalOpen(false)}
        onSubmit={(testData) => {
          onCreateTest(testData);
          setIsNewTestModalOpen(false);
        }}
        mode="create"
      />
    </div>
  );
};

export default TestSidebar;