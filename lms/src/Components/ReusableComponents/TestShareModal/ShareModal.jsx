import React, { useState, useRef, useEffect } from "react";
import { FaShare, FaTimes, FaUser } from "react-icons/fa";
import "./ShareModal.css";
import CloseIcon from "@mui/icons-material/Close";
import useBounceModal from "../useBounceModal/useBounceModal"; // Import the custom hook

const ShareModal = ({ isOpen, onClose, testName }) => {
  const { modalRef, isBouncing } = useBounceModal(isOpen); // Corrected line


  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [permission, setPermission] = useState("can-view"); // Default to "Viewer"
  const [isFocused, setIsFocused] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [sharedMembers, setSharedMembers] = useState([
    { email: "teacher@example.com", role: "Owner", status: "Active" },
    { email: "member1@example.com", role: "can-view", status: "Active" }, // Use consistent role values
  ]);
  const [visibleMembersCount, setVisibleMembersCount] = useState(2);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen); // Ensure modal remains visible

  useEffect(() => {
    if (isOpen) {
      setIsZoomOut(false);
      setIsVisible(true); // Keep modal visible after zoom-out
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsZoomOut(true); // Trigger zoom-out animation
  };

  const handleAnimationEnd = () => {
    if (isZoomOut) {
      setIsZoomOut(false); // Reset zoom effect without closing modal
    }
  };

  const handleOverlayClick = () => {
    setIsZoomOut(true); // Trigger zoom-out on outside click
    setTimeout(() => {
      setIsZoomOut(false); // Reset zoom after animation
    }, 300);
  };
  if (!isOpen) return null;
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear the error when input becomes valid or empty
    if (!value || isValidEmail(value.trim())) {
      setEmailError("");
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      processEmailInput(inputValue.trim());
    }
  };

  const handlePaste = (e) => {
    // Get pasted data
    const pastedData = e.clipboardData.getData('text');

    // Process the pasted data immediately
    processBulkEmails(pastedData);

    // Prevent the default paste behavior to avoid duplicate input
    e.preventDefault();

    // Clear the input field after processing paste
    setInputValue("");
  };



// email validation
  const processBulkEmails = (input) => {
    // Split by commas or whitespace (including multiple spaces, tabs, newlines)
    const potentialEmails = input
      .split(/[, \t\n]+/)
      .map(email => email.trim())
      .filter(email => email);

    const invalidEmails = [];
    const validEmails = [];
    const allExistingEmails = [...emails, ...sharedMembers.map(member => member.email)];

    potentialEmails.forEach(email => {
      const cleanEmail = email.replace(/[, ]+$/, ''); // Remove trailing commas/spaces

      if (!isValidEmail(cleanEmail)) {
        invalidEmails.push(cleanEmail);
      } else if (!allExistingEmails.includes(cleanEmail)) {
        validEmails.push(cleanEmail);
      }
    });

    if (invalidEmails.length > 0) {
      setEmailError(`Invalid email(s): ${invalidEmails.join(", ")}`);
    } else if (validEmails.length === 0 && potentialEmails.length > 0) {
      setEmailError("All emails are already added");
    } else {
      setEmailError("");
    }

    if (validEmails.length > 0) {
      setEmails([...new Set([...emails, ...validEmails])]); // Prevent duplicates
    }
  };

  const processEmailInput = (input) => {
    // Check if input contains multiple emails (paste case that wasn't caught)
    if (input.includes(",") || input.includes(" ") || input.includes("\n")) {
      processBulkEmails(input);
    } else {
      // Single email case
      addEmail(input);
    }
  };

  const addEmail = (email) => {
    if (!email) return;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    const allExistingEmails = [...emails, ...sharedMembers.map(member => member.email)];

    if (allExistingEmails.includes(email)) {
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
      role: permission, // Use the selected permission
      status: "Active",
    }));

    setSharedMembers([...sharedMembers, ...newMembers]);
    setEmails([]);
    setPermission("can-view"); // Reset to default after invite
  };

  const handlePermissionChange = (e) => {
    setPermission(e.target.value);
    if (e.target.value) {
      setPermissionError("");
    }
  };

  const handleLoadMore = () => {
    setVisibleMembersCount((prevCount) => prevCount + 5);
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

  return (
    <div className="testshare-modal-overlay" onClick={handleOverlayClick}>
      <div ref={modalRef}
        className={`testshare-modal-content testshare-modal-content2 ${isBouncing ? "bounce" : ""}`}>

        <div className="testshare-modal-header">
          <h5>Share{testName} </h5>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="testshare-modal-body">
          <div className="invite-section">
            <div className={`tags-container  ${isFocused ? "focused" : ""}`} onClick={handleInputFocus}>
              {emails.map((email, index) => (
                <span key={index} className="email-tag">
                  {email}
                  <button className="remove-tag" onClick={() => removeEmail(email)}>
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onPaste={handlePaste}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Email Address separated by comma & space"
                className=""
              />
            </div>
            {emailError && <p className="error-message-email">{emailError}</p>}
          </div>

          <div className="email-invite-action-buttons">
            <div className="permission-dropdown">
              <select
                value={permission}
                onChange={handlePermissionChange}
                className={permissionError ? "error-border testshare-form-control" : ""}
              >
                <option value="can-view">Viewer</option>
                <option value="can-edit">Editor</option>
              </select>
            </div>
            <div className="invite-button-div">
              <button className="newtest-modal-button create" onClick={handleInvite}>
                Invite
              </button>
            </div>
          </div>
          <div className="collaborator">
            <h3 className="sub-title">
              Collaborated{" "}
              <span className="total-members p-2">
                ({sharedMembers.filter((member) => member.role !== "Owner").length})
              </span>
            </h3>
            <div className="members-container">
              {/* Display the owner first */}
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

              {/* Display other members below */}
              {sharedMembers
                .filter((member) => member.role !== "Owner")
                .slice(0, visibleMembersCount)
                .map((member, index) => (
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
                        className="status-dropdown "
                      >
                        <option value="can-view">Viewer</option>
                        <option value="can-edit">Editor</option>
                        <option value="Remove">Remove</option>
                      </select>
                    </div>
                  </div>
                ))}

              {visibleMembersCount < sharedMembers.length && (
                <div className="d-flex justify-content-center">
                  <button
                    className="load-more-button mt-2"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Modal Footer */}
          <div className="testshare-modal-footer">
            <button className="btn" onClick={onClose}>
              Close
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ShareModal;