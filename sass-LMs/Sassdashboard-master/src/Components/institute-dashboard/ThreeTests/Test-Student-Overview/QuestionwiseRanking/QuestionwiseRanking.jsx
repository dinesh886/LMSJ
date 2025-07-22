"use client"

import { useState } from "react"
import "./QuestionwiseRanking.css"
import { Clock, CheckCircle, XCircle, HelpCircle, X, ScanSearch , ChevronLeft, ChevronRight, Eye } from "lucide-react"
import useBounceModal from "../../../../ReusableComponents/useBounceModal/useBounceModal" // Make s
const QuestionwiseRanking = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { modalRef, isBouncing } = useBounceModal(isModalOpen)
  // Sample question details for modal
  const questionDetails = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "Medium",
      question: "What is the value of x in the equation 2x + 5 = 15?",
      options: {
        A: "x = 3",
        B: "x = 5", // correct
        C: "x = 7",
        D: "x = 10",
        E: "x = 2",
      },
      correctAnswer: "B",
      userAnswer: "B",
      explanation: "To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10, then divide by 2: x = 5",
    },
    {
      id: 2,
      subject: "Mathematics",
      topic: "Geometry",
      difficulty: "Easy",
      question: "What is the area of a rectangle with length 8 cm and width 6 cm?",
      options: {
        A: "48 cm²", // correct
        B: "14 cm²",
        C: "28 cm²",
        D: "24 cm²",
        E: "32 cm²",
      },
      correctAnswer: "A",
      userAnswer: "A",
      explanation: "Area of rectangle = length × width = 8 × 6 = 48 cm²",
    },
    {
      id: 3,
      subject: "Science",
      topic: "Physics",
      difficulty: "Hard",
      question: "What is the acceleration due to gravity on Earth?",
      options: {
        A: "8.9 m/s²",
        B: "10.2 m/s²",
        C: "9.8 m/s²", // correct
        D: "11.1 m/s²",
        E: "9.2 m/s²",
      },
      correctAnswer: "C",
      userAnswer: "C",
      explanation: "The standard acceleration due to gravity on Earth is approximately 9.8 m/s²",
    },
    {
      id: 4,
      subject: "Science",
      topic: "Chemistry",
      difficulty: "Medium",
      question: "What is the chemical symbol for Gold?",
      options: {
        A: "Go",
        B: "Gd",
        C: "Gl",
        D: "Au", // correct
        E: "Ag",
      },
      correctAnswer: "D",
      userAnswer: "D",
      explanation: "Gold's chemical symbol is Au, derived from the Latin word 'aurum'",
    },
    {
      id: 5,
      subject: "English",
      topic: "Grammar",
      difficulty: "Easy",
      question: "Which of the following is a proper noun?",
      options: {
        A: "city",
        B: "book",
        C: "teacher",
        D: "student",
        E: "London", // correct
      },
      correctAnswer: "E",
      userAnswer: "A", // incorrect
      explanation: "London is a proper noun as it's the name of a specific place. Proper nouns are always capitalized.",
    },
  ]

  // Sample data for question-wise ranking
  const questionsData = [
    {
      id: 1,
      options: {
        A: { percentage: 6.5, selected: false },
        B: { percentage: 80, selected: true, correct: true },
        C: { percentage: 2, selected: false },
        D: { percentage: 10, selected: false },
        E: { percentage: 1, selected: false },
      },
      unsolved: 1.5,
      time: "1m30s",
      avgTime: "2m04s",
    },
    {
      id: 2,
      options: {
        A: { percentage: 65, selected: true, correct: true },
        B: { percentage: 15, selected: false },
        C: { percentage: 10, selected: false },
        D: { percentage: 5, selected: false },
        E: { percentage: 3, selected: false },
      },
      unsolved: 2,
      time: "2m15s",
      avgTime: "1m45s",
    },
    {
      id: 3,
      options: {
        A: { percentage: 10, selected: false },
        B: { percentage: 20, selected: false },
        C: { percentage: 45, selected: true, correct: true },
        D: { percentage: 15, selected: false },
        E: { percentage: 5, selected: false },
      },
      unsolved: 5,
      time: "3m00s",
      avgTime: "2m30s",
    },
    {
      id: 4,
      options: {
        A: { percentage: 5, selected: false },
        B: { percentage: 10, selected: false },
        C: { percentage: 15, selected: false },
        D: { percentage: 60, selected: true, correct: true },
        E: { percentage: 5, selected: false },
      },
      unsolved: 5,
      time: "1m45s",
      avgTime: "2m15s",
    },
    {
      id: 5,
      options: {
        A: { percentage: 20, selected: false },
        B: { percentage: 25, selected: false },
        C: { percentage: 30, selected: false },
        D: { percentage: 15, selected: false },
        E: { percentage: 8, selected: true, incorrect: true },
      },
      unsolved: 2,
      time: "4m30s",
      avgTime: "3m20s",
    },
  ]

  // Functions for modal
  const openModal = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToPrevious = () => {
    setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : questionsData.length - 1))
  }

  const goToNext = () => {
    setCurrentQuestionIndex((prev) => (prev < questionsData.length - 1 ? prev + 1 : 0))
  }

  const getCurrentQuestion = () => questionDetails[currentQuestionIndex]

  // Function to determine cell class based on percentage and selection
  const getCellClass = (option) => {
    let classes = "QuestionwiseRanking-cell"

    if (option.correct && option.selected) {
      classes += " QuestionwiseRanking-correct-selected"
    } else if (option.incorrect && option.selected) {
      classes += " QuestionwiseRanking-incorrect-selected"
    } else if (option.percentage >= 50) {
      classes += " QuestionwiseRanking-high-percentage"
    } else if (option.percentage >= 40) {
      classes += " QuestionwiseRanking-medium-percentage"
    }

    return classes
  }

  return (
    <div className="QuestionwiseRanking-container">
      <div className="QuestionwiseRanking-card">
        <div className="QuestionwiseRanking-header">
          <div className="QuestionwiseRanking-title">
            <HelpCircle size={20} />
            <h2>Question-wise Ranking</h2>
          </div>
          {/* <div className="QuestionwiseRanking-subtitle">Analysis of responses for each question</div> */}
        </div>

        <div className="QuestionwiseRanking-table-container">
          <table className="QuestionwiseRanking-table">
            <thead>
              <tr>
                <th className="QuestionwiseRanking-header-cell">Q.No</th>
                <th className="QuestionwiseRanking-header-cell">A</th>
                <th className="QuestionwiseRanking-header-cell">B</th>
                <th className="QuestionwiseRanking-header-cell">C</th>
                <th className="QuestionwiseRanking-header-cell">D</th>
                <th className="QuestionwiseRanking-header-cell">E</th>
                <th className="QuestionwiseRanking-header-cell">Unsolved</th>
                <th className="QuestionwiseRanking-header-cell">Time</th>
                <th className="QuestionwiseRanking-header-cell">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {questionsData.map((question) => (
                <tr
                  key={question.id}
                  className="QuestionwiseRanking-row QuestionwiseRanking-clickable-row"
                  onClick={() => openModal(question.id - 1)}
                >
                  <td className="QuestionwiseRanking-cell QuestionwiseRanking-question-number">{question.id}</td>

                  {/* Option A */}
                  <td className={getCellClass(question.options.A)}>
                    {question.options.A.selected && (
                      <div className="QuestionwiseRanking-indicator">
                        {question.options.A.correct ? (
                          <CheckCircle size={16} className="QuestionwiseRanking-check" />
                        ) : (
                          <XCircle size={16} className="QuestionwiseRanking-x" />
                        )}
                      </div>
                    )}
                    <span className="QuestionwiseRanking-percentage">{question.options.A.percentage}%</span>
                  </td>

                  {/* Option B */}
                  <td className={getCellClass(question.options.B)}>
                    {question.options.B.selected && (
                      <div className="QuestionwiseRanking-indicator">
                        {question.options.B.correct ? (
                          <CheckCircle size={16} className="QuestionwiseRanking-check" />
                        ) : (
                          <XCircle size={16} className="QuestionwiseRanking-x" />
                        )}
                      </div>
                    )}
                    <span className="QuestionwiseRanking-percentage">{question.options.B.percentage}%</span>
                  </td>

                  {/* Option C */}
                  <td className={getCellClass(question.options.C)}>
                    {question.options.C.selected && (
                      <div className="QuestionwiseRanking-indicator">
                        {question.options.C.correct ? (
                          <CheckCircle size={16} className="QuestionwiseRanking-check" />
                        ) : (
                          <XCircle size={16} className="QuestionwiseRanking-x" />
                        )}
                      </div>
                    )}
                    <span className="QuestionwiseRanking-percentage">{question.options.C.percentage}%</span>
                  </td>

                  {/* Option D */}
                  <td className={getCellClass(question.options.D)}>
                    {question.options.D.selected && (
                      <div className="QuestionwiseRanking-indicator">
                        {question.options.D.correct ? (
                          <CheckCircle size={16} className="QuestionwiseRanking-check" />
                        ) : (
                          <XCircle size={16} className="QuestionwiseRanking-x" />
                        )}
                      </div>
                    )}
                    <span className="QuestionwiseRanking-percentage">{question.options.D.percentage}%</span>
                  </td>

                  {/* Option E */}
                  <td className={getCellClass(question.options.E)}>
                    {question.options.E.selected && (
                      <div className="QuestionwiseRanking-indicator">
                        {question.options.E.correct ? (
                          <CheckCircle size={16} className="QuestionwiseRanking-check" />
                        ) : (
                          <XCircle size={16} className="QuestionwiseRanking-x" />
                        )}
                      </div>
                    )}
                    <span className="QuestionwiseRanking-percentage">{question.options.E.percentage}%</span>
                  </td>

                  {/* Unsolved */}
                  <td className="QuestionwiseRanking-cell">
                    <span className="QuestionwiseRanking-percentage">{question.unsolved}%</span>
                  </td>

                  {/* Time */}
                  <td className="QuestionwiseRanking-cell QuestionwiseRanking-user-time">
                    <span>{question.time}</span>
                  </td>

                  {/* Avg Time */}
                  <td className="QuestionwiseRanking-cell QuestionwiseRanking-time">
                    <Clock size={14} />
                    <span>{question.avgTime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="QuestionwiseRanking-legend">
          <div className="QuestionwiseRanking-legend-item">
            <div className="QuestionwiseRanking-legend-indicator correct">
              <CheckCircle size={14} />
            </div>
            <span>Your Correct Answer</span>
          </div>
          <div className="QuestionwiseRanking-legend-item">
            <div className="QuestionwiseRanking-legend-indicator incorrect">
              <XCircle size={14} />
            </div>
            <span>Your Incorrect Answer</span>
          </div>
          <div className="QuestionwiseRanking-legend-item">
            <div className="QuestionwiseRanking-legend-box high"></div>
            <span>Correct Answer</span>
          </div>
        </div>

        {/* Question Preview Modal */}
        {isModalOpen && (
          <div className="QuestionwiseRanking-modal-overlay" >
            <div
              ref={modalRef} className={`QuestionwiseRanking-modal mcq-modal-content ${isBouncing ? "bounce" : ""}`}
            >
              <div className="QuestionwiseRanking-modal-header">
                <div className="QuestionwiseRanking-modal-title">
                  <ScanSearch size={20} />
                 
                  <h3>Question {getCurrentQuestion().id} Preview</h3>
                </div>
                <button className="QuestionwiseRanking-modal-close" onClick={closeModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="QuestionwiseRanking-modal-content">
                {/* <div className="QuestionwiseRanking-question-info">
                  <div className="QuestionwiseRanking-question-meta">
                    <span className="QuestionwiseRanking-subject">{getCurrentQuestion().subject}</span>
                    <span className="QuestionwiseRanking-topic">{getCurrentQuestion().topic}</span>
                    <span className={`QuestionwiseRanking-difficulty ${getCurrentQuestion().difficulty.toLowerCase()}`}>
                      {getCurrentQuestion().difficulty}
                    </span>
                  </div>
                </div> */}

                <div className="QuestionwiseRanking-question-text">
                  <h4>Question:</h4>
                  <p>{getCurrentQuestion().question}</p>
                </div>

                <div className="QuestionwiseRanking-options-grid">
                  {Object.entries(getCurrentQuestion().options).map(([key, value]) => {
                    const isCorrect = key === getCurrentQuestion().correctAnswer
                    const isUserAnswer = key === getCurrentQuestion().userAnswer

                    return (
                      <div
                        key={key}
                        className={`QuestionwiseRanking-option ${isCorrect ? "correct" : ""} ${isUserAnswer ? "selected" : ""}`}
                      >
                        <span className="QuestionwiseRanking-option-label">{key}.</span>
                        <span className="QuestionwiseRanking-option-text">{value}</span>
                        {isCorrect && <CheckCircle size={16} className="QuestionwiseRanking-correct-icon" />}
                        {isUserAnswer && !isCorrect && (
                          <XCircle size={16} className="QuestionwiseRanking-incorrect-icon" />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="QuestionwiseRanking-explanation">
                  <h4>Explanation:</h4>
                  <p>{getCurrentQuestion().explanation}</p>
                </div>

                <div className="QuestionwiseRanking-answer-status">
                  <div
                    className={`QuestionwiseRanking-status ${getCurrentQuestion().userAnswer === getCurrentQuestion().correctAnswer ? "correct" : "incorrect"}`}
                  >
                    {getCurrentQuestion().userAnswer === getCurrentQuestion().correctAnswer ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Correct Answer</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        <span>Incorrect Answer</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="QuestionwiseRanking-modal-footer">
                <button className="QuestionwiseRanking-nav-button" onClick={goToPrevious}>
                  {/* <ChevronLeft size={16} /> */}
                  Previous
                </button>

                <span className="QuestionwiseRanking-question-counter">
                  {currentQuestionIndex + 1} of {questionsData.length}
                </span>

                <button className="QuestionwiseRanking-nav-button" onClick={goToNext}>
                  Next
                  {/* <ChevronRight size={16} /> */}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionwiseRanking
