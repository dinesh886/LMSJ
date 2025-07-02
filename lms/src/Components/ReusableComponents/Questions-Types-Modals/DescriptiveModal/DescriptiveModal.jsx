import React, { useState, useEffect } from "react";
import "./DescriptiveModal.css";
import "katex/dist/katex.min.css";
import LatexRenderer, { cleanLatex } from "../../../ReusableComponents/LatexRenderer/LatexRenderer";
import useBounceModal from "../../../ReusableComponents/useBounceModal/useBounceModal";

const DescriptiveModal = ({ open, onClose }) => {
    const { modalRef, isBouncing } = useBounceModal(open);
    const [questionTitle, setQuestionTitle] = useState("");
    const [image, setImage] = useState(null);
    const [isCodeEnabled, setIsCodeEnabled] = useState(false);
    const [isLaTeXEnabled, setIsLaTeXEnabled] = useState(false);
    const [latexError, setLatexError] = useState(null);

    // Toggle Code and LaTeX
    const handleCodeToggle = () => {
        const newValue = !isCodeEnabled;
        setIsCodeEnabled(newValue);
        if (newValue) {
            setIsLaTeXEnabled(false); // Disable LaTeX if Code is now enabled
        }
    };

    const handleLaTeXToggle = () => {
        const newValue = !isLaTeXEnabled;
        setIsLaTeXEnabled(newValue);
        if (newValue) {
            setIsCodeEnabled(false); // Disable Code if LaTeX is now enabled
        }
    };

    // Clean LaTeX input when LaTeX is disabled
    useEffect(() => {
        if (!isLaTeXEnabled) {
            setQuestionTitle((prev) => cleanLatex(prev));
        }
    }, [isLaTeXEnabled]);

    // Image upload handler
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission
    const handleSubmit = () => {
        console.log({
            questionTitle,
            image,
            isCodeEnabled,
            isLaTeXEnabled,
        });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="descriptive-modal-overlay">
            <div ref={modalRef} className={`descriptive-modal-content ${isBouncing ? "bounce" : ""}`}>
                <div className="descriptive-modal-header">
                    <h5>Add Descriptive Question</h5>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="descriptive-modal-body">
                    <div className="descriptive-row">
                        <div className="first-column">
                            <div className="switch-container">
                                <div className="switch-wrapper">
                                    <label>Enable Code</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={isCodeEnabled}
                                            onChange={handleCodeToggle}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="switch-wrapper">
                                    <label>Enable LaTeX</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={isLaTeXEnabled}
                                            onChange={handleLaTeXToggle}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="descriptive-form-group">
                                <label>Question</label>
                                {isLaTeXEnabled ? (
                                    <textarea
                                        className="descriptive-form-control latex-input"
                                        rows="4"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter content (supports LaTeX with \(...\) and HTML tags)"
                                    />
                                ) : (
                                    <textarea
                                        className="descriptive-form-control"
                                        rows="4"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter question text"
                                    />
                                )}
                            </div>

                            <div className="descriptive-form-group">
                                <label>Upload Image (Optional)</label>
                                <input
                                    type="file"
                                    className="descriptive-form-control"
                                    onChange={(e) => handleImageUpload(e)}
                                    accept="image/*"
                                />
                                {image && (
                                    <div className="image-preview-container">
                                        <img src={image} alt="Question preview" className="img-preview-small" />
                                        <button
                                            className="btn-remove-image"
                                            onClick={() => setImage(null)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="secound-column">
                            <div className="descriptive-preview-section">
                                <h6>Live Preview</h6>
                                <div className="descriptive-preview-question">
                                    <strong>Question:</strong>
                                    <div className="preview-content">
                                        {isLaTeXEnabled ? (
                                            <LatexRenderer content={questionTitle} />
                                        ) : (
                                            questionTitle || <span className="placeholder-text">No question added yet.</span>
                                        )}
                                    </div>
                                </div>
                                {image && (
                                    <div className="descriptive-preview-image">
                                        <strong>Image:</strong>
                                        <img src={image} alt="Question" className="img-preview" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="descriptive-modal-footer">
                    <button className="btn btn-cancel" onClick={onClose}>
                        Close
                    </button>
                    <button className="btn btn-save" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DescriptiveModal;