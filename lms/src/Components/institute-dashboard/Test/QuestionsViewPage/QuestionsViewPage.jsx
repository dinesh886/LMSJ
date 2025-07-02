import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaSearch, FaTrash } from "react-icons/fa";
import "./QuestionsViewPage.css";
import { FaArrowUp } from "react-icons/fa";  // Import the arrow icon
const QuestionsViewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();


  const testName = location.state?.testName || "Unknown Test"; 
  const { state } = useLocation();
  const { questions, active } = state;


  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)
  const [questionsToShow, setQuestionsToShow] = useState(10)

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => question.question.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [questions, searchQuery])

  const currentQuestions = showAll ? filteredQuestions : filteredQuestions.slice(0, questionsToShow)

  useEffect(() => {
    // Ensure we only scroll after the component has rendered
    if (active && active.id) {
      const targetElement = document.getElementById(`question-${active.id}`);
      if (targetElement) {
        // Scroll to the target question smoothly
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [active]);




  const handleBackClick = () => {
    navigate(`/test/${id}/movetest`);
  };

  const handleLoadMore = () => {
    setQuestionsToShow((prevCount) => prevCount + 10)
  }
  const handleFullView = () => {
    setShowAll(true)
    setQuestionsToShow(filteredQuestions.length)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setSelectedQuestions(isChecked ? filteredQuestions.map((q) => q.id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((questionId) => questionId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedQuestions.length > 0) {
      const remainingQuestions = questions.filter(
        (q) => !selectedQuestions.includes(q.id)
      );
      // Update the questions state (if required).
      alert("Bulk deleted selected questions.");
      setSelectedQuestions([]);
      setCheckAll(false);
    }
  };

  if (questions.length === 0) {
    return <div className="error-message">Error: No questions found!</div>;
  }



  return (
    <div className="question-view-page">
      <span className="breadcrumb"> test 1 All Questions</span>

      <div className="test-search-container mb-3">
        <input
          type="text"
          placeholder="Search Questions..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="test-search-input"
        />
        <FaSearch className="test-search-icon" />
      </div>
    
    
      {selectedQuestions.length > 1 && (
        <div className="bulk-actions">
           <button className="bulk-action-button bulk-delete-button" onClick={handleBulkDelete}>
                        <FaTrash className="bulk-icon" />
                        <span className="tooltip-text">Delete </span>
                      </button>
        </div>
      )}


      <div className="questions-list">
        {currentQuestions.map((question, index) => (
          <div key={question.id} id={`question-${question.id}`} className="question-item">

            {index === 0 && (
              <div className="first-question-checkbox">
                {/* <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={handleCheckAll}
                  className="checkbox-first-question"
               
                />
                <hr /> */}
              </div>

            )}
            
           
            <div className="question-checkbox">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question.id)}
                onChange={() => handleCheckboxChange(question.id)}
              />
            </div>

            <span className="question-number">
              {index + 1 + (currentPage - 1) * 10}.
            </span>
            <div className="question-details">
              <p>
                <strong>Question:</strong> {question.question}
              </p>
              <p>
                <strong>Type:</strong> {question.type}
              </p>
              <p>
                <strong>Marks:</strong> {question.marks}
              </p>
              <p>
                <strong>Owner:</strong> {question.owner}
              </p>
              {question.type === "mcq" && (
                <div>
                  <strong>Options:</strong>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p>
                <strong>Answer:</strong> {question.answer}
              </p>
            </div>
            <div className="question-actions">
              <button className="edit-button">
                <FaEdit />
                <span className="tooltip">Edit</span> {/* Tooltip for Edit */}
              </button>
              <button className="delete-button">
                <FaTrashAlt />
                <span className="tooltip">Delete</span> {/* Tooltip for Delete */}
              </button>
            </div>

          </div>
        ))}
      </div>


      <div className="pagination-controls">
        {!showAll && questionsToShow < filteredQuestions.length && (
          <button className="load-more-button2" onClick={handleLoadMore}>
            Load More
          </button>
        )}

        <button className="full-view-button" onClick={handleFullView}>
          Full View
        </button>


        {/* Scroll to Top Button */}
        {showScrollTopButton && (
          <button className="scroll-to-top" >
            <FaArrowUp />
            <span className="tooltip">Scroll to Top</span>
          </button>
        )}
      </div>

      <div className="pagination-info">
        Showing {Math.min(questionsToShow, filteredQuestions.length)} out of {filteredQuestions.length} Questions
      </div>
    </div>
  );
};

export default QuestionsViewPage;
