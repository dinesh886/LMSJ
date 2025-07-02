import "./RelativePerformance.css"
import { TrendingUp, Users, Target, Award, BarChart3 } from "lucide-react"

const RelativePerformance = () => {
    // Sample data for the performance distribution
    const performanceData = {
        userScore: 85,
        userPercentile: 78,
        totalStudents: 1250,
        averageScore: 72,
        userRank: 275,
        distributionData: [
            { range: "0-20", students: 45, percentage: 3.6 },
            { range: "21-40", students: 125, percentage: 10 },
            { range: "41-60", students: 285, percentage: 22.8 },
            { range: "61-80", students: 425, percentage: 34 },
            { range: "81-100", students: 370, percentage: 29.6 },
        ],
    }

    // Calculate user position for the curve
    const userPosition = (performanceData.userScore / 100) * 100

    return (
        <div className="relativeperformance-dashboard-container">
            <div className="relativeperformance-card">
                <div className="relativeperformance-card-header">
                    <div className="relativeperformance-header-content">
                        <BarChart3 size={20} />
                        <h2>Relative Performance</h2>
                      
                    </div>
                    {/* <div className="relativeperformance-header-stats">
                        <div className="relativeperformance-stat-item">
                            <Users size={18} />
                            <span>{performanceData.totalStudents.toLocaleString()} Students</span>
                        </div>
                    </div> */}
                </div>

                {/* <div className="relativeperformance-overview">
                    <div className="relativeperformance-overview-card relativeperformance-primary">
                        <div className="relativeperformance-icon-wrapper">
                            <Target size={24} />
                        </div>
                        <div className="relativeperformance-content">
                            <h3>Your Score</h3>
                            <p className="relativeperformance-value">{performanceData.userScore}</p>
                            <span className="relativeperformance-label">out of 100</span>
                        </div>
                    </div>

                    <div className="relativeperformance-overview-card relativeperformance-secondary">
                        <div className="relativeperformance-icon-wrapper">
                            <TrendingUp size={24} />
                        </div>
                        <div className="relativeperformance-content">
                            <h3>Percentile</h3>
                            <p className="relativeperformance-value">{performanceData.userPercentile}th</p>
                            <span className="relativeperformance-label">Better than {performanceData.userPercentile}% students</span>
                        </div>
                    </div>

                    <div className="relativeperformance-overview-card relativeperformance-tertiary">
                        <div className="relativeperformance-icon-wrapper">
                            <Award size={24} />
                        </div>
                        <div className="relativeperformance-content">
                            <h3>Your Rank</h3>
                            <p className="relativeperformance-value">#{performanceData.userRank}</p>
                            <span className="relativeperformance-label">out of {performanceData.totalStudents.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="relativeperformance-overview-card relativeperformance-quaternary">
                        <div className="relativeperformance-icon-wrapper">
                            <BarChart3 size={24} />
                        </div>
                        <div className="relativeperformance-content">
                            <h3>Average Score</h3>
                            <p className="relativeperformance-value">{performanceData.averageScore}</p>
                            <span className="relativeperformance-label">Class average</span>
                        </div>
                    </div>
                </div> */}

                <div className="relativeperformance-chart-section">
                    {/* <h3>Score Distribution</h3> */}
                    <div className="relativeperformance-chart-container">
                        <div className="relativeperformance-chart-wrapper">
                            <div className="relativeperformance-y-axis">
                                <span className="relativeperformance-axis-label">Number of Students</span>
                                <div className="relativeperformance-y-ticks">
                                    <span>500</span>
                                    <span>400</span>
                                    <span>300</span>
                                    <span>200</span>
                                    <span>100</span>
                                    <span>0</span>
                                </div>
                            </div>

                            <div className="relativeperformance-chart-area">
                                <svg className="relativeperformance-distribution-curve" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>

                                    {/* Distribution curve */}
                                    <path
                                        d="M 20 180 Q 50 160 80 140 Q 120 100 160 80 Q 200 60 240 80 Q 280 100 320 140 Q 350 160 380 180"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        className="relativeperformance-curve-line"
                                    />

                                    {/* Area under curve */}
                                    <path
                                        d="M 20 180 Q 50 160 80 140 Q 120 100 160 80 Q 200 60 240 80 Q 280 100 320 140 Q 350 160 380 180 L 380 200 L 20 200 Z"
                                        fill="url(#curveGradient)"
                                    />

                                    {/* User position marker */}
                                    <circle cx={userPosition * 3.4 + 60} cy="85" r="6" fill="#ef4444" className="relativeperformance-user-marker" />

                                    {/* User position line */}
                                    <line
                                        x1={userPosition * 3.4 + 60}
                                        y1="85"
                                        x2={userPosition * 3.4 + 60}
                                        y2="200"
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        className="relativeperformance-user-line"
                                    />
                                </svg>

                                {/* User label */}
                                <div
                                    className="relativeperformance-user-label"
                                    style={{
                                        // The 'left' CSS style controls how far from the left the label "You" appears.

                                        // 'userPosition' is a value from 0 to 100, representing the user's score as a percentage.
                                        // For example, if userScore = 85, then userPosition = 85.

                                        // 'userPosition * 0.85':
                                        // This scales the user position to 85% of the total width.
                                        // Why scale? Because the chart may have left and right padding,
                                        // so we don't want the label to go all the way to the edge.

                                        // '+ 15':
                                        // This adds an extra 15% offset from the left to align the chart's starting point.
                                        // It ensures the label doesn’t start too far left and stays within visual bounds.

                                        // Final value is expressed in percentage ("%"), positioning the label along the chart width.

                                        // Example:
                                        // If userScore = 85, then:
                                        //   userPosition = 85
                                        //   left = 85 * 0.85 + 15 = 72.25 + 15 = 87.25%
                                        //   So the label appears 87.25% from the left edge of the chart container.
                                        left: `${userPosition * 0.85 + 15}%`
                                    }}
                                >
                                    You {/* This is the label that marks the user's position on the performance curve */}
                                </div>


                                <div className="relativeperformance-x-axis">
                                    <span className="relativeperformance-axis-label">Score Range</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="relativeperformance-distribution-breakdown">
                    <h3>Score Range Breakdown</h3>
                    <div className="relativeperformance-breakdown-grid">
                        {performanceData.distributionData.map((item, index) => (
                            <div key={index} className="relativeperformance-breakdown-item">
                                <div className="relativeperformance-range-header">
                                    <span className="relativeperformance-range">{item.range}</span>
                                    <span className="relativeperformance-percentage">{item.percentage}%</span>
                                </div>
                                <div className="relativeperformance-students-count">{item.students} students</div>
                                <div className="relativeperformance-progress-bar">
                                    <div className="relativeperformance-progress" style={{ width: `${item.percentage * 2.5}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default RelativePerformance