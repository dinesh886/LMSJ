import React, { useState ,useRef,useEffect} from "react";
import { FaShare, FaTimes, FaUser } from "react-icons/fa";
import "./ShareModal.css";
import CloseIcon from "@mui/icons-material/Close";

const ShareModal = ({ isOpen, onClose, testName }) => {
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
      addEmail(inputValue.trim());
    }
  };

  const addEmail = (email) => {
    if (!email) return;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    // Check if email is already in the list (including sharedMembers)
    const allEmails = [...emails, ...sharedMembers.map(member => member.email)];

    if (allEmails.includes(email)) {
        setEmailError("This email is already added.");
        return;
    }

    setEmails([...emails, email]);
    setInputValue(""); // Clear input field after adding email
    setEmailError(""); // Clear error after adding a valid email
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
    <div className="newtest-modal-overlay" onClick={handleOverlayClick}>
      <div className={`share-modal ${isZoomOut ? "zoom-out" : "zoom-in"}`}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}>
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
            {/* <label className="pb-1">Add People</label> */}
            <div className={`email-tags ${isFocused ? "focused" : ""}`}>
              {emails.map((email, index) => (
                <span key={index} className="email-tag">
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
                        className="status-dropdown"
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