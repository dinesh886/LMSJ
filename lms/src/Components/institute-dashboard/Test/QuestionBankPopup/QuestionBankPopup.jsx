import React, { useState } from 'react';
import { X } from 'lucide-react';
import './QuestionBankPopup.css';

const QuestionBankPopup = ({ onClose, onAdd }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [marks, setMarks] = useState('');
  const [negMarks, setNegMarks] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const questionBanks = ['Bank 1', 'Bank 2', 'Bank 3'];
  const questions = [
    { id: 1, text: 'Question 1' },
    { id: 2, text: 'Question 2' },
    { id: 3, text: 'Question 3' },
    { id: 4, text: 'Question 4' },
  ];
  const sections = ['Section 1', 'Section 2', 'Section 3'];

  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAdd = () => {
    onAdd({
      questions: selectedQuestions,
      marks,
      negMarks,
      section: selectedSection
    });
    onClose();
  };

  return (
    <div className="question-bank-popup-overlay">
      <div className="question-bank-popup">
        <div className="question-bank-popup-header">
          <h2 className="question-bank-popup-title">Add from Question Bank</h2>
          <button onClick={onClose} className="question-bank-popup-close">
            <X size={24} />
          </button>
        </div>

        <div className="question-bank-popup-section">
          <label className="question-bank-popup-label">Select Question Bank</label>
          <select
            className="question-bank-popup-select"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Select a bank</option>
            {questionBanks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        {selectedBank && (
          <div className="question-bank-popup-section">
            <label className="question-bank-popup-label">Select Questions</label>
            {questions.map(question => (
              <div key={question.id} className="question-bank-popup-checkbox-group">
                <input
                  type="checkbox"
                  id={`question-${question.id}`}
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleQuestionToggle(question.id)}
                  className="question-bank-popup-checkbox"
                />
                <label htmlFor={`question-${question.id}`}>{question.text}</label>
              </div>
            ))}
          </div>
        )}

        <div className="question-bank-popup-section">
          <label className="question-bank-popup-label">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="question-bank-popup-input"
            placeholder="Enter marks"
          />
        </div>

        <div className="question-bank-popup-section">
          <label className="question-bank-popup-label">Negative Marks</label>
          <input
            type="number"
            value={negMarks}
            onChange={(e) => setNegMarks(e.target.value)}
            className="question-bank-popup-input"
            placeholder="Enter negative marks"
          />
        </div>

        <div className="question-bank-popup-section">
          <label className="question-bank-popup-label">Choose Section</label>
          <select
            className="question-bank-popup-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select a section</option>
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="question-bank-popup-add-button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default QuestionBankPopup;

