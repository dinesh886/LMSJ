import "./SectionwiseAnalysis.css"
import { BookOpen, Award, CheckCircle, XCircle } from "lucide-react"

const SectionwiseAnalysis = () => {
  // Sample data for section-wise analysis
  const sectionsData = [
    {
      id: 1,
      name: "Mathematics",
      percentage: 82,
      color: "#3b82f6", // Blue
      correct: 18,
      wrong: 5,
      rank: 15,
      totalStudents: 120,
    },
    {
      id: 2,
      name: "Science",
      percentage: 75,
      color: "#10b981", // Green
      correct: 15,
      wrong: 7,
      rank: 22,
      totalStudents: 120,
    },
    {
      id: 3,
      name: "English",
      percentage: 50,
      color: "#8b5cf6", // Purple
      correct: 27,
      wrong: 3,
      rank: 8,
      totalStudents: 120,
    },
    {
      id: 4,
      name: "History",
      percentage: 68,
      color: "#f59e0b", // Amber
      correct: 14,
      wrong: 6,
      rank: 35,
      totalStudents: 120,
    },
  ]

  // Function to calculate stroke dash offset for circular progress
  const calculateStrokeDashoffset = (percentage) => {
    const circumference = 2 * Math.PI * 18
    return circumference - (percentage / 100) * circumference
  }

  // Function to calculate Y position on the curve based on percentage
  const calculateCurveY = (percentage) => {
    if (percentage >= 90) return 12
    if (percentage >= 70) return 15
    if (percentage >= 50) return 18
    if (percentage >= 30) return 25
    return 35
  }

  return (
    <div className="SectionwiseAnalysis-container">
      <div className="SectionwiseAnalysis-card">
        <div className="SectionwiseAnalysis-header">
          <div className="SectionwiseAnalysis-title">
            <BookOpen size={20} />
            <h2>Sectionwise Analysis</h2>
          </div>
          {/* <div className="SectionwiseAnalysis-subtitle">Performance breakdown by subject</div> */}
        </div>

        <div className="SectionwiseAnalysis-content">
          {sectionsData.map((section, index) => (
            <div key={section.id} className="SectionwiseAnalysis-section">
              <div className="SectionwiseAnalysis-section-header">
                <div className="SectionwiseAnalysis-section-title">
                  <span className="SectionwiseAnalysis-section-name">{section.name}</span>
                  <div
                    className="SectionwiseAnalysis-section-indicator"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="5"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        fill="none"
                        stroke={section.color}
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={calculateStrokeDashoffset(section.percentage, 26)}
                        strokeLinecap="round"
                        transform="rotate(-90 30 30)"
                      />
                      <text
                        x="30"
                        y="30"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill={section.color}
                      >
                        {section.percentage}%
                      </text>
                    </svg>

                  </div>
                </div>
                <div className="SectionwiseAnalysis-section-score">{section.percentage}%</div>
              </div>

              <div className="SectionwiseAnalysis-section-details">
                <div className="SectionwiseAnalysis-graph-container">
                  <div className="SectionwiseAnalysis-graph">
                    <svg className="SectionwiseAnalysis-curve" viewBox="0 0 200 80" preserveAspectRatio="none">
                      {/* Distribution curve */}
                      <path
                        d="M 0,80 C 40,80 40,10 100,10 C 160,10 160,80 200,80"
                        fill="none"
                        stroke={section.color}
                        strokeWidth="2"
                      />

                      {/* Connecting line from marker to curve */}
                      <line
                        x1={section.percentage * 2}
                        y1={calculateCurveY(section.percentage)}
                        x2={section.percentage * 2}
                        y2="0"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        opacity="0.8"
                      />

                      {/* Red dot on curve */}
                      <circle
                        cx={section.percentage * 2}
                        cy={calculateCurveY(section.percentage)}
                        r="4"
                        fill="#ef4444"
                      />
                    </svg>
                    <div className="SectionwiseAnalysis-marker" style={{ left: `${section.percentage}%` }}>
                      You
                    </div>
                  </div>
                </div>

                <div className="SectionwiseAnalysis-stats">
                  <div className="SectionwiseAnalysis-stat-item">
                    <div className="SectionwiseAnalysis-stat-label">
                      <CheckCircle size={14} />
                      <span>Correct:</span>
                    </div>
                    <div className="SectionwiseAnalysis-stat-value correct">{section.correct}</div>
                  </div>
                  <div className="SectionwiseAnalysis-stat-item">
                    <div className="SectionwiseAnalysis-stat-label">
                      <XCircle size={14} />
                      <span>Wrong:</span>
                    </div>
                    <div className="SectionwiseAnalysis-stat-value wrong">{section.wrong}</div>
                  </div>
                  <div className="SectionwiseAnalysis-stat-item">
                    <div className="SectionwiseAnalysis-stat-label">
                      <Award size={14} />
                      <span>Rank:</span>
                    </div>
                    <div className="SectionwiseAnalysis-stat-value rank">{section.rank}</div>
                  </div>
                </div>
              </div>

              {index < sectionsData.length - 1 && <div className="SectionwiseAnalysis-divider"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionwiseAnalysis
