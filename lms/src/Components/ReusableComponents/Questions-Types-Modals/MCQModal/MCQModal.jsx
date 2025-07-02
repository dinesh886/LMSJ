import React, { useState, useRef, useEffect } from "react";
import "./MCQModal.css";
import { FaPlus } from "react-icons/fa";
import 'katex/dist/katex.min.css';
import LatexRenderer, { cleanLatex } from "../../../ReusableComponents/LatexRenderer/LatexRenderer";
import useBounceModal from "../../../ReusableComponents/useBounceModal/useBounceModal";

const MCQModal = ({ open, onClose, initialData }) => {
    const { modalRef, isBouncing } = useBounceModal(open);
    const [questionTitle, setQuestionTitle] = useState(initialData?.questionTitle || "");
    const [answers, setAnswers] = useState(initialData?.answers || [{ text: "", image: null }]);
    const [correctAnswer, setCorrectAnswer] = useState(initialData?.correctAnswer || "");
    const [isCodeEnabled, setIsCodeEnabled] = useState(true);  // default ON
    const [isLaTeXEnabled, setIsLaTeXEnabled] = useState(false); // default OFF
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionImage, setQuestionImage] = useState(initialData?.questionImage || null);
    // Handle initial data when modal opens
    useEffect(() => {
        if (open && initialData) {
            setQuestionTitle(initialData.questionTitle || "");
            setAnswers(initialData.answers || [{ text: "", image: null }]);
            setCorrectAnswer(initialData.correctAnswer || "");
            setIsCodeEnabled(initialData.isCodeEnabled || false);
            setIsLaTeXEnabled(initialData.isLaTeXEnabled || false);
        }
    }, [open, initialData]);
    useEffect(() => {
        if (open && initialData) {
            setQuestionTitle(initialData.questionTitle || "");
            setQuestionImage(initialData.questionImage || null);
            setAnswers(initialData.answers || [{ text: "", image: null }]);
            setCorrectAnswer(initialData.correctAnswer || "");
            setIsCodeEnabled(initialData.isCodeEnabled || false);
            setIsLaTeXEnabled(initialData.isLaTeXEnabled || false);
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
        if (fileInput) {
            fileInput.value = '';
        }
    };
    const handleCodeToggle = () => {
        const newCodeState = !isCodeEnabled;
        setIsCodeEnabled(newCodeState);

        if (!newCodeState) {
            // Code is being turned OFF, enable LaTeX
            setIsLaTeXEnabled(true);
        } else {
            // Code is being turned ON, disable LaTeX
            setIsLaTeXEnabled(false);
        }
    };

    const handleLaTeXToggle = () => {
        const newLaTeXState = !isLaTeXEnabled;
        setIsLaTeXEnabled(newLaTeXState);

        if (!newLaTeXState) {
            // LaTeX is being turned OFF, enable Code
            setIsCodeEnabled(true);
        } else {
            // LaTeX is being turned ON, disable Code
            setIsCodeEnabled(false);
        }
    };
    
    const addAnswerField = () => {
        if (answers.length < 10) {
            setAnswers([...answers, { text: "", image: null }]);
        } else {
            alert("Maximum of 10 answer options reached");
        }
    };
    const removeAnswerField = (index) => {
        if (answers.length > 1) { // Keep at least one answer
            const updatedAnswers = [...answers];
            updatedAnswers.splice(index, 1);
            setAnswers(updatedAnswers);

            // Update correct answer if needed
            if (correctAnswer === `answer${index + 1}`) {
                setCorrectAnswer("");
            } else if (correctAnswer) {
                const answerNum = parseInt(correctAnswer.replace("answer", ""));
                if (answerNum > index + 1) {
                    setCorrectAnswer(`answer${answerNum - 1}`);
                }
            }
        }
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

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index][field] = isLaTeXEnabled ? cleanLatexInput(value) : value;
        setAnswers(updatedAnswers);
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Image size should be less than 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedAnswers = [...answers];
                updatedAnswers[index].image = reader.result;
                setAnswers(updatedAnswers);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index].image = null;
        setAnswers(updatedAnswers);

        // Reset the file input value
        const fileInput = document.querySelector(`input[type="file"][data-index="${index}"]`);
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async () => {
        if (!questionTitle.trim()) {
            alert("Please enter a question");
            return;
        }

        if (answers.some(answer => !answer.text.trim())) {
            alert("Please fill all answer fields");
            return;
        }

        if (!correctAnswer) {
            alert("Please select the correct answer");
            return;
        }

        setIsSubmitting(true);
        try {
            const questionData = {
                questionTitle,
                questionImage,
                answers,
                correctAnswer,
                isCodeEnabled,
                isLaTeXEnabled,
            };

            // Here you would typically call an API to save the question
            console.log("Submitting question:", questionData);

            // Reset form after successful submission
            setQuestionTitle("");
            setAnswers([{ text: "", image: null }]);
            setCorrectAnswer("");
            setIsCodeEnabled(false);
            setIsLaTeXEnabled(false);

            onClose();
        } catch (error) {
            console.error("Error submitting question:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clean LaTeX input when toggling
    useEffect(() => {
        if (!isLaTeXEnabled) {
            setQuestionTitle(prev => cleanLatex(prev));
            setAnswers(prev => prev.map(answer => ({
                ...answer,
                text: cleanLatex(answer.text)
            })));
        }
    }, [isLaTeXEnabled]);

    if (!open) return null;

    return (
        <div className="mcq-modal-overlay">
            <div ref={modalRef} className={`mcq-modal-content ${isBouncing ? "bounce" : ""}`}>
                <div className="mcq-modal-header">
                    <h5>{initialData ? "Edit MCQ Question" : "Add MCQ Question"}</h5>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="mcq-modal-body">
                    <div className="modal-mcq-row">
                        <div className="first-column">
                            <div className="switch-container">
                                <div className="switch-wrapper">
                                    <label>Enable Code</label>
                                    <div className="switch" onClick={(e) => e.stopPropagation()} >
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
                                    <div className="switch" onClick={(e) => e.stopPropagation()} > {/* CHANGED from <label> to <div> */}
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



                            <div className="mcq-form-group">
                                <label className="pt-3">Question : </label>
                                {isLaTeXEnabled ? (
                                    <textarea
                                        className="mcq-form-control latex-input"
                                        rows="4"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(cleanLatexInput(e.target.value))}
                                        placeholder="Enter content (supports LaTeX with $...$, $$...$$, \(...\), \[...\])"
                                        disabled={isSubmitting}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="mcq-form-control"
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
                                        className="mcq-form-control"
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

                            {answers.map((answer, index) => (
                                <div className="mcq-form-group" key={index}>
                                    <div className="answer-header">
                                        <label>Option {index + 1}</label>
                                        {index > 0 && (  // Only show remove button for answers after the first one
                                            <button
                                                className="btn-remove-answer"
                                                onClick={() => removeAnswerField(index)}
                                                disabled={isSubmitting}
                                                title="Remove Answer"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {isLaTeXEnabled ? (
                                        <textarea
                                            className="mcq-form-control latex-input"
                                            value={answer.text}
                                            onChange={(e) => handleAnswerChange(index, "text", cleanLatexInput(e.target.value))}
                                            placeholder="Enter LaTeX equation"
                                            disabled={isSubmitting}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="mcq-form-control"
                                            value={answer.text}
                                            onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                                            placeholder="Enter answer text"
                                            disabled={isSubmitting}
                                        />
                                    )}

                                    <div className="image-upload-container">
                                        <label className="image-upload-label">
                                            {answer.image ? "Change Image" : "Add Image"}
                                        </label>

                                        <input
                                            type="file"
                                            className="mcq-form-control"
                                            onChange={(e) => handleImageUpload(e, index)}
                                            accept="image/*"
                                            disabled={isSubmitting}
                                            data-index={index}
                                        />
                                        {answer.image && (
                                            <div className="image-preview-container">
                                                <div className="image-wrapper">
                                                    <img
                                                        src={answer.image}
                                                        alt={`Answer ${index + 1} preview`}
                                                        className="img-preview-small"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'block';
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    className="btn-remove-image"
                                                    onClick={() => handleRemoveImage(index)}
                                                    disabled={isSubmitting}
                                                    aria-label={`Remove image for Answer ${index + 1}`}
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
                            ))}

                            {answers.length < 10 ? (
                                <button
                                    className="btn-add-answer"
                                    onClick={addAnswerField}
                                    disabled={isSubmitting}
                                >
                                    <span><FaPlus className="icon" /></span> Add Option
                                </button>
                            ) : (
                                <div className="max-answers-message">
                                    Maximum of 10 answer options reached
                                </div>
                            )}

                            <div className="mcq-form-group">
                                <label>Correct Answer</label>
                                <select
                                    className="mcq-form-control"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    required
                                    disabled={isSubmitting || answers.length === 0}
                                >
                                    <option value="">Select Correct Answer</option>
                                    {answers.map((_, index) => (
                                        <option key={index} value={`answer${index + 1}`}>
                                            Answer {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="secound-column">
                            <div className="Mcqpreview-section">
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

                                    <div className="preview-answers">
                                        <div className="preview-label">Options:</div>
                                        <div className="answers-list">
                                            {answers.map((answer, index) => (
                                                <div
                                                    className={`answer-item ${correctAnswer === `answer${index + 1}` ? 'correct-answer' : ''}`}
                                                    key={index}
                                                >
                                                    <div className="answer-header">
                                                        <span className="answer-number">Option : {index + 1}</span>
                                                        {correctAnswer === `answer${index + 1}` && (
                                                            <span className="correct-badge">Correct</span>
                                                        )}
                                                    </div>
                                                    <div className="answer-content">
                                                        {isLaTeXEnabled ? (
                                                            <LatexRenderer content={answer.text?.trim()} />
                                                        ) : (
                                                            answer.text?.trim() || <span className="placeholder-text">Empty answer</span>
                                                        )}
                                                        {answer.image && (
                                                            <div className="answer-image-container">
                                                                <img
                                                                    src={answer.image}
                                                                    alt={`Answer ${index + 1}`}
                                                                    className="answer-image"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.nextElementSibling.style.display = 'block'
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="preview-footer">
                                        <div className="preview-label">Correct Answer:</div>
                                        <div className="correct-answer-display">
                                            {correctAnswer ? (
                                                <div className="selected-answer">
                                                    <span className="answer-indicator"></span>
                                                    {correctAnswer.replace('answer', 'Answer ')}
                                                </div>
                                            ) : (
                                                <span className="placeholder-text">Not selected yet</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mcq-modal-footer">
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

export default MCQModal;