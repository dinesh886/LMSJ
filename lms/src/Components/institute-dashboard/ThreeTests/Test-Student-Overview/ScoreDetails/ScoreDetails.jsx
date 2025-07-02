import React from 'react';
import './ScoreDetails.css';
import { Award, BarChart2, BarChart3, TrendingUp,CheckCircle, Clock, XCircle, Eye, BookOpen, ArrowUpWideNarrow, FileText, User, HelpCircle, Target, Users } from 'lucide-react';

const ScoreDetails = () => {
    const testData = {
        Score: 85,
        Rank: 10,
        timerDuration: '01:20:00',
        attempted: '30',
        wrong: '7',
        correct: 50,
        visited: 100,
        negative: -3,
        description: 'This test evaluates advanced JavaScript concepts including closures, prototypes, and async programming.',
        instructions: 'Please read each question carefully. You have 2.5 hours to complete the test. Good luck!',
        candidates: [
            {
                id: 1,
                name: 'Alice Johnson',
                email: 'alice@example.com',
                class: 'JavaScript 101',
                status: 'Enrolled'
            },
            {
                id: 2,
                name: 'Bob Smith',
                email: 'bob@example.com',
                class: 'Guest',
                status: 'Invited'
            },
            {
                id: 3,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
                class: 'Public',
                status: 'Pending'
            }
        ]
    };

    return (
        <div className="scoredetails-dashboard-container">
            <div className="scoredetails-card">
                <div className="scoredetails-card-header">
                    <TrendingUp size={20} />
                    <h2>Score Details</h2>
                    {/* <div className="scoredetails-header-actions">
                        <button className="scoredetails-action-button">
                            <FileText size={18} />
                            <span>Export</span>
                        </button>
                    </div> */}
                </div>

                <div className="scoredetails-summary">
                    <div className="scoredetails-summary-card scoredetails-primary">
                        <div className="scoredetails-content-row">
                            <div className="scoredetails-icon-container">
                                <BarChart2 size={24} />
                            </div>
                            <div className="scoredetails-content">
                                <p className="scoredetails-value">
                                    {testData.Score}<span className="scoredetails-unit"></span>
                                </p>
                            </div>
                        </div>
                        <h3>Score</h3>
                    </div>

                    <div className="scoredetails-summary-card scoredetails-secondary">
                        <div className="scoredetails-content-row">
                            <div className="scoredetails-icon-container">
                                <ArrowUpWideNarrow size={24} />
                            </div>
                            <div className="scoredetails-content">
                                <p className="scoredetails-value">
                                    {testData.Rank}<span className="scoredetails-unit"></span>
                                </p>
                            </div>
                        </div>
                        <h3>Rank</h3>
                    </div>
                </div>


                <div className="scoredetails-metrics-grid">
                    <div className="scoredetails-metric-card">
                        <div className="scoredetails-metric-icon scoredetails-attempted">
                            <Clock size={20} />
                        </div>
                        <div className="scoredetails-metric-content">

                            <span className="scoredetails-metric-value scoredetails-attempted">{testData.attempted}</span>
                            <span className="scoredetails-metric-label">Attempted</span>
                        </div>
                    </div>

                    <div className="scoredetails-metric-card">
                        <div className="scoredetails-metric-icon scoredetails-wrong">
                            <XCircle size={20} />
                        </div>
                        <div className="scoredetails-metric-content">
                            <span className="scoredetails-metric-value scoredetails-wrong">{testData.wrong}</span>
                            <span className="scoredetails-metric-label">Wrong</span>
                        </div>
                    </div>

                    <div className="scoredetails-metric-card">
                        <div className="scoredetails-metric-icon scoredetails-correct">
                            <CheckCircle size={20} />
                        </div>
                        <div className="scoredetails-metric-content">
                            <span className="scoredetails-metric-value scoredetails-correct">{testData.correct}</span>
                            <span className="scoredetails-metric-label">Correct</span>
                        </div>
                    </div>

                    <div className="scoredetails-metric-card">
                        <div className="scoredetails-metric-icon scoredetails-visited">
                            <Eye size={20} />
                        </div>
                        <div className="scoredetails-metric-content">
                            <span className="scoredetails-metric-value scoredetails-visited">{testData.visited}</span>
                            <span className="scoredetails-metric-label">Visited</span>
                        </div>
                    </div>

                    <div className="scoredetails-metric-card">
                        <div className="scoredetails-metric-icon scoredetails-negative">
                            <BookOpen size={20} />
                        </div>
                        <div className="scoredetails-metric-content">
                            <span className="scoredetails-metric-value scoredetails-negative">{testData.negative}</span>
                            <span className="scoredetails-metric-label">Negative</span>
                        </div>
                    </div>
                </div>

                {/* <div className="scoredetails-test-info">
                    <div className="scoredetails-info-section">
                        <h3><HelpCircle size={18} /> Test Description</h3>
                        <p>{testData.description}</p>
                    </div>
                    <div className="scoredetails-info-section">
                        <h3><Target size={18} /> Instructions</h3>
                        <p>{testData.instructions}</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ScoreDetails;