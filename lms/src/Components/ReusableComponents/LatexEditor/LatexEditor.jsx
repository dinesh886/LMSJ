import React, { useState, useEffect } from 'react';
import './LatexEditor.css'; // Create this for styling

const LatexEditor = ({ value, onChange }) => {
    const [latexInput, setLatexInput] = useState(value);
    const [preview, setPreview] = useState('');

    // This would typically call an API to render LaTeX to HTML
    // For demo purposes, we'll just show the raw LaTeX
    useEffect(() => {
        setPreview(latexInput);
        onChange(latexInput);
    }, [latexInput, onChange]);

    return (
        <div className="latex-editor">
            <div className="editor-section">
                <h4>LaTeX Editor</h4>
                <textarea
                    value={latexInput}
                    onChange={(e) => setLatexInput(e.target.value)}
                    placeholder="Enter LaTeX code here..."
                    className="latex-textarea"
                />
                <div className="latex-toolbar">
                    <button onClick={() => setLatexInput(prev => prev + '\\frac{a}{b}')}>
                        Fraction
                    </button>
                    <button onClick={() => setLatexInput(prev => prev + '\\sqrt{x}')}>
                        Square Root
                    </button>
                    <button onClick={() => setLatexInput(prev => prev + '\\sum_{i=1}^n')}>
                        Sum
                    </button>
                    {/* Add more LaTeX shortcuts as needed */}
                </div>
            </div>
            <div className="preview-section">
                <h4>Preview</h4>
                <div className="latex-preview-content">
                    {preview || <em>LaTeX preview will appear here</em>}
                </div>
            </div>
        </div>
    );
};

export default LatexEditor;