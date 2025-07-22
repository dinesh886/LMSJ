import React, { useState, useRef, useEffect } from "react";
import { Trash2, Archive, Download, Check } from "lucide-react";
import { BiSolidTag } from "react-icons/bi";
import "./BulkAction.css";
import AddTagModal from "../../ReusableComponents/AddTagModal/AddTagModal";
import PropTypes from 'prop-types';
import NewTestModal from "../../ReusableComponents/NewTestModal/NewTestModal";
import { toast } from "react-toastify";

const BulkActions = ({
  selectedRows = [],
  availableActions = [],
  tags = [],
  onAddQuestionsToTag = () => toast.warn("Add to tag functionality not implemented"),
  onAddTag = () => toast.warn("Add tag functionality not implemented"),
  allQuestions = [],
  onCopyTest = () => toast.warn("Copy test functionality not implemented"),
  onUpdateTest = () => toast.warn("Update test functionality not implemented"),
  onDelete = () => toast.warn("Delete functionality not implemented"),
  onArchive = () => toast.warn("Archive functionality not implemented"),
  onDownload = () => toast.warn("Download functionality not implemented"),
  isRenameModalOpen,
  setIsRenameModalOpen,
  setEditingTest
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [previousName, setPreviousName] = useState('');
  const [recentlyTagged, setRecentlyTagged] = useState({});
  
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

  const handleAddToTag = (tagName) => {
    try {
      const tag = tags.find(t => t.name === tagName);
      if (!tag) {
        toast.error("Tag not found");
        return;
      }

      const newQuestions = selectedRows.filter(id => !tag.questions.includes(id));

      setRecentlyTagged(prev => ({
        ...prev,
        [tagName]: Date.now()
      }));

      setTimeout(() => {
        setRecentlyTagged(prev => {
          const newState = { ...prev };
          delete newState[tagName];
          return newState;
        });
      }, 2000);

      if (newQuestions.length > 0) {
        onAddQuestionsToTag(tagName, newQuestions);
      } else {
        toast.info("All selected questions already exist in this tag");
      }

      setActiveDropdown(null);
    } catch (error) {
      toast.error("Failed to add questions to tag");
      console.error("Error in handleAddToTag:", error);
    }
  };

  const renderActionButton = (action, index, isLastVisible) => {
    const baseClass = `tube-action-button ${isLastVisible ? "last-visible" : ""}`;

    const handleActionClick = (e) => {
      e.stopPropagation();
      switch (action) {
        case "delete":
          onDelete(selectedRows);
          break;
        case "archive":
          onArchive(selectedRows);
          break;
        case "download":
          onDownload(selectedRows);
          break;
        case "tag":
          toggleDropdown("tag");
          break;
        case "more":
          if (selectedRows.length === 1) toggleDropdown("more");
          break;
        default:
          break;
      }
    };

    switch (action) {
      case "delete":
        return (
          <button
            className={baseClass}
            data-tooltip="Delete"
            onClick={handleActionClick}
          >
            <Trash2 size={18} />
          </button>
        );
      case "archive":
        return (
          <button
            className={baseClass}
            data-tooltip="Archive"
            onClick={handleActionClick}
          >
            <Archive size={18} />
          </button>
        );
      case "download":
        return (
          <button
            className={baseClass}
            data-tooltip="Download"
            onClick={handleActionClick}
          >
            <Download size={18} />
          </button>
        );
      case "tag":
        return (
          <button
            className={`${baseClass} dropdown-toggle2 ${activeDropdown === "tag" ? "active" : ""}`}
            onClick={handleActionClick}
          >
            <BiSolidTag size={18} className="tag-flipped" />
          </button>
        );
      case "more":
        if (selectedRows.length === 1) {
          return (
            <button
              className={`${baseClass} dropdown-toggle2 moreoption ${activeDropdown === "more" ? "active" : ""}`}
              onClick={handleActionClick}
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

        {/* Tag Dropdown */}
        {activeDropdown === "tag" && (
          <div className="tag-options">
            <p className="addtotag-box-heading">Add to tag</p>
            <ul className="tag-options-list">
              {tags.map((tag) => {
                const alreadyTaggedCount = selectedRows.filter(id =>
                  tag.questions.includes(id)
                ).length;
                const isRecentlyTagged = recentlyTagged[tag.name] &&
                  (Date.now() - recentlyTagged[tag.name] < 2000);
                const willAddNewQuestions = selectedRows.some(id => !tag.questions.includes(id));

                return (
                  <li
                    key={tag.id}
                    className={`tag-options-item ${alreadyTaggedCount === selectedRows.length ? 'all-tagged' : ''}`}
                    onClick={() => handleAddToTag(tag.name)}
                  >
                    <div className="tag-container">
                      <span className="tick-mark">
                        {alreadyTaggedCount === selectedRows.length ? '✓' : ''}
                      </span>
                      <span className="dot-name-wrapper">
                        <span
                          className="tag-dot"
                          style={{ backgroundColor: tag.color || "#000" }}
                        ></span>
                        <span className="tag-name">{tag.name}</span>
                      </span>
                      {isRecentlyTagged && (
                        <span className="tag-checkmark">
                          <Check size={16} />
                          {willAddNewQuestions ? (
                            <span className="tooltip">Added to tag</span>
                          ) : (
                            <span className="tooltip">Already in tag</span>
                          )}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
              <button
                className="tags-create-button"
                onClick={() => setIsNewTagModalOpen(true)}
              >
                Create New tag
              </button>
            </div>
          </div>
        )}

        {/* More Options Dropdown */}
        {activeDropdown === "more" && (
          <div className="more-options">
            <ul>
              <li
                className="more-options-item"
                onClick={() => {
                  try {
                    if (selectedRows.length === 1) {
                      const test = allQuestions.find(q => q.id === selectedRows[0]);
                      if (test) {
                        setEditingTest({
                          id: test.id,
                          name: test.test,
                          duration: test.duration,
                          description: test.description,
                          instructions: test.instructions
                        });
                        setIsRenameModalOpen(true);
                      } else {
                        toast.error("Test not found");
                      }
                    }
                  } catch (error) {
                    toast.error("Failed to prepare rename");
                    console.error("Rename preparation error:", error);
                  }
                  setActiveDropdown(null);
                }}
              >
                Rename
              </li>
              <li
                className="more-options-item"
                onClick={() => {
                  try {
                    if (selectedRows.length === 1) {
                      onCopyTest(selectedRows[0]);
                    }
                  } catch (error) {
                    toast.error("Failed to copy test");
                    console.error("Copy test error:", error);
                  }
                  setActiveDropdown(null);
                }}
              >
                Make a Copy
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTagModal
        isOpen={isNewTagModalOpen}
        onClose={() => setIsNewTagModalOpen(false)}
        onAddFolder={onAddTag}
        heading="Create New Tag"
      />

      {isRenameModalOpen && (
        <NewTestModal
          isOpen={isRenameModalOpen}
          onClose={() => setIsRenameModalOpen(false)}
          initialName={previousName}
          onSubmit={(updatedFields) => {
            try {
              const questionId = selectedRows[0];
              onUpdateTest(questionId, updatedFields);
            } catch (error) {
              toast.error("Failed to update test");
              console.error("Update test error:", error);
            }
            setIsRenameModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

BulkActions.propTypes = {
  selectedRows: PropTypes.array.isRequired,
  availableActions: PropTypes.array.isRequired,
  tags: PropTypes.array,
  allQuestions: PropTypes.array,
  onAddQuestionsToTag: PropTypes.func,
  onAddTag: PropTypes.func,
  onCopyTest: PropTypes.func,
  onUpdateTest: PropTypes.func,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
  onDownload: PropTypes.func,
  isRenameModalOpen: PropTypes.bool,
  setIsRenameModalOpen: PropTypes.func,
  setEditingTest: PropTypes.func
};

BulkActions.defaultProps = {
  tags: [],
  allQuestions: [],
  onAddQuestionsToTag: () => { },
  onAddTag: () => { },
  onCopyTest: () => { },
  onUpdateTest: () => { },
  onDelete: () => { },
  onArchive: () => { },
  onDownload: () => { }
};

export default BulkActions;