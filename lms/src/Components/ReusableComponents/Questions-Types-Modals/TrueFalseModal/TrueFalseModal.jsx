import React, { useState, useEffect } from "react";
import "./TrueFalseModal.css";
import "katex/dist/katex.min.css";
import LatexRenderer, { cleanLatex } from "../../../ReusableComponents/LatexRenderer/LatexRenderer";
import useBounceModal from "../../../ReusableComponents/useBounceModal/useBounceModal";

const TrueFalseModal = ({ open, onClose }) => {
    const { modalRef, isBouncing } = useBounceModal(open);
    const [questionTitle, setQuestionTitle] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
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
            // Correct answer is not cleaned as it's a select dropdown
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
            correctAnswer,
            image,
            isCodeEnabled,
            isLaTeXEnabled,
        });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="true-false-modal-overlay">
            <div ref={modalRef} className={`true-false-modal-content ${isBouncing ? "bounce" : ""}`}>
                <div className="true-false-modal-header">
                    <h5>Add True/False Question</h5>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="true-false-modal-body">
                    <div className="true-false-row">
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

                            <div className="true-false-form-group">
                                <label>Question</label>
                                {isLaTeXEnabled ? (
                                    <textarea
                                        className="true-false-form-control latex-input"
                                        rows="4"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter content (supports LaTeX with \(...\) and HTML tags)"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="true-false-form-control"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter question text"
                                    />
                                )}
                            </div>

                            <div className="true-false-form-group">
                                <label>Correct Answer</label>
                                <select
                                    className="true-false-form-control"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    required
                                >
                                    <option value="">Select Correct Answer</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>

                            <div className="true-false-form-group">
                                <label>Upload Image (Optional)</label>
                                <input
                                    type="file"
                                    className="true-false-form-control"
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
                            <div className="true-false-preview-section">
                                <h6>Live Preview</h6>
                                <div className="true-false-preview-question">
                                    <strong>Question:</strong>
                                    <div className="preview-content">
                                        {isLaTeXEnabled ? (
                                            <LatexRenderer content={questionTitle} />
                                        ) : (
                                            questionTitle || <span className="placeholder-text">No question added yet.</span>
                                        )}
                                    </div>
                                </div>
                                <div className="true-false-preview-correct-answer">
                                    <strong>Correct Answer:</strong>
                                    {correctAnswer ? (
                                        correctAnswer
                                    ) : (
                                        <span className="placeholder-text">Not selected yet.</span>
                                    )}
                                </div>
                                {image && (
                                    <div className="true-false-preview-image">
                                        <strong>Image:</strong>
                                        <img src={image} alt="Question" className="img-preview" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="true-false-modal-footer">
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

export default TrueFalseModal;