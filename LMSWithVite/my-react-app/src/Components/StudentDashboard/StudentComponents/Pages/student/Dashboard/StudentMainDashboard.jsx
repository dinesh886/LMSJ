import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentMainDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiSettings } from "react-icons/fi"; // Import settings icon
const StudentDashboard = () => {
    const navigate = useNavigate();
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('past');
    const [pastTests, setPastTests] = useState([
        {
            id: 'hist303',
            name: 'World History',
            owner: 'Prof. Davis',
            date: '2023-05-20',
            score: 85,
            totalScore: 100,
            status: 'completed',
            subject: 'History',
            topics: ['Ancient Civilizations', 'World Wars', 'Modern History'],
            strengths: ['Ancient Civilizations', 'Modern History'],
            weaknesses: ['World Wars']
        },
        {
            id: 'eng404',
            name: 'Literature Exam',
            owner: 'Dr. Wilson',
            date: '2023-05-15',
            score: 92,
            totalScore: 100,
            status: 'completed',
            subject: 'English',
            topics: ['Poetry', 'Prose', 'Drama'],
            strengths: ['Poetry', 'Drama'],
            weaknesses: ['Prose']
        },
        {
            id: 'math101',
            name: 'Algebra Midterm',
            owner: 'Prof. Smith',
            date: '2023-04-10',
            score: 78,
            totalScore: 100,
            status: 'completed',
            subject: 'Mathematics',
            topics: ['Equations', 'Functions', 'Matrices'],
            strengths: ['Equations'],
            weaknesses: ['Functions', 'Matrices']
        },
        {
            id: 'sci202',
            name: 'Chemistry Quiz',
            owner: 'Dr. Johnson',
            date: '2023-03-25',
            score: 88,
            totalScore: 100,
            status: 'completed',
            subject: 'Science',
            topics: ['Periodic Table', 'Chemical Reactions', 'Organic Chemistry'],
            strengths: ['Periodic Table', 'Chemical Reactions'],
            weaknesses: ['Organic Chemistry']
        }
    ]);

    const [selectedTest, setSelectedTest] = useState(null);
    const [performanceData, setPerformanceData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        scores: [75, 82, 88, 78, 92]
    });

    const handleViewDetails = (test) => {
        setSelectedTest(test);
    };

    const calculateAverageScore = () => {
        const sum = pastTests.reduce((total, test) => total + test.score, 0);
        return (sum / pastTests.length).toFixed(1);
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'average';
        return 'needs-improvement';
    };

    return (
        <div className="student-dashboard">
            <div className="container-fluid py-4">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="dashboard-header-container">
                            {/* Dashboard Header */}
                            <div className="dashboard-header">
                                <div className="header-left">
                                    <h1>Your Test Performance</h1>
                                    <p>Track your academic progress and identify areas for improvement</p>
                                </div>

                                {/* Settings Dropdown */}
                                <div className="header-right">
                                    <button
                                        className="settings-button"
                                        onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                                    >
                                        <FiSettings className="settings-icon" />
                                    </button>

                                    {isSettingsExpanded && (
                                        <div className="settings-dropdown">
                                            <a href="/profile" className="dropdown-item">My Profile</a>
                                            <a href="/account" className="dropdown-item">Account Settings</a>
                                            <a href="/dashboard" className="dropdown-item">Dashboard</a>
                                            <a href="/courses" className="dropdown-item">My Courses</a>
                                            <a href="/grades" className="dropdown-item">Grades & Certificates</a>
                                            <div className="divider2"></div>
                                            <a href="/help" className="dropdown-item">Help Center</a>
                                            <a href="/logout" className="dropdown-item logout">Logout</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="stats-card">
                            <div className="stats-icon tests-icon">
                                <i className="bi bi-journal-check"></i>
                            </div>
                            <div className="stats-info">
                                <h3>{pastTests.length}</h3>
                                <p>Tests Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-card">
                            <div className="stats-icon average-icon">
                                <i className="bi bi-graph-up"></i>
                            </div>
                            <div className="stats-info">
                                <h3>{calculateAverageScore()}%</h3>
                                <p>Average Score</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-card">
                            <div className="stats-icon best-icon">
                                <i className="bi bi-trophy"></i>
                            </div>
                            <div className="stats-info">
                                <h3>{Math.max(...pastTests.map(test => test.score))}%</h3>
                                <p>Best Score</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-card">
                            <div className="stats-icon subjects-icon">
                                <i className="bi bi-book"></i>
                            </div>
                            <div className="stats-info">
                                <h3>{new Set(pastTests.map(test => test.subject)).size}</h3>
                                <p>Subjects</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-white">
                                <h5 className="card-title mb-0">Past Test Results</h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Test Name</th>
                                                <th>Subject</th>
                                                <th>Date</th>
                                                <th>Score</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pastTests.map((test) => (
                                                <tr key={test.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="subject-icon me-2" data-subject={test.subject.toLowerCase()}>
                                                                {test.subject.charAt(0)}
                                                            </div>
                                                            <span>{test.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>{test.subject}</td>
                                                    <td>{test.date}</td>
                                                    <td>
                                                        <div className="score-wrapper">
                                                            <div className={`score-badge ${getScoreColor(test.score)}`}>
                                                                {test.score}%
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleViewDetails(test)}
                                                        >
                                                             Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="card-title mb-0">Performance Trend</h5>
                            </div>
                            <div className="card-body">
                                <div className="performance-chart">
                                    <div className="chart-bars">
                                        {performanceData.scores.map((score, index) => (
                                            <div className="chart-bar-wrapper" key={index}>
                                                <div
                                                    className={`chart-bar ${getScoreColor(score)}`}
                                                    style={{ height: `${score}%` }}
                                                    title={`${performanceData.labels[index]}: ${score}%`}
                                                >
                                                    <span className="score-label">{score}%</span>
                                                </div>
                                                <div className="month-label">{performanceData.labels[index]}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {selectedTest ? (
                            <div className="card shadow-sm mb-4">
                                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Test Details</h5>
                                    <button
                                        className="btn btn-sm btn-link text-muted"
                                        onClick={() => setSelectedTest(null)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="test-detail-header">
                                        <div className={`large-subject-icon ${selectedTest.subject.toLowerCase()}`}>
                                            {selectedTest.subject.charAt(0)}
                                        </div>
                                        <div className="test-info">
                                            <h4>{selectedTest.name}</h4>
                                            <p className="text-muted">{selectedTest.owner} • {selectedTest.date}</p>
                                        </div>
                                    </div>

                                    <div className="score-circle-container">
                                        <div className={`score-circle ${getScoreColor(selectedTest.score)}`}>
                                            <div className="score-value">{selectedTest.score}</div>
                                            <div className="score-max">/{selectedTest.totalScore}</div>
                                        </div>
                                    </div>

                                    <div className="topics-section mt-4">
                                        <h6>Topics Covered</h6>
                                        <div className="topics-list">
                                            {selectedTest.topics.map((topic, index) => (
                                                <span className="topic-badge" key={index}>{topic}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="strengths-section mt-4">
                                        <h6>Strengths</h6>
                                        <ul className="strength-list">
                                            {selectedTest.strengths.map((strength, index) => (
                                                <li key={index} className="strength-item">
                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                    {strength}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="weaknesses-section mt-4">
                                        <h6>Areas for Improvement</h6>
                                        <ul className="weakness-list">
                                            {selectedTest.weaknesses.map((weakness, index) => (
                                                <li key={index} className="weakness-item">
                                                    <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                                                    {weakness}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4">
                                        <button className="btn btn-primary w-100">View Full Report</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card shadow-sm mb-4">
                                <div className="card-header bg-white">
                                    <h5 className="card-title mb-0">Performance Summary</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <div className="empty-state">
                                            <i className="bi bi-bar-chart-line"></i>
                                            <p>Select a test to view detailed performance</p>
                                        </div>
                                    </div>

                                    <div className="subject-performance">
                                        <h6>Subject Performance</h6>
                                        <div className="subject-bars">
                                            <div className="subject-bar-item">
                                                <div className="subject-label">Mathematics</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-primary" style={{ width: '78%' }} role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">78%</div>
                                                </div>
                                            </div>
                                            <div className="subject-bar-item">
                                                <div className="subject-label">Science</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" style={{ width: '88%' }} role="progressbar" aria-valuenow="88" aria-valuemin="0" aria-valuemax="100">88%</div>
                                                </div>
                                            </div>
                                            <div className="subject-bar-item">
                                                <div className="subject-label">English</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-info" style={{ width: '92%' }} role="progressbar" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100">92%</div>
                                                </div>
                                            </div>
                                            <div className="subject-bar-item">
                                                <div className="subject-label">History</div>
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning" style={{ width: '85%' }} role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">85%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="card shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="card-title mb-0">Recommendations</h5>
                            </div>
                            <div className="card-body">
                                <div className="recommendation-item">
                                    <div className="recommendation-icon">
                                        <i className="bi bi-lightbulb-fill"></i>
                                    </div>
                                    <div className="recommendation-content">
                                        <h6>Practice World Wars Topics</h6>
                                        <p>Based on your History exam performance</p>
                                    </div>
                                </div>

                                <div className="recommendation-item">
                                    <div className="recommendation-icon">
                                        <i className="bi bi-lightbulb-fill"></i>
                                    </div>
                                    <div className="recommendation-content">
                                        <h6>Review Functions & Matrices</h6>
                                        <p>Based on your Algebra Midterm results</p>
                                    </div>
                                </div>

                                <div className="recommendation-item">
                                    <div className="recommendation-icon">
                                        <i className="bi bi-lightbulb-fill"></i>
                                    </div>
                                    <div className="recommendation-content">
                                        <h6>Study Organic Chemistry</h6>
                                        <p>This was identified as an area for improvement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
