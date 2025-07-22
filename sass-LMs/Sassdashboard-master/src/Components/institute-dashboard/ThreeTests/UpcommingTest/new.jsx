import React, { useState, useEffect } from "react";
import "./UpcommingTest.css";

const UpcomingTest = ({ onViewDetails }) => {
  const testData = [
    {
      id: "01",
      title : "1",
      name: "Advanced Physics Exam",
      owner: "Prof. Albert Einstein",
      hoursAllotted: 4,
      candidates: 75,
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      questions: [
        { id: 1, type: "Multiple Choice", count: 20 },
        { id: 2, type: "Short Answer", count: 10 },
        { id: 3, type: "Essay", count: 2 },
      ],
    },
    {
      id: "02",
       title : "2",
      name: "Quantum Mechanics Exam",
      owner: "Dr. Richard Feynman",
      hoursAllotted: 3,
      candidates: 50,
      startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      questions: [
        { id: 1, type: "Multiple Choice", count: 15 },
        { id: 2, type: "Short Answer", count: 5 },
        { id: 3, type: "Essay", count: 3 },
      ],
    },
    {
      id: "03",
        title : "3",
      name: "Linear Algebra Exam",
      owner: "Dr. Katherine Johnson",
      hoursAllotted: 2,
      candidates: 60,
      startTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      questions: [
        { id: 1, type: "Multiple Choice", count: 25 },
        { id: 2, type: "Short Answer", count: 8 },
      ],
    },
  ];

  const [timeLeft, setTimeLeft] = useState({});
  const [showInnerTests, setShowInnerTests] = useState(false); // Control for inner tests
  const [expandedDetails, setExpandedDetails] = useState({}); // Control for test details

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = testData.reduce((acc, test) => {
        const difference = test.startTime - new Date();
        acc[test.id] = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
        };
        return acc;
      }, {});
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [testData]);

  const toggleDetails = (testId) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }));
  };

  return (
    <div className="upcoming-test-container">
     

      {/* Outer Test Card */}
      <div className="upcoming-test">
        <div className="upcoming-test-header">
           <p>Upcoming Tests {testData.name}</p>
          <h3>{testData[0].name}</h3>
          <div className="burger-menu">
            <button
              onClick={() => onViewDetails(testData[0].id)}
              className="action-btn modify"
            >
              View Details
            </button>
          </div>
        </div>
        <hr />
        <div className="test-info">
          <div className="info-group">
            <div className="detail-item">
              <span className="detail-label">Owner:</span>
              <span className="detail-value">{testData[0].owner}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Hours Allotted:</span>
              <span className="detail-value">{testData[0].hoursAllotted}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Candidates:</span>
              <span className="detail-value">{testData[0].candidates}</span>
            </div>
          </div>
          <div className="timer">
            <h4>Time to Start</h4>
            <div className="countdown">
              <span className="time-unit">{timeLeft[testData[0].id]?.hours || "00"}</span>:
              <span className="time-unit">{timeLeft[testData[0].id]?.minutes || "00"}</span>:
              <span className="time-unit">{timeLeft[testData[0].id]?.seconds || "00"}</span>
            </div>
          </div>
        </div>

        {/* Show More Button for Test 1 */}
        <button
          className="expand-btn"
          onClick={() => toggleDetails(testData[0].id)}
        >
          {expandedDetails[testData[0].id] ? "Hide Details" : "Show More"}
        </button>
        {expandedDetails[testData[0].id] && (
          <div className="questions-details">
            <h4>Question Details</h4>
            <ul>
              {testData[0].questions.map((question) => (
                <li key={question.id}>
                  <span className="question-type">{question.type}</span>:{" "}
                  <span className="question-count">{question.count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Inner Tests Toggle */}
        <div className="inner-tests">
          <button
            className="view-details-btn"
            onClick={() => setShowInnerTests((prev) => !prev)}
          >
            {showInnerTests ? "Hide Other Upcoming Tests" : "Show Other Upcoming Tests"}
          </button>
          {showInnerTests && (
            <div className="inner-tests-list">
              {testData.slice(1).map((test) => (
                <div key={test.id} className="inner-test">
                  <h4>{test.name}</h4>
                  <div className="test-info">
                    <div className="detail-item">
                      <span className="detail-label">Owner:</span>
                      <span className="detail-value">{test.owner}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Hours Allotted:</span>
                      <span className="detail-value">{test.hoursAllotted}</span>
                    </div>
                    <div className="timer">
                      <h5>Time to Start</h5>
                      <div className="countdown">
                        <span className="time-unit">{timeLeft[test.id]?.hours || "00"}</span>:
                        <span className="time-unit">{timeLeft[test.id]?.minutes || "00"}</span>:
                        <span className="time-unit">{timeLeft[test.id]?.seconds || "00"}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="expand-btn"
                    onClick={() => toggleDetails(test.id)}
                  >
                    {expandedDetails[test.id] ? "Hide Details" : "Show More"}
                  </button>
                  {expandedDetails[test.id] && (
                    <div className="questions-details">
                      <h5>Question Details</h5>
                      <ul>
                        {test.questions.map((question) => (
                          <li key={question.id}>
                            <span className="question-type">{question.type}</span>:{" "}
                            <span className="question-count">{question.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingTest;
