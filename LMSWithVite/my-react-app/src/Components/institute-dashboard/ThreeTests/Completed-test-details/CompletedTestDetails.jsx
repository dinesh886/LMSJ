"use client"

import { useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import {
  Clock,
  Users,
  FileText,
  User,
  HelpCircle,
  Target,
  BookOpen,
  Users2,
  ChevronDown,
  ChevronUp,
  BarChart2,
  FileCheck2,
} from "lucide-react"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import { toast } from "react-toastify"
import Header from "../../../header/header"
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo"
import { Helmet } from "react-helmet";

const CompletedTestDetails = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [expandedSection, setExpandedSection] = useState(null)
  const [hoveredScoreKey, setHoveredScoreKey] = useState(null)

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [fullViewMode, setFullViewMode] = useState(false)
  const [showButtons, setShowButtons] = useState(true)
  const [showFullViewButton, setShowFullViewButton] = useState(true)
  const [allRowsExpanded, setAllRowsExpanded] = useState(false)
  const [expandedRows, setExpandedRows] = useState([])

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const searchPlaceholder = "Search students...";
  // Get testId from URL params
  const testId = params.testId || "123" // Default value for demo

  // Sample data for completed test
  const testData = {
    id: testId, // Now using the testId from URL params
    hoursConsumed: "24/100",
    candidatesAttended: 150,
    completionTime: "02:00:00",
    name: "Advanced Mathematics",
    owner: "Dr. Jane Smith",
    questions: 50,
    marks: 100,
    sections: 7,
    description: "This was a test for advanced mathematics topics.",
    instructions: "Students were instructed to follow on-screen instructions during the test.",
    averageScore: 78.5,
    passPercentage: 85.0,
  }

  // Sample candidates data for completed test
  const sampleCandidates = [
    {
      id: 1,
      name: "student1",
      email: "student1@example.com",
      class: "Enrolled 10-A",
      rank: 1,
      a: 45,
      c: 40,
      w: 2,
      gs: 88,
      ns: 85,
      joinTime: "5",
      leaveTime: "3",
      status: "submited",
      percentage: 92.5,
    },
    {
      id: 2,
      name: "student2",
      email: "student2@example.com",
      class: "Invited",
      rank: 2,
      a: 42,
      c: 38,
      w: 3,
      gs: 85,
      ns: 80,
      joinTime: "2",
      leaveTime: "3",
      status: "submited",
      percentage: 87.5,
    },
    {
      id: 3,
      name: "student3",
      email: "student3@example.com",
      class: "Enrolled 10-B",
      rank: 3,
      a: 30,
      c: 25,
      w: 4,
      gs: 70,
      ns: 65,
      joinTime: "2",
      leaveTime: "2",
      status: "submited",
      percentage: 72.5,
    },
    {
      id: 4,
      name: "student4",
      email: "student4@example.com",
      class: "Guest",
      rank: 4,
      a: 48,
      c: 44,
      w: 1,
      gs: 90,
      ns: 88,
      joinTime: "3",
      leaveTime: "5",
      status: "submited",
      percentage: 95.0,
    },
    {
      id: 5,
      name: "student5",
      email: "student4@example.com",
      class: "Guest",
      rank: 4,
      a: 48,
      c: 44,
      w: 1,
      gs: 90,
      ns: 88,
      joinTime: "3",
      leaveTime: "5",
      status: "submited",
      percentage: 95.0,
    },
  ]

  // Filter candidates based on search query
  const filteredCandidates = sampleCandidates.filter(candidate => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.class.toLowerCase().includes(searchLower) ||
      candidate.status.toLowerCase().includes(searchLower) ||
      candidate.rank.toString().includes(searchQuery)
    );
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const viewStudentTestOverview = (testId, studentId) => {
    navigate(`/maindashboard/completed-test-details/${testId}/teststudent-overview/${studentId}`)
  }

  const handleRowClick = (row) => {
    if (row?.id && testData.id) {
      viewStudentTestOverview(testData.id, row.id)
    } else {
      const errorMessage = "Invalid test or student ID"
      console.error(errorMessage, { testId: testData.id, studentId: row?.id })
      toast.error(errorMessage)
    }
  }

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5
    setRowsPerPage(newRows)

    if (newRows >= filteredCandidates.length) {
      setShowButtons(false)
    }
  }

  // Full view toggle (enhanced from TestIndex)
  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredCandidates.length);
    } else {
      setRowsPerPage(5);
    }
    setFullViewMode(!fullViewMode);
  };


  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <span>{row.name || "N/A"}</span>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => <span>{row.email || "N/A"}</span>,
    },
    {
      name: "Class",
      selector: "class",
      sortable: true,
      cell: (row) => <span>{row.class || "N/A"}</span>,
    },
    {
      name: (
        <div className="grouped-header">
          <div className="main-header">A-C-W-GS-NS</div>
          <div className="sub-headers allrankheader">
            {["a", "c", "w", "gs", "ns"].map((key, i) => (
              <span
                key={key}
                data-key={key}
                onMouseEnter={() => setHoveredScoreKey(key)}
                onMouseLeave={() => setHoveredScoreKey(null)}
                className={`sub-header-item ${hoveredScoreKey === key ? "highlight" : ""}`}
              >
                {["A", "C", "W", "GS", "NS"][i]}
              </span>
            ))}
          </div>
        </div>
      ),
      cell: (row) => (
        <div className="score-grid">
          {["a", "c", "w", "gs", "ns"].map((key) => (
            <div
              key={key}
              className={`score-cell ${hoveredScoreKey === key ? "highlight" : ""}`}
              onMouseEnter={() => setHoveredScoreKey(key)}
              onMouseLeave={() => setHoveredScoreKey(null)}
              title={
                {
                  a: "Attempts",
                  c: "Correct",
                  w: "Wrong",
                  gs: "Gross Score",
                  ns: "Net Score",
                }[key]
              }
            >
              {row[key] || 0}
            </div>
          ))}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Rank",
      selector: "rank",
      sortable: true,
      cell: (row) => <span className="status-rank">{row.rank || "N/A"}</span>,
    },
    {
      name: (
        <div className="grouped-header">
          <div className="main-header main-header2">Exam Status</div>
          <div className="sub-headers status-headers">
            <span>IN</span>
            <span>OUT</span>
          </div>
        </div>
      ),
      cell: (row) => (
        <div className="status-grid">
          <span className="status-time">{row.joinTime || "--"}</span>
          <span className="status-time">{row.leaveTime || "--"}</span>
        </div>
      ),
      sortable: false,
    },
    {
      name: "Status",
      selector: "status",
      cell: (row) => <span className={`status ${row.status?.toLowerCase() || "na"}`}>{row.status || "N/A"}</span>,
      sortable: true,
    },
  ]

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredCandidates;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCandidates.slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <>
      <Helmet>
        <title>Completed Tests Details</title>
        <meta name="description" content="Scheduld Test - Completed Tests Details" />
      </Helmet>
      <Header />
      <div className="test-details-container">
       <div className="top-cards-container completed-top-card ">
                 <div className="top-card">
                   <div className="card-icon">
                     <Clock size={24} />
                   </div>
                   <div className="card-content">
                     <h3>Hours Consumed</h3>
                     <p>{testData.hoursConsumed}</p>
                   </div>
                 </div>
                 <div className="top-card">
                   <div className="card-icon">
                     <Users size={24} />
                   </div>
                   <div className="card-content">
                     <h3>Candidates Attended</h3>
                     <p>{testData.candidatesAttended}</p>
                   </div>
                 </div>
                 {/* <div className="top-card">
                   <div className="card-icon">
                     <FileCheck2 size={24} />
                   </div>
                   <div className="card-content">
                     <h3>Average Score</h3>
                     <p>{testData.averageScore}%</p>
                   </div>
                 </div> */}
               </div>

       <div className="main-card">
                <h2>Test Details</h2>
                <div className="test2-info">
                  <div className="info-item">
                    <div className="info-icon">
                      <FileText size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Test Name:</strong>
                      <span>{testData.name}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <User size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Owner:</strong>
                      <span>{testData.owner}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <HelpCircle size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Questions:</strong>
                      <span>{testData.questions}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <Target size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Marks:</strong>
                      <span>{testData.marks}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <BookOpen size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Sections:</strong>
                      <span>{testData.sections}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FileText size={20} />
                    </div>
                    <div className="info-content">
                      <strong>View Question Paper:</strong>
                      <span>{testData.owner}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <Users2 size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Class/Batch:</strong>
                      <span>Class 10</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <Target size={20} />
                    </div>
                    <div className="info-content">
                      <strong>Marks:</strong>
                      <span>{testData.marks}</span>
                    </div>
                  </div>
                </div>
      
                <div className="accordion">
                  <div className="accordion-item">
                    <button
                      className={`accordion-header ${expandedSection === "description" ? "active" : ""}`}
                      onClick={() => toggleSection("description")}
                    >
                      Description
                      <span className="accordion-icon">
                        {expandedSection === "description" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {expandedSection === "description" && (
                      <div className="accordion-content">
                        <p>{testData.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="accordion-item">
                    <button
                      className={`accordion-header ${expandedSection === "instructions" ? "active" : ""}`}
                      onClick={() => toggleSection("instructions")}
                    >
                      Instructions
                      <span className="accordion-icon">
                        {expandedSection === "instructions" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {expandedSection === "instructions" && (
                      <div className="accordion-content">
                        <p>{testData.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
        
        <div className="candidate-details-card">
          <div className="status-header">
            <div className="status-title status-title2">
              <BarChart2 size={20} className="status-title-icon" />
              <h3>Student Performance</h3>
            </div>
            {/* <div className="status-subtitle status-subtitle2">
              Student Table ({filteredCandidates.length})
            </div> */}
          </div>
          <DataTable
            columns={columns}
            data={getCurrentPageData()}
            onRowClicked={handleRowClick}
            pagination={false}
            highlightOnHover
            enableToggle={false}
            fullViewMode={fullViewMode}  // Pass the fullViewMode state
            onToggleFullView={toggleFullView}  // Pass the toggle function
            allRowsExpanded={allRowsExpanded}
            onToggleAllRows={toggleFullView}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
            searchoption={true}
            searchQuery={searchQuery}
            searchPlaceholder={searchPlaceholder}  // Add this prop
            onSearchChange={handleSearchChange}
          />

          <div className="score-legend">
            <p>Score Legend:</p>
            <ul>
              {[
                { key: "a", label: "Attempts" },
                { key: "c", label: "Correct" },
                { key: "w", label: "Wrong" },
                { key: "gs", label: "Gross Score" },
                { key: "ns", label: "Net Score" },
              ].map(({ key, label }) => (
                <li key={key} className={hoveredScoreKey === key ? "highlight" : ""}>
                  <strong>{key.toUpperCase()}:</strong> {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
      {/* Pagination components */}
      {(showButtons || (fullViewMode && rowsPerPage < filteredCandidates.length)) && (
        <>
          <PaginationButtons
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            loadMore={loadMore}
            fullView={toggleFullView}  // Changed from toggleFullView to fullView
            fullViewMode={fullViewMode}
            showFullViewButton={true}  // Ensure this is always true if you want the button
          />
          <PaginationInfo
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            label="Students"
            totalItems={sampleCandidates.length}
            isSearching={searchQuery.length > 0}
          />
        </>
      )}
    </>
  )
}

export default CompletedTestDetails
