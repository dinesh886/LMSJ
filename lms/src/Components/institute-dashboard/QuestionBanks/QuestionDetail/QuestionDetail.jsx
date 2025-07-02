import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionDetail = ({ questions }) => {
  const { id, questionId } = useParams();
  const navigate = useNavigate();

  const currentQuestions = questions[id] || [];
  const currentIndex = currentQuestions.findIndex(
    (q) => q.id === parseInt(questionId)
  );
  const currentQuestion = currentQuestions[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/question-bank/${id}/question/${currentQuestions[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      navigate(`/question-bank/${id}/question/${currentQuestions[currentIndex + 1].id}`);
    }
  };

  return (
    <div className="question-detail">
      <h1>Question Details</h1>
      {currentQuestion ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          <p><strong>Type:</strong> {currentQuestion.type}</p>
          <p><strong>Answer:</strong> {currentQuestion.answer}</p>
          {currentQuestion.type === "mcq" && (
            <div>
              <strong>Options:</strong>
              <ul>
                {currentQuestion.options.map((opt, index) => (
                  <li key={index}>{opt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Question not found.</p>
      )}

      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="previous-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === currentQuestions.length - 1}
          className="next-button"
        >
          Next
        </button>
      </div>

      <button onClick={() => navigate(`/question-bank/${id}`)} className="back-button">
        Back to Questions List
      </button>
    </div>
  );
};

export default QuestionDetail;
