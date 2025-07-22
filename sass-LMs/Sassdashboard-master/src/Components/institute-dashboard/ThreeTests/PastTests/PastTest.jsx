import React, { useState } from 'react';
import './PastTest.css';

const PastTest = () => {
  const pastTestData = [
    {
      id: "01",
      title : "1",
      name: "Advanced Biology Exam",
      time: new Date("2023-05-15T14:00:00"),
      owner: "Dr. Jane Foster",
      totalPresent: 68,
      totalRegistered: 75,
      hoursConsumed: 3.5,
      details: [
        { id: 1, label: "Average Score", value: "78%" },
        { id: 2, label: "Highest Score", value: "98%" },
        { id: 3, label: "Lowest Score", value: "52%" },
        { id: 4, label: "Pass Rate", value: "85%" },
      ],
      questions: [
        { id: 1, question: "What is the powerhouse of the cell?" },
        { id: 2, question: "What is the chemical formula of water?" },
        { id: 3, question: "Who proposed the theory of evolution?" },
      ],
      attendingStudents: [
        { email: "student1@example.com", joinTime: "09:00 AM" },
        { email: "student2@example.com", joinTime: "09:05 AM" },
        { email: "student3@example.com", joinTime: "09:15 AM" },
      ]
    },
    {
      id: "02",
      title : "2",
      name: "Physics Test",
      time: new Date("2023-06-12T10:00:00"),
      owner: "Prof. John Doe",
      totalPresent: 50,
      totalRegistered: 60,
      hoursConsumed: 2.5,
      details: [
        { id: 1, label: "Average Score", value: "82%" },
        { id: 2, label: "Highest Score", value: "95%" },
        { id: 3, label: "Lowest Score", value: "60%" },
        { id: 4, label: "Pass Rate", value: "90%" },
      ],
      questions: [
        { id: 1, question: "What is Newton's second law of motion?" },
        { id: 2, question: "What is the formula for kinetic energy?" },
      ],
      attendingStudents: [
        { email: "student4@example.com", joinTime: "09:30 AM" },
        { email: "student5@example.com", joinTime: "09:35 AM" },
      ]
    },
    // Add more past tests here...
  ];

  const [expandedDetails, setExpandedDetails] = useState({});
  const [showOtherTests, setShowOtherTests] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const toggleExpand = (testId) => {
    setExpandedDetails(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const toggleShowOtherTests = () => {
    setShowOtherTests(!showOtherTests);
  };

  return (
    <div className="past-test-container">
      {/* Show the first test by default */}
      {pastTestData.slice(0, 1).map((test) => (
        <div key={test.id} className="past-test">
          <div className="past-test-header">
            <p>Past Test {test.title}</p>
           
            <h2>{test.name}</h2>
             <button className="view-details-btn">
              View Details
            </button>
            <span className="test-time">{formatDate(test.time)}</span>
          </div>

          <div className="test-info">
            <div className="details-grid">
               <div className="detail-item">
                <span className="detail-label">Test Name</span>
                <span className="detail-value">{test.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Owner</span>
                <span className="detail-value">{test.owner}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Attendance</span>
                <span className="detail-value">{test.totalPresent} / {test.totalRegistered}</span>
              </div>
              
            

            <div className="detail-item">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{test.hoursConsumed} hours</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Hourse Consumed</span>
              <span className="detail-value">{Math.round((test.hoursConsumed / test.totalRegistered) * 100)}%</span>
            </div>
          </div>
          </div>

          {/* Show the questions and attending students table only when expanded */}
          {expandedDetails[test.id] && (
            <>
              <div className="expanded-content">
                <div className="questions-section">
                  <h3>Test Questions</h3>
                  <ul>
                    {test.questions.map((question) => (
                      <li key={question.id}>{question.question}</li>
                    ))}
                  </ul>
                </div>

                <div className="students-section">
                  <h3>Attending Students</h3>
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Join Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.attendingStudents.map((student, index) => (
                        <tr key={index}>
                          <td>{student.email}</td>
                          <td>{student.joinTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="test-details">
                  <h3>Test Statistics</h3>
                  <div className="details-grid">
                    {test.details.map(detail => (
                      <div key={detail.id} className="detail-item">
                        <span className="detail-label">{detail.label}</span>
                        <span className="detail-value">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Button to toggle the expanded state */}
          <button className="expand-btn" onClick={() => toggleExpand(test.id)}>
            {expandedDetails[test.id] ? 'Show Less' : 'Show More'}
            <span className={`arrow ${expandedDetails[test.id] ? 'up' : 'down'}`}></span>
          </button>

         

          {/* Show other past tests if "Show Other Past Tests" is clicked */}
          {showOtherTests &&
            pastTestData.slice(1).map((test) => (
              <div key={test.id} className="past-test past-test-card-body">
                <div className="past-test-header">
                  <p>Past Test {test.title}</p>
                  <h2>{test.name}</h2>
                    <button className="view-details-btn">
              View Details
            </button>
                  <span className="test-time">{formatDate(test.time)}</span>
                </div>

                <div className="test-info">
                  <div className="details-grid">
                     <div className="detail-item">
                      <span className="detail-label">Test Name</span>
                      <span className="detail-value">{test.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Owner</span>
                      <span className="detail-value">{test.owner}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Attendance</span>
                      <span className="detail-value">{test.totalPresent} / {test.totalRegistered}</span>
                    </div>
                    
                  <div className="detail-item">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">{test.hoursConsumed} hours</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Hourse Consumed</span>
                    <span className="detail-value">{Math.round((test.hoursConsumed / test.totalRegistered) * 100)}%</span>
                  </div>
                </div>
                </div>

                {/* Show the questions and attending students table only when expanded */}
                {expandedDetails[test.id] && (
                  <>
                    <div className="expanded-content">
                      <div className="questions-section">
                        <h3>Test Questions</h3>
                        <ul>
                          {test.questions.map((question) => (
                            <li key={question.id}>{question.question}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="students-section">
                        <h3>Attending Students</h3>
                        <table className="students-table">
                          <thead>
                            <tr>
                              <th>Email</th>
                              <th>Join Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {test.attendingStudents.map((student, index) => (
                              <tr key={index}>
                                <td>{student.email}</td>
                                <td>{student.joinTime}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="test-details">
                        <h3>Test Statistics</h3>
                        <div className="details-grid">
                          {test.details.map(detail => (
                            <div key={detail.id} className="detail-item">
                              <span className="detail-label">{detail.label}</span>
                              <span className="detail-value">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Button to toggle the expanded state */}
                <button className="expand-btn" onClick={() => toggleExpand(test.id)}>
                  {expandedDetails[test.id] ? 'Show Less' : 'Show More'}
                  <span className={`arrow ${expandedDetails[test.id] ? 'up' : 'down'}`}></span>
                </button>
              </div>
              

            ))}
            {/* Button to show the other past tests */}
          <button className="view-details-btn mb-3 d-flex" onClick={toggleShowOtherTests}>
            {showOtherTests ? "Show Less Other Past Tests" : "Show Other Past Tests"}
          </button>
        </div>
        
      ))}
       
    </div>
  );
};

export default PastTest;
