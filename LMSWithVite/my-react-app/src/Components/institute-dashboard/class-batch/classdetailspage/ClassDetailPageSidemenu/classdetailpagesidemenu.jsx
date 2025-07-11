"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  Archive,
  Trash2,
  Menu,
  X,
  Tag,
  Share2
} from "lucide-react";
import AddStudentModal from '../../../../ReusableComponents/AddStudentModal/AddStudentModal';
import AddTagModal from '../../../../ReusableComponents/AddTagModal/AddTagModal';
import TagActionsDropdown from '../../../../ReusableComponents/TagActionsDropdown/TagActionsDropdown';


const ClassDetailPageSideMenu = ({
  archivedCount,
  trashedCount
}) => {
  const location = useLocation();
  const { id } = useParams();
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("allStudents");
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [tags, setTags] = useState(["Top Students", "Needs Attention"]);
  const [modalHeading, setModalHeading] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // Icon colors for tags
  const iconColors = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0'];

  // Mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleTagClick = (index) => {
    setShowMoreOptions(showMoreOptions === index ? null : index);
  };

  const handleAddTag = ({ name, color }) => {
    setTags([...tags, name]);
    setIsNewTagModalOpen(false);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar Container */}
      <nav
        className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`}
        aria-label="Class Navigation"
      >
        <div className="test-sidebar-header">
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="allbuttons"
              aria-label="Add New Student"
            >
              {/* <Plus size={18} className="icon" /> */}
              <span className="sidebar-letters">New Student</span>
            </button>
          </div>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to={`/class/${id}/classdetailpage`}
                className={`sidebar-contents ${activeSection === "allStudents" ? "active" : ""}`}
                onClick={() => handleSetActive("allStudents")}
              >
                <Users size={18} className="icon" />
                <span className="sidebar-letters">All Students</span>
              </Link>
            </li>

            <li>
              <Link
                to={`/class/${id}/classdetailpage/activeStudents`}
                className={`sidebar-contents ${activeSection === "activeStudents" ? "active" : ""}`}
                onClick={() => handleSetActive("activeStudents")}
              >
                <CheckCircle2 size={18} className="icon" />
                <span className="sidebar-letters">Active Students</span>
              </Link>
            </li>

            <li>
              <Link
                to={`/class/${id}/classdetailpage/inactiveStudents`}
                className={`sidebar-contents ${activeSection === "inactiveStudents" ? "active" : ""}`}
                onClick={() => handleSetActive("inactiveStudents")}
              >
                <XCircle size={18} className="icon" />
                <span className="sidebar-letters">Inactive Students</span>
              </Link>
            </li>

           
          </ul>
        </div>

       

     

        <hr />

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to={`/class/${id}/classdetailpage/archive`}
                className={`sidebar-contents ${isActive("archive") ? "active" : ""}`}
                onClick={() => handleSetActive("archive")}
              >
                <Archive size={18} className="icon" />
                <span className="sidebar-letters">Archived</span>
                {archivedCount > 0 && (
                  <span className="count-badge">{archivedCount}</span>
                )}
              </Link>
            </li>

            <li>
              <Link
                to={`/class/${id}/classdetailpage/trash`}
                className={`sidebar-contents ${isActive("trash") ? "active" : ""}`}
                onClick={() => handleSetActive("trash")}
              >
                <Trash2 size={18} className="icon" />
                <span className="sidebar-letters">Trashed</span>
                {trashedCount > 0 && (
                  <span className="count-badge">{trashedCount}</span>
                )}
              </Link>
            </li>
          </ul>
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
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onSave={(student) => {
          // Handle student save logic here
          setIsAddStudentModalOpen(false);
        }}
      />

      <AddTagModal
        isOpen={isNewTagModalOpen}
        onClose={() => setIsNewTagModalOpen(false)}
        onAddFolder={handleAddTag}
        heading={modalHeading}
        selectedSection={selectedSection}
      />
    </div>
  );
};

export default ClassDetailPageSideMenu;