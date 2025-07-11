"use client"
import React, { useState, useEffect } from "react";
import "./DescriptiveModal.css";
import 'katex/dist/katex.min.css';
import LatexRenderer, { cleanLatex } from "../../../ReusableComponents/LatexRenderer/LatexRenderer";
import useBounceModal from "../../../ReusableComponents/useBounceModal/useBounceModal";

const DescriptiveModal = ({ open, onClose, initialData }) => {
    const { modalRef, isBouncing } = useBounceModal(open);
    const [questionTitle, setQuestionTitle] = useState(initialData?.questionTitle || "");
    const [questionImage, setQuestionImage] = useState(initialData?.questionImage || null);
    const [isCodeEnabled, setIsCodeEnabled] = useState(true);
    const [isLaTeXEnabled, setIsLaTeXEnabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle initial data when modal opens
    useEffect(() => {
        if (open && initialData) {
            setQuestionTitle(initialData.questionTitle || "");
            setQuestionImage(initialData.questionImage || null);
            setIsCodeEnabled(initialData.isCodeEnabled || false);
            setIsLaTeXEnabled(initialData.isLaTeXEnabled || false);
        } else if (open) {
            // Reset for new question
            setQuestionTitle("");
            setQuestionImage(null);
            setIsCodeEnabled(true);
            setIsLaTeXEnabled(false);
        }
    }, [open, initialData]);

    const handleQuestionImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image size should be less than 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuestionImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveQuestionImage = () => {
        setQuestionImage(null);
        const fileInput = document.querySelector(`input[type="file"]#question-image-upload`);
        if (fileInput) fileInput.value = '';
    };

    const handleCodeToggle = () => {
        const newCodeState = !isCodeEnabled;
        setIsCodeEnabled(newCodeState);
        if (!newCodeState) setIsLaTeXEnabled(true);
        else setIsLaTeXEnabled(false);
    };

    const handleLaTeXToggle = () => {
        const newLaTeXState = !isLaTeXEnabled;
        setIsLaTeXEnabled(newLaTeXState);
        if (!newLaTeXState) setIsCodeEnabled(true);
        else setIsCodeEnabled(false);
    };

    const cleanLatexInput = (text) => {
        if (!text) return '';
        return text
            .replace(/\\documentclass\{.*?\}/g, '')
            .replace(/\\usepackage\{.*?\}/g, '')
            .replace(/\\begin\{document\}/g, '')
            .replace(/\\end\{document\}/g, '')
            .replace(/\\vspace\{.*?\}/g, '');
    };

    const handleSubmit = async () => {
        if (!questionTitle.trim()) {
            alert("Please enter a question");
            return;
        }

        setIsSubmitting(true);
        try {
            const questionData = {
                questionTitle,
                questionImage,
                isCodeEnabled,
                isLaTeXEnabled,
            };

            console.log("Submitting question:", questionData);
            onClose();
        } catch (error) {
            console.error("Error submitting question:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!isLaTeXEnabled) {
            setQuestionTitle(prev => cleanLatex(prev));
        }
    }, [isLaTeXEnabled]);

    if (!open) return null;

    return (
        <div className="descriptive-modal-overlay">
            <div ref={modalRef} className={`descriptive-modal-content ${isBouncing ? "bounce" : ""}`}>
                <div className="descriptive-modal-header">
                    <h5>{initialData ? "Edit Descriptive Question" : "Add Descriptive Question"}</h5>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="descriptive-modal-body">
                    <div className="descriptive-modal-row">
                        <div className="first-column">
                            <div className="switch-container">
                                <div className="switch-wrapper">
                                    <label>Enable Code</label>
                                    <div className="switch" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={isCodeEnabled}
                                            onChange={handleCodeToggle}
                                            disabled={isSubmitting}
                                        />
                                        <span className="slider round"></span>
                                    </div>
                                </div>

                                <div className="switch-wrapper">
                                    <label>Enable LaTeX</label>
                                    <div className="switch" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={isLaTeXEnabled}
                                            onChange={handleLaTeXToggle}
                                            disabled={isSubmitting}
                                        />
                                        <span className="slider round"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="descriptive-form-group">
                                <label className="pt-3">Question : </label>
                                {isLaTeXEnabled ? (
                                    <textarea
                                        className="descriptive-form-control latex-input"
                                        rows="6"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(cleanLatexInput(e.target.value))}
                                        placeholder="Enter content (supports LaTeX with $...$, $$...$$, \(...\), \[...\])"
                                        disabled={isSubmitting}
                                    />
                                ) : (
                                    <textarea
                                        className="descriptive-form-control"
                                        rows="6"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter question text"
                                        disabled={isSubmitting}
                                    />
                                )}
                                <div className="image-upload-container">
                                    <label className="image-upload-label">
                                        {questionImage ? "Change Question Image" : "Add Question Image"}
                                    </label>
                                    <input
                                        type="file"
                                        id="question-image-upload"
                                        className="descriptive-form-control"
                                        onChange={handleQuestionImageUpload}
                                        accept="image/*"
                                        disabled={isSubmitting}
                                    />
                                    {questionImage && (
                                        <div className="image-preview-container">
                                            <div className="image-wrapper">
                                                <img
                                                    src={questionImage}
                                                    alt="Question preview"
                                                    className="img-preview-small"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'block';
                                                    }}
                                                />
                                            </div>
                                            <button
                                                className="btn-remove-image"
                                                onClick={handleRemoveQuestionImage}
                                                disabled={isSubmitting}
                                                aria-label="Remove question image"
                                                title="Remove image"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="secound-column">
                            <div className="Descriptivepreview-section">
                                <div className="preview-header">
                                    <span>Live Preview</span>
                                    <div className="preview-status">
                                        {isLaTeXEnabled && <span className="latex-badge">LaTeX Enabled</span>}
                                        {isCodeEnabled && <span className="code-badge">Code Formatting</span>}
                                    </div>
                                </div>

                                <div className="preview-body">
                                    <div className="preview-question">
                                        <div className="preview-label">Question:</div>
                                        <div className="modal-preview-content">
                                            {isLaTeXEnabled ? (
                                                <LatexRenderer
                                                    content={questionTitle}
                                                    isInline={false}
                                                />
                                            ) : (
                                                questionTitle || <span className="placeholder-text">No question added yet</span>
                                            )}
                                            {questionImage && (
                                                <div className="question-image-container">
                                                    <img
                                                        src={questionImage}
                                                        alt="Question"
                                                        className="question-image"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'block';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="descriptive-modal-footer">
                    <button
                        className="btn btn-cancel"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-save"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DescriptiveModal;