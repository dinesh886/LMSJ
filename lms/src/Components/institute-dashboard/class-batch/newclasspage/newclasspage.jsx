import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./newclasspage.css";
import { FaCopy } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../../header/header";
const AddClass = () => {
    const navigate = useNavigate();

    const [className, setClassName] = useState("");
    const [studentsType, setStudentsType] = useState("both");
    const [maxStrength, setMaxStrength] = useState(30);
    const [permission, setPermission] = useState("auto");
    const [expiryDate, setExpiryDate] = useState(null);
    const [expiryTime, setExpiryTime] = useState(null);
    const [classLink, setClassLink] = useState("");
    const [isLimited, setIsLimited] = useState(false);
    const [errors, setErrors] = useState({});

    // Generate the class link
    const generateLink = () => {
        const link = `https://example.com/class/${Math.random().toString(36).substring(7)}`;
        setClassLink(link);
    };

    // Validate fields before submission
    const validateForm = () => {
        const newErrors = {};
        if (!className.trim()) newErrors.className = "Class Name is required.";
        if (studentsType === "admin" && (!maxStrength || maxStrength <= 0)) newErrors.maxStrength = "Enter a valid number.";
        if (!expiryDate) newErrors.expiryDate = "Expiry Date is required.";
        if (!expiryTime) newErrors.expiryTime = "Expiry Time is required.";
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(classLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
    };

    // Handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!validateForm()) return;

    //     const newClass = {
    //         className,
    //         studentsType,
    //         maxStrength,
    //         permission,
    //         expiryDate: new Date(`${expiryDate}T${expiryTime}`),
    //         classLink,
    //     };

    //     handleAddClass(newClass);
    // };

    return (
        <>
            <Header />
        <div className="add-class-container">
            <Form className="add-class-form">
                <h5 className="addnewclass-title">Add New Class</h5>

                <div className="newclass-form-content">
                    <div className="newclass-form-inner">

                        {/* Class Name */}
                        <div className="mb-3">
                            <label className="form-label">Class Name</label>
                            <input
                                type="text"
                                placeholder="Enter class name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="form-control"
                            />
                            {errors.className && <small className="text-danger">{errors.className}</small>}
                        </div>

                        {/* Students Type (Radio buttons) */}
                        <div className="mb-3">
                            <label className="form-label">Add Students</label>
                            <div className="radio-buttons">
                                <input id="admin" type="radio" value="admin" checked={studentsType === "admin"} onChange={(e) => setStudentsType(e.target.value)} />
                                <label htmlFor="admin">Only By Admin</label>

                                <input id="both" type="radio" value="both" checked={studentsType === "both"} onChange={(e) => setStudentsType(e.target.value)} />
                                <label htmlFor="both">Hybrid (Both Way)</label>

                                <input id="student" type="radio" value="student" checked={studentsType === "student"} onChange={(e) => setStudentsType(e.target.value)} />
                                <label htmlFor="student">Only By Students</label>
                            </div>

                        </div>

                        {/* Max Strength (only if "Admin Only" is selected) */}
                        {studentsType === "admin" && (
                            <div className="mb-3">
                                <label className="form-label">Max Strength</label>
                                <input
                                    type="number"
                                    value={maxStrength}
                                    onChange={(e) => setMaxStrength(e.target.value)}
                                    className="form-control"
                                />
                                {errors.maxStrength && <small className="text-danger">{errors.maxStrength}</small>}
                            </div>
                        )}

                        {/* Permission (Radio buttons) */}
                        <div className="mb-3">
                            <label className="form-label">Permission</label>
                            <div className="radio-buttons">
                                <input type="radio" name="permission" value="auto" checked={permission === "auto"} onChange={(e) => setPermission(e.target.value)} /> Auto Activation
                                <input type="radio" name="permission" value="manual" checked={permission === "manual"} onChange={(e) => setPermission(e.target.value)} /> Manual Activation
                            </div>
                        </div>

                        {/* Expiry Date and Time */}
                        <div className="mb-3">
                            <label className="form-label">Expiry Date and Time</label>
                            <div className="date-time-container">
                                <DatePicker
                                    selected={expiryDate}
                                    onChange={setExpiryDate}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-date"
                                    placeholderText="Select a date"
                                />
                                {errors.expiryDate && <small className="text-danger">{errors.expiryDate}</small>}

                                <DatePicker
                                    selected={expiryTime}
                                    onChange={setExpiryTime}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="form-control form-time"
                                    placeholderText="Select a time"
                                />
                                {errors.expiryTime && <small className="text-danger">{errors.expiryTime}</small>}
                            </div>
                        </div>

                        {/* Class Link */}
                        <div className="mb-3">
                            <label className="form-label">Class Link</label>
                            <div className="link-container">
                                {classLink ? (
                                    <div className="input-group">
                                        <input
                                            value={classLink}
                                            readOnly
                                            type="text"
                                            className="form-control new-class-link-input"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary copy-button"
                                            onClick={handleCopy}
                                        >
                                            <FaCopy />
                                        </button>
                                        {copied && <span className="copy-message">Link copied!</span>}
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline-primary"
                                        type="button"
                                        onClick={generateLink}
                                        className="generate-link-button"
                                    >
                                        Generate Link
                                    </Button>
                                )}
                                {classLink && (
                                    <Button
                                        variant="outline-primary"
                                        type="button"
                                        onClick={generateLink}
                                        className="regenerate-link-button"
                                    >
                                        Regenerate Link
                                    </Button>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className="mcq-modal-footer">
                        <button className="btn" onClick={(e) => {
                            e.preventDefault(); // Prevents page reload
                            navigate("/class");
                        }}>
                            Close
                        </button>

                        <button className="btn create-btn" type="button" disabled={!className || !expiryDate || !expiryTime} onClick={(e) => {
                            e.preventDefault(); // Prevents page reload
                            navigate("/class");
                        }}>
                            Add Class
                        </button>
                    </div>


                </div>
            </Form>
        </div>
        </>
    );
};

export default AddClass;
