import React, { useState, useRef, useEffect } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCog, faChevronUp, faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineWarning, AiOutlineExclamationCircle } from 'react-icons/ai';
import { RiListSettingsLine } from "react-icons/ri";
import './PublishModal.css'
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import { faSliders } from "@fortawesome/free-solid-svg-icons"; // Import correct icon
import CustomDateTimePicker from '../../ReusableComponents/StaticDateTimePickerLandscape/StaticDateTimePickerLandscape'
import useBounceModal from "../../ReusableComponents/useBounceModal/useBounceModal"; // Import the custom hook
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { DatePicker } from "antd";


const PublishModal = ({ isOpen, onClose, selectedTest, scheduledTests = [], availableHours, requiredHours, }) => {
   

    const { modalRef, isBouncing } = useBounceModal(isOpen); 
  const [isFocused, setIsFocused] = useState(false);
    const [isScheduled, setIsScheduled] = useState(true);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [dateTime, setDateTime] = useState(null);
    const [emailTags, setEmailTags] = useState([]);
    const [currentEmail, setCurrentEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailThroughEmail, setEmailThroughEmail] = useState(false);
    const [enrollOption, setEnrollOption] = useState("email");

    const [warningPopupOpen, setWarningPopupOpen] = useState(false);

    const [showSettings, setShowSettings] = useState(false);
    const [attemptLimit, setAttemptLimit] = useState("");

    const [isCustom, setIsCustom] = useState(false);
    const [customDuration, setCustomDuration] = useState("");
    const [entryType, setEntryType] = useState("sharp-time");
    const [timeAfterScheduled, setTimeAfterScheduled] = useState("");
    const [publishResult, setPublishResult] = useState("immediate");
    const [resultDelay, setResultDelay] = useState("");
    const [rankCalculation, setRankCalculation] = useState("");


    const availableClasses = ["Class 1", "Class 2", "Class 3", "Class 4"];
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isChecking, setIsChecking] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState("");

    const [availability, setAvailability] = useState(null);

    const [examName, setExamName] = useState("Sample Exam");
    const [participations, setParticipations] = useState(50); // Number of participants
    const [examDuration, setExamDuration] = useState(20); // Exam duration in minutes
    const [hoursAvailable, setHoursAvailable] = useState(8); // Available hours
    const [duration, setDuration] = useState("15"); // Default value is 15 mins
    const [isUnscheduled, setIsUnscheduled] = useState(false);
    const [isDateTimeValid, setIsDateTimeValid] = useState(false);
    const [enrollmentDeadline, setEnrollmentDeadline] = useState(null);
    const [errors, setErrors] = useState({
        enrollmentDeadline: "",
        // ... your other error states
    });

    // Add this to your existing validateFields function
    const validateFields = () => {
        const newErrors = {
            enrollmentDeadline: "",
            // ... your other error states
        };
        let isValid = true;

        // Validate enrollment deadline
        if (!enrollmentDeadline) {
            newErrors.enrollmentDeadline = "Enrollment deadline is required";
            isValid = false;
        } else if (dayjs(enrollmentDeadline).isBefore(dayjs(), 'minute')) {
            newErrors.enrollmentDeadline = "Deadline must be in the future";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    // Convert duration from minutes to hours
    const examDurationHours = examDuration / 60;

    // Total hours required for all participants
    const totalHoursRequired = participations * examDurationHours;

    // Calculate remaining hours after publishing (ensuring it never shows negative)
    const hoursAfterPublishing = Math.max(hoursAvailable - totalHoursRequired, 0);

    // Check if time is sufficient
    const isTimeSufficient = hoursAvailable >= totalHoursRequired;
    const handleAdjustExamSettings = () => {
        console.log("AdjustExamSettings");

    };
    const inputRef = useRef(null);
    const containerRef = useRef(null);


    const clearAllTags = () => {
        setSelectedClasses([]);
    };

    const handlePurchaseHours = () => {
        console.log("PurchaseHours");

    };
    const handleUnscheduled = () => {
        setIsUnscheduled(true);
        setShowSettings(false); // Hide settings when unscheduled is selected
    };

    const handleBackspace = (e) => {
        if (e.key === "Backspace" && selectedClasses.length > 0 && inputRef.current.value === "") {
            const lastTag = selectedClasses[selectedClasses.length - 1];
            removeClass(lastTag);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // useEffect(() => {
    //   setHoursAfterPublishing(availableHours - requiredHours);
    //   console.log("Updated hoursAfterPublishing:", availableHours - requiredHours);
    // }, [availableHours, requiredHours]);



    const [showPopup, setShowPopup] = useState(false);

    const proceedWithPublish = () => {
        setShowPopup(true); // Show popup on click
        setTimeout(() => {
            setShowPopup(false); // Auto-close popup after 3 seconds
        }, 3000);
        setWarningPopupOpen(false); // Close warning modal
        setSuccessPopupOpen(true);  // Show success popup


    };

    const [loading, setLoading] = useState(false);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false);

    const handleDateTimeChange = (newDateTime) => {
        setDateTime(newDateTime);
        setIsChecking(true);
        setAvailabilityMessage("");

        setTimeout(() => {
            const now = dayjs();
            const selectedDate = dayjs(newDateTime);
            let isValid = true;
            let message = "The selected date and time is available!";

            if (selectedDate.isBefore(now, "minute")) {
                message = "Cannot select past date and time.";
                isValid = false;
            }

            if (selectedDate.hour() === 12) {
                message = "This time slot (12 PM - 1 PM) is unavailable.";
                isValid = false;
            }

            setIsChecking(false);
            setAvailabilityMessage(message);
            setIsDateTimeValid(isValid); // Set validity state
        }, 1500);
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Handle selecting a class
    const handleSelectClass = (className) => {
        if (!selectedClasses.includes(className)) {
            setSelectedClasses((prev) => [...prev, className]);
        }
    };
    // Remove selected tag
    const removeClass = (className) => {
        setSelectedClasses(selectedClasses.filter((c) => c !== className));
    };


   // Enhanced email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const processEmails = (input) => {
    // Split by commas or whitespace (including multiple spaces, tabs, newlines)
    const emails = input
        .split(/[, \t\n]+/)
        .map((email) => email.trim())
        .filter((email) => email);
    
    const invalidEmails = [];
    const validEmails = [];

    emails.forEach((email) => {
        // Remove any trailing comma or space that might have been left
        const cleanEmail = email.replace(/[, ]+$/, '');
        
        if (!emailRegex.test(cleanEmail)) {
            invalidEmails.push(cleanEmail);
        } else if (!emailTags.includes(cleanEmail)) {
            validEmails.push(cleanEmail);
        }
    });

    if (invalidEmails.length > 0) {
        setEmailError(`Invalid email(s): ${invalidEmails.join(", ")}`);
    } else {
        setEmailError("");
    }

    if (validEmails.length > 0) {
        setEmailTags((prev) => [...new Set([...prev, ...validEmails])]); // Ensure no duplicates
        setCurrentEmail("");
    }
};

    const handleKeyDown = (event) => {
        if ((event.key === "Enter" || event.key === "," || event.key === " ") && currentEmail.trim()) {
            event.preventDefault();
            processEmails(currentEmail.trim());
        } else if (event.key === "Backspace" && currentEmail === "") {
            // Delete the last tag when input is empty
            if (emailTags.length > 0) {
                const updatedTags = [...emailTags];
                updatedTags.pop(); // remove the last tag
                setEmailTags(updatedTags);
            }
        }
    };

const handleChange = (event) => {
    const input = event.target.value;
    if (event.nativeEvent.inputType === "insertFromPaste") {
        // Process immediately on paste
        processEmails(input);
        // Clear the input field after processing paste
        event.target.value = "";
    } else {
        setCurrentEmail(input);
    }
};

const handleDeleteTag = (email) => {
    setEmailTags(emailTags.filter((tag) => tag !== email));
};

    const handleToggleAdvanced = () => {
        setShowAdvanced((prev) => !prev);
    };

    const handleToggleSettings = () => {
        setShowSettings((prev) => !prev);
    };

    const handlePublish = () => {
        setWarningPopupOpen(true);
    };

    // const proceedWithPublish = async () => {
    //   setLoading(true);
    //   try {
    //     // Simulating a publish action (e.g., API call)
    //     await new Promise((resolve) => setTimeout(resolve, 2000));
    //     setLoading(false);
    //     setSuccessPopupOpen(true);
    //   } catch (error) {
    //     setLoading(false);
    //     console.error("Publish failed", error);
    //   }
    // };

    const handleClosePopup = () => {
        setSuccessPopupOpen(false);
        onClose();
    };
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

    return (
        <div className="publish-modal-overlay">
            <div
                ref={modalRef}
                className={`publish-modal-content publish-modal-content2 ${isBouncing ? "bounce" : ""}`}
            >
                <div className="publish-modal-header">
                    <h5>Publish: {selectedTest}</h5>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="publish-modal-body">
                    <form>
                        <div className="publish-form-group">
                            {/* <label>Schedule Type</label> */}
                            <div className="radio-buttons">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        checked={isScheduled}
                                        onChange={() => setIsScheduled(true)}
                                        className=""
                                        style={{ marginRight: "7px" }}
                                    />
                                    Scheduled
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        checked={!isScheduled}
                                        onChange={() => setIsScheduled(false)}
                                        className=""
                                        style={{ marginRight: "7px" }}

                                    />
                                    Unscheduled
                                </label>
                            </div>

                        </div>

                        <div className="" ref={containerRef}>
                            <label>Select Classes</label>

                            <div className='mcq-form-control publish-form-control2' onClick={toggleDropdown}>
                                {selectedClasses.map((className) => (
                                    <span key={className} className="tag">
                                        {className}
                                        <span className="remove-tag" onClick={() => removeClass(className)}>×</span>
                                    </span>
                                ))}

                                <input
                                    type="text"
                                    ref={inputRef}
                                    onKeyDown={handleBackspace}
                                    placeholder="Click to select..."
                                    style={{ border: "none", outline: "none" }}
                                    
                                    
                                />

                                {selectedClasses.length > 0 && (
                                    <span className="clear-tags" onClick={clearAllTags}>×</span>
                                )}
                            </div>

                            {isDropdownOpen && (
                                <ul className="dropdown">
                                    {availableClasses.map((className) => (
                                        <li key={className} onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectClass(className);
                                        }}>
                                            {className}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {isScheduled && (
                            <div
                                className="publish-form-group"
                                style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}
                            >
                                <label style={{
                                    display: "block", marginBottom: "1px", marginTop: "7px"
                                }}>Date and Time</label>
                                <div className="" style={{ width: "100%" }}>
                                    <CustomDateTimePicker
                                        selectedDate={dateTime}
                                        onDateChange={handleDateTimeChange}
                                        className=""
                                    />
                                </div>


                                {/* Loader & Availability Message */}
                                {isChecking && (
                                    <div className="availability-message loading">
                                        <FontAwesomeIcon icon={faSpinner} spin /> Checking availability...
                                    </div>
                                )}

                                {availabilityMessage && (
                                    <div className={`availability-message ${availabilityMessage.includes("Cannot") || availabilityMessage.includes("unavailable") ? "error" : "success"}`}>
                                        {availabilityMessage}
                                    </div>
                                )}

                            </div>
                        )}

                        <div className="advanced-container">
                            <button
                                type="button"
                                className={`toggle-button mt-4 ${showAdvanced ? "active" : ""}`}
                                onClick={handleToggleAdvanced}
                            >
                                <FontAwesomeIcon icon={faSliders} className="fa-icon" />
                                <span>{showAdvanced ? "Hide Advanced Options" : "Advanced Options"}</span>
                            </button>



                            {showAdvanced && (
                                <div className={`advanced-options ${showAdvanced ? "open" : "closed"}`}>
                                    <div className="pb-2">
                                        <label>Invite/Enroll</label>
                                        <div
                                            className={`tags-container ${isFocused ? "focused" : ""}`}
                                            onClick={() => document.querySelector(".tags-input-field").focus()}
                                        >
                                            {emailTags.map((email, index) => (
                                                <span key={index} className="email-tag">
                                                    {email}
                                                    <span onClick={() => handleDeleteTag(email)}>&times;</span>
                                                </span>
                                            ))}
                                            <input
                                                type="email"
                                                value={currentEmail}
                                                onChange={handleChange}
                                                onKeyDown={handleKeyDown}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                                placeholder="Email Address separated by comma & space"
                                                className="tags-input-field"
                                            />
                                        </div>

                                        {emailError && <div className="error-text">{emailError}</div>}
                                    </div>

                                    <div className="publish-form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={emailThroughEmail}
                                                onChange={() => setEmailThroughEmail(!emailThroughEmail)}
                                                style={{ marginRight: "8px" }}
                                                className="publish-form-control"
                                            />
                                            Generate a Link for others to enroll for the test
                                        </label>
                                    </div>

                                    {emailThroughEmail && (
                                        <div className="publish-form-group">
                                            <label>Maximum Allowed Enrollments</label>
                                            <input
                                                type="number"
                                                value={attemptLimit}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    if (value >= 0) {
                                                        setAttemptLimit(value);
                                                    }
                                                }}
                                                placeholder="Enter maximum allowed attempts"
                                                className="mcq-form-control"
                                            />
                                        </div>
                                    )}
                                    <div className="publish-form-group">
                                        <label >Enrollment Deadline</label>
                                        <div className="date-picker-wrapper">
                                            <DatePicker
                                                showTime={{
                                                    format: 'HH:mm',
                                                    minuteStep: 15,
                                                    suffixIcon: <FaClock className="time-icon" />,
                                                }}
                                                format="DD-MM-YYYY HH:mm"
                                                value={enrollmentDeadline}
                                                onChange={(date) => setEnrollmentDeadline(date)}
                                                className={`date-range-picker ${errors.enrollmentDeadline ? "error" : ""}`}
                                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                                                suffixIcon={<FaCalendarAlt className="calendar-icon" />}
                                                placeholder="Select date and time"
                                            />
                                            {errors.enrollmentDeadline && (
                                                <div className="error-message">{errors.enrollmentDeadline}</div>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            )}
                            
                            
                        </div>


                        {isScheduled && !isUnscheduled && (  // Hide if Unscheduled is selected
                            <button
                                type="button"
                                className={`toggle-button ${showSettings ? "active" : ""}`}
                                onClick={handleToggleSettings}
                            >
                                <FontAwesomeIcon icon={faCog} className="fa-icon" />
                                <span>{showSettings ? " Hide Settings" : " Settings"}</span>
                            </button>

                        )}

                        {/* Settings Section - Hidden when Unscheduled is selected */}
                        {isScheduled && !isUnscheduled && showSettings && (
                            <div className="settings-options">
                               


                                <div className="publish-form-group">
                                    <label>Timer to Start Before Scheduled Time</label>
                                    <select
                                        value={isCustom ? "custom" : duration}
                                        className="mcq-form-control"
                                        onChange={(e) => {
                                            if (e.target.value === "custom") {
                                                setIsCustom(true);
                                                setCustomDuration("");
                                            } else {
                                                setIsCustom(false);
                                                setDuration(e.target.value);
                                            }
                                        }}
                                    >
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="60">1 Hour</option>
                                        <option value="immediate">Immediately After Publishing</option>
                                        <option value="custom">Enter Custom Time</option>
                                    </select>
                                </div>

                                {isCustom && (
                                    <div className="publish-form-group">
                                        <label>Custom Time (minutes)</label>
                                        <input
                                            type="number"
                                            value={customDuration}
                                            className="publish-form-control"
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                if (value >= 0 || e.target.value === "") {
                                                    setCustomDuration(e.target.value);
                                                }
                                            }}

                                            placeholder="Enter custom time in minutes"
                                            style={{ width: "100%", border: "1px solid gray" }}
                                        />
                                    </div>
                                )}



                                {entryType === "sharp-time-allowed" && (
                                    <div className="publish-form-group">
                                        <label>Time Not Allowed After Scheduled Time (minutes)</label>
                                        <input
                                            type="number"
                                            value={timeAfterScheduled}
                                            onChange={(e) => setTimeAfterScheduled(e.target.value)}
                                            placeholder="Enter time in minutes"
                                            className="publish-form-control"
                                        />
                                    </div>
                                )}

                                <div className="publish-form-group">
                                    <label>Publish Result</label>
                                    <select value={publishResult} onChange={(e) => setPublishResult(e.target.value)} className="mcq-form-control">
                                        <option value="immediate">Show Result Immediately</option>
                                        <option value="after-time">Show After Specified Time</option>
                                        <option value="manual">Publish By Test Organizer Manually</option>
                                    </select>
                                </div>

                                {publishResult === "after-time" && (
                                    <div className="publish-form-group">
                                        <label>Result Delay Time (minutes)</label>
                                        <input
                                            type="number"
                                            value={resultDelay}
                                            onChange={(e) => setResultDelay(e.target.value)}
                                            placeholder="Enter delay time in minutes"
                                            style={{ width: "100%" }}
                                            className="publish-form-control"
                                        />
                                    </div>
                                )}

                                <div className="publish-form-group">
                                    <label>Rank Calculation</label>
                                    <select value={rankCalculation} onChange={(e) => setRankCalculation(e.target.value)} className="mcq-form-control">
                                        <option value="">Select Type</option>
                                        <option value="absolute">Absolute Ranking</option>
                                        <option value="percentage">Percentage Ranking with Tie Breaks</option>
                                    </select>
                                </div>




                            </div>
                        )}
                    </form>
                </div>
                <div className="publish-modal-footer">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn create-btn"
                        onClick={handlePublish}
                        disabled={
                            loading ||
                            (!selectedClasses.length && !emailTags.length && !emailThroughEmail) ||
                            (isScheduled && (!dateTime || !isDateTimeValid)) // Added isDateTimeValid check
                        }
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </div>

            {/* Warning Modal */}
            {warningPopupOpen && (
                <div className="exam-summary-modal-overlay">
                    <div className="exam-summary-modal">
                        <div className="exam-summary-modal-content">
                            <div className="publish-modal-header">
                                <h5>Your Test Summary</h5>
                                <button className="close-btn" onClick={() => setWarningPopupOpen(false)}>
                                    &times;
                                </button>
                            </div>

                            <div className="exam-summary-modal-body">
                                <h4>Exam Summary</h4>

                                <div className="exam-summary-grid">
                                    <div className="exam-summary-item">
                                        <p><span>Exam Name:</span> {examName}</p>
                                    </div>
                                    <div className="exam-summary-item">
                                        <p><span>Number of Participations:</span> {participations}</p>
                                    </div>
                                    <div className="exam-summary-item">
                                        <p><span>Exam Duration:</span> {examDuration} minutes</p>
                                    </div>
                                    <div className="exam-summary-item">
                                        <p><span>Total Hours Required:</span> {totalHoursRequired.toFixed(2)} hours</p>
                                    </div>
                                    {/* <div className="exam-summary-item">
                    <p><span>Available Hours:</span> {hoursAvailable} hours</p>
                  </div> */}
                                    {/* <div className="exam-summary-item">
                    <p><span>Default Duration:</span> {duration} minutes</p>
                  </div> */}
                                </div>



                                <h4>Hours Summary</h4>
                                <div className="exam-summary-grid">
                                    <div className="exam-summary-item">
                                        <p>
                                            <span>Hours Available:</span>{" "}
                                            <span className={`hours-warning ${hoursAfterPublishing < 0 ? "warning" : ""}`}>
                                                {hoursAvailable}
                                            </span>{" "}
                                            hours
                                        </p>
                                    </div>
                                    <div className="exam-summary-item">
                                        <p>
                                            <span>Hours After Publishing:</span>{" "}
                                            <span className={isTimeSufficient ? "success-message" : "error-message"}>
                                                {hoursAfterPublishing.toFixed(2)}
                                            </span>{" "}
                                            hours
                                        </p>
                                    </div>
                                </div>

                                <h4>Remaining Time</h4>
                                <div className="exam-summary-modal-box">
                                    {isTimeSufficient ? (
                                        <p className="success-message">Sufficient time available to publish the exam.</p>
                                    ) : (
                                        <p className="error-message">
                                            You do not have enough hours to publish this exam. Please purchase additional hours or change the exam settings.
                                        </p>
                                    )}

                                    <div className="purchase-buttons">
                                        <button className="load-more-button cancel" onClick={handleAdjustExamSettings}>
                                            Adjust Exam Settings
                                        </button>
                                        <button className="load-more-button cancel " onClick={handlePurchaseHours} >
                                            Purchase Hours
                                        </button>
                                    </div>

                                </div>

                                <p className="confirm-message">
                                    Do you want to continue publishing this test despite the conflicts?
                                </p>
                            </div>

                            <div className="custom-modal-footer">

                                <button className="newtest-modal-button create" onClick={proceedWithPublish} disabled={!isTimeSufficient} style={{ alignItems: "center", margin: "0 auto" }}>
                                    Proceed with Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Success Toast */}
            {/* Popup */}
            {showPopup && (
                <div className="testsuccess-popup-overlay">
                    <div className="testsuccess-popup-content">
                        <h3>Publishing in Progress...</h3>
                        <p>Your test is being published. Please wait.</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublishModal