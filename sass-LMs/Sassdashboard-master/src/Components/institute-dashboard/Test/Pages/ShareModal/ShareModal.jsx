import React, { useState, useEffect } from "react";
import { FaShare, FaUser } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import "./ShareModal.css";
import PaginationButtons from "../../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../../ReusableComponents/Pagination/PaginationInfo";

const ShareModal = ({ isOpen, onClose, testName }) => {
  // State for emails and sharing
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [permission, setPermission] = useState("can-view");
  const [isFocused, setIsFocused] = useState(false);
  const [permissionError, setPermissionError] = useState("");

  // State for shared members and pagination
  const [sharedMembers, setSharedMembers] = useState([
    { email: "teacher@example.com", role: "Owner", status: "Active" },
    { email: "member1@example.com", role: "can-view", status: "Active" },
    { email: "member2@example.com", role: "can-edit", status: "Active" },
    { email: "member3@example.com", role: "can-view", status: "Active" },
    { email: "member4@example.com", role: "can-edit", status: "Active" },
    { email: "member5@example.com", role: "can-view", status: "Active" },
    { email: "member6@example.com", role: "can-edit", status: "Active" },
    { email: "member7@example.com", role: "can-view", status: "Active" },
    { email: "member8@example.com", role: "can-edit", status: "Active" },
    { email: "member9@example.com", role: "can-view", status: "Active" },
    { email: "member10@example.com", role: "can-edit", status: "Active" },
  ]);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Animation state
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);

  // Filter out owner for pagination count
  const filteredMembers = sharedMembers.filter(member => member.role !== "Owner");
  const filteredCount = filteredMembers.length;

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredMembers;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(startIndex, startIndex + rowsPerPage);
  };

  // Check if we should show pagination buttons
  const showPaginationButtons = !fullViewMode && rowsPerPage < filteredCount;

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(Math.min(newRows, filteredCount));
  };

  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredCount);
    } else {
      setRowsPerPage(5);
    }
    setFullViewMode(!fullViewMode);
  };

  useEffect(() => {
    if (isOpen) {
      setIsZoomOut(false);
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsZoomOut(true);
  };

  const handleAnimationEnd = () => {
    if (isZoomOut) {
      setIsZoomOut(false);
    }
  };

  const handleOverlayClick = () => {
    setIsZoomOut(true);
    setTimeout(() => {
      setIsZoomOut(false);
    }, 300);
  };

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value || isValidEmail(value.trim())) {
      setEmailError("");
    }
  };

  const handleInputKeyDown = (e) => {
    const trimmedValue = inputValue.trim();

    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      if (trimmedValue !== "") {
        addEmail(trimmedValue);
      }
    } else if (e.key === "Backspace" && trimmedValue === "" && emails.length > 0) {
      e.preventDefault();
      removeEmail(emails[emails.length - 1]);
    }
  };
  
  
  const addEmail = (email) => {
    if (!email) return;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    const allEmails = [...emails, ...sharedMembers.map(member => member.email)];
    if (allEmails.includes(email)) {
      setEmailError("This email is already added.");
      return;
    }

    setEmails([...emails, email]);
    setInputValue("");
    setEmailError("");
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleInvite = () => {
    let hasError = false;

    if (!permission) {
      setPermissionError("Please select an action");
      hasError = true;
    }

    if (emails.length === 0) {
      setEmailError("Please add at least one valid email");
      hasError = true;
    }

    if (hasError) return;

    const newMembers = emails.map((email) => ({
      email,
      role: permission,
      status: "Active",
    }));

    setSharedMembers([...sharedMembers, ...newMembers]);
    setEmails([]);
    setPermission("can-view");
    setCurrentPage(1); // Reset to first page after adding new members
  };

  const handlePermissionChange = (e) => {
    setPermission(e.target.value);
    if (e.target.value) {
      setPermissionError("");
    }
  };

  const updateMemberStatus = (email, newStatus) => {
    if (newStatus === "Remove") {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this member?"
      );
      if (confirmRemove) {
        setSharedMembers(
          sharedMembers.filter((member) => member.email !== email)
        );
      }
    } else {
      const updatedMembers = sharedMembers.map((member) =>
        member.email === email ? { ...member, role: newStatus } : member
      );
      setSharedMembers(updatedMembers);
    }
  };

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => setIsFocused(false);

  if (!isOpen) return null;

  return (
    <div className="newtest-modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`share-modal ${isZoomOut ? "zoom-out" : "zoom-in"}`}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="all-modal-headings">
          <FaShare className="modal-icon" />
          Share <span className="test-name ps-1">{testName}</span>
          <CloseIcon
            className="close-icon"
            onClick={onClose}
            sx={{ color: "#037de2" }}
          />
        </h2>
        <div className="share-modal-content">
          <div className="invite-section">
            <div className={`email-tags ${isFocused ? "focused" : ""}`}>
              {emails.map((email, index) => (
                <span
                  key={index}
                  className={`email-tag ${index === emails.length - 1 && inputValue === ""
                      ? "highlighted"
                      : ""
                    }`}
                >
                  {email}
                  <button onClick={() => removeEmail(email)}>&times;</button>
                </span>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Email Address separated by comma & space"
                className="email-input"
              />
            </div>
            {emailError && <p className="error-message-email">{emailError}</p>}
          </div>
          <div className="email-invite-action-buttons">
            <div className="permission-dropdown">
              <select
                value={permission}
                onChange={handlePermissionChange}
                className={permissionError ? "error-border" : ""}
              >
                <option value="can-view">Viewer</option>
                <option value="can-edit">Editor</option>
              </select>
            </div>
            <div className="invite-button-div">
              <button
                className="newtest-modal-button create"
                onClick={handleInvite}
              >
                Invite
              </button>
            </div>
          </div>
          <div className="collaborator">
            <h3 className="sub-title">
              Collaborated{" "}
              <span className="total-members p-2">
                ({filteredCount})
              </span>
            </h3>
            <div className="members-container">
              {/* Display the owner first (not paginated) */}
              {sharedMembers
                .filter((member) => member.role === "Owner")
                .map((owner, index) => (
                  <div className="member-item" key={index}>
                    <div className="member-left">
                      <FaUser className="user-icon" />
                      <span className="member-email">{owner.email}</span>
                    </div>
                    <div className="member-right">
                      <span className="role-badge">Owner</span>
                    </div>
                  </div>
                ))}

              {/* Display paginated members */}
              {getCurrentPageData().map((member, index) => (
                <div className="member-item" key={index}>
                  <div className="member-left">
                    <FaUser className="user-icon" />
                    <span className="member-email">{member.email}</span>
                  </div>
                  <div className="member-right">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        updateMemberStatus(member.email, e.target.value)
                      }
                      className="status-dropdown"
                    >
                      <option value="can-view">Viewer</option>
                      <option value="can-edit">Editor</option>
                      <option value="Remove">Remove</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {showPaginationButtons && (
              <PaginationButtons
                filteredQuestions={filteredMembers}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                loadMore={loadMore}
                fullView={toggleFullView}
                fullViewMode={fullViewMode}
              />
            )}

            <PaginationInfo
              filteredQuestions={filteredMembers}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              label="Members"
              totalItems={filteredCount}
              isSearching={false}
            />
          </div>
          <div className="share-close-button">
            <button onClick={onClose} className="load-more-button cancel">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;