"use client"

import React, { useState, useEffect, useRef } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {
  Trash2,
  Folder,
  Tag,
  Plus,
  List,
  ListOrdered,
  Calculator,
  CheckSquare,
  Text,
  X,
  Menu,
  ChevronDown,
  ChevronUp,
  FileText,
  Check,
  X as XIcon,
  FolderOpen,
  BookOpen,
  FileQuestion,
  ListChecks
} from "lucide-react"
import AddTagsComponent from "../../../../ReusableComponents/AddTagsComponent/AddTagsComponent"
import MCQModal from '../../../../ReusableComponents/Questions-Types-Modals/MCQModal/MCQModal'
import NumericalModal from '../../../../ReusableComponents/Questions-Types-Modals/NumericalModal/NumericalModal'
import TrueFalseModal from '../../../../ReusableComponents/Questions-Types-Modals/TrueFalseModal/TrueFalseModal'
import DescriptiveModal from '../../../../ReusableComponents/Questions-Types-Modals/DescriptiveModal/DescriptiveModal'
import AddFolderModal from "../../../../ReusableComponents/AddFolderModal/AddFolderModal"
import TagActionsDropdown from "../../../../ReusableComponents/TagActionsDropdown/TagActionsDropdown"
import ListOfQuestionsType from '../../../../ReusableComponents/ListOfQuestionsType/ListOfQuestionsType'
import "./AddQuestionSidebar.css"

const AddQuestionSidebar = () => {
  const { id } = useParams()
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders")
    return storedFolders ? JSON.parse(storedFolders) : []
  })
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNumericalModalOpen, setIsNumericalModalOpen] = useState(false)
  const [isTrueFalseModalOpen, setIsTrueFalseModalOpen] = useState(false)
  const [isDescriptiveModalOpen, setIsDescriptiveModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const [testName, setTestName] = useState("")
  const [editingFolderId, setEditingFolderId] = useState(null)
  const [editedFolderName, setEditedFolderName] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("questionBank")
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const iconColors = ['#f44336', '#2196f3', '#ff9800', '#9c27b0']
  const [tags, setTags] = useState(["Folder 1 (10)", "Folder 2 (20)"])
  const [isManageHomeVisible, setManageHomeVisible] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const handleTagClick = (index) => {
    setShowMoreOptions(showMoreOptions === index ? null : index)
  }

  const handleAddFolder = ({ name, color }) => {
    console.log("New Folder Created:", { name, color })
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTestName("")
  }

  const handleCreateTest = () => {
    if (testName.trim() !== "") {
      console.log("New Test Created:", testName)
    }
    handleCloseModal()
  }

  const typeCounts = {
    "SAQ-1": 10,
    "MAQ-2": 5,
    "Numerical": 3,
    "True/False": 7,
    "Descriptive": 2,
  }

  const location = useLocation()
  const [activeTag, setActiveTag] = useState("")

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders))
  }, [folders])

  const addNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: `New Folder ${folders.length + 1}`,
    }
    setFolders([...folders, newFolder])
  }

  const startEditingFolder = (id, name) => {
    setEditingFolderId(id)
    setEditedFolderName(name)
  }

  const saveFolderName = (id) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, name: editedFolderName } : folder
    )
    setFolders(updatedFolders)
    setEditingFolderId(null)
    setEditedFolderName("")
  }

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id))
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const isActive = (path) => location.pathname === path
  const toggleManageHomeVisibility = () => {
    setManageHomeVisible(!isManageHomeVisible)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleSetActive = (section) => {
    setActiveSection(section)
    // Close mobile sidebar when a link is clicked
    setIsMobileOpen(false)
  }
  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}
      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Main Navigation">
        <div className="test-sidebar-header">
          <div className="w-100 d-flex justify-content-center">
            <div className="dropdown-container" ref={dropdownRef}>
              <button
                className="allbuttons"
                aria-label="Create New Question"
                onClick={toggleDropdown}
              >
                <span className="sidebar-letters">New Question</span>
              </button>

              {isDropdownOpen && (
                <div>
                  <ListOfQuestionsType onClose={() => setIsDropdownOpen(false)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li className="sidebar-section-title">Questions</li>

            <li>
              <Link
                to={`/QuestionBank/Trashed/${id}/add`}
                className={`sidebar-contents ${isActive(`/QuestionBank/Trashed/${id}/add`) ? "active" : ""}`}
              >
                <Trash2 className="icon" size={20} />
                <span className="sidebar-letters">Trashed</span>
              </Link>
            </li>
            </ul>
            </div>
            <hr></hr>
        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li className="sidebar-section-title">Question Types</li>

            <li>
              <Link
                to="#"
                className={`sidebar-contents ${isActive("") ? "active" : ""}`}
              >
                <ListChecks className="icon" size={20} />
                <span className="sidebar-letters">SAQ-1 (10)</span>
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className={`sidebar-contents ${isActive("") ? "active" : ""}`}
              >
                <ListChecks className="icon" size={20} />
                <span className="sidebar-letters">MAQ-2 (10)</span>
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className={`sidebar-contents ${isActive("") ? "active" : ""}`}
              >
                <Calculator className="icon" size={20} />
                <span className="sidebar-letters">Numerical (10)</span>
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className={`sidebar-contents ${isActive("") ? "active" : ""}`}
              >
                <CheckSquare className="icon" size={20} />
                <span className="sidebar-letters">True/False (10)</span>
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className={`sidebar-contents ${isActive("") ? "active" : ""}`}
              >
                <FileText className="icon" size={20} />
                <span className="sidebar-letters">Descriptive (10)</span>
              </Link>
            </li>

          
          </ul>
        </div>
<hr></hr>
        <div className="test-sidebar-section">
        <li className="sidebar-section-title">Categories</li>
<ul>
        <li>
          <button
            className="sidebar-contents newtag"
            aria-label="Create New Category"
            onClick={() => setIsFolderModalOpen(true)}
          >
            <Plus className="icon" size={20} />
            <span className="sidebar-letters">New Category</span>
          </button>
        </li>
        </ul>
        <ul className="test-sidebar-menu tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag-item">
              <Link
                className="sidebar-contents"
                aria-label={`Tag: ${tag}`}
              >
                <Tag
                  className="icon"
                  size={20}
                  style={{ color: iconColors[index % iconColors.length] }}
                />
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <span className="sidebar-letters">{tag}</span>
                  <button className="tag-button">
                    <span
                      className="tag-dropdown-toggle"
                      onClick={() => handleTagClick(index)}
                    ></span>
                  </button>
                  <TagActionsDropdown
                    isOpen={showMoreOptions === index}
                    onEdit={() => {
                      setIsFolderModalOpen(true)
                      setShowMoreOptions(null)
                    }}
                    onRemove={() => setShowMoreOptions(null)}
                    onClose={() => setShowMoreOptions(null)}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
<ul>
        <li>
          <Link
            to="#"
            className="sidebar-contents"
          >
            {/* <FolderOpen className="icon" size={20} /> */}
            <span className="sidebar-letters">
              Uncategorized <span className="number">(5)</span>
            </span>
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
      <MCQModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <NumericalModal open={isNumericalModalOpen} onClose={() => setIsNumericalModalOpen(false)} />
      <TrueFalseModal open={isTrueFalseModalOpen} onClose={() => setIsTrueFalseModalOpen(false)} />
      <DescriptiveModal
        open={isDescriptiveModalOpen}
        onClose={() => setIsDescriptiveModalOpen(false)}
      />
      <AddFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onAddFolder={handleAddFolder}
      />
      <AddTagsComponent
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
      />
    </div>
  )
}

export default AddQuestionSidebar