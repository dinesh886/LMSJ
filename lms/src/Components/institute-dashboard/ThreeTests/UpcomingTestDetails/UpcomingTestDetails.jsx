import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpcomingTestDetails.css';
import {
  Clock,
  Users,
  Timer,
  FileText,
  User,
  HelpCircle,
  Target,
  BookOpen,
  Users2,
  ChevronDown,
  ChevronUp,
  BarChart2
} from 'lucide-react';
import DataTable from '../../../ReusableComponents/TableComponent/TableComponent';
import Header from '../../../header/header';
import PaginationButtons from '../../../ReusableComponents/Pagination/PaginationButton';
import PaginationInfo from '../../../ReusableComponents/Pagination/PaginationInfo';
import clock from '../../../../images/clock.png';
import { Helmet } from "react-helmet";

const UpcomingTestDetails = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState(null);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const searchPlaceholder = "Search students...";

  const testData = {
    hoursConsumed: 24,
    candidatesAttended: 150,
    timerDuration: '01:20:00',
    name: 'Advanced JavaScript Assessment',
    owner: 'John Doe',
    questions: 50,
    marks: 100,
    sections: 3,
    classbatch: "Public",
    description: 'This test evaluates advanced JavaScript concepts including closures, prototypes, and async programming.',
    instructions: 'Please read each question carefully. You have 2.5 hours to complete the test. Good luck!',
    candidates: [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', class: '10-A', status: 'Enrolled' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', class: '10-B', status: 'Invited' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', class: '10-C', status: 'Pending' },
      { id: 4, name: 'David Wilson', email: 'david@example.com', class: '10-D', status: 'Enrolled' },
      { id: 5, name: 'Eve Davis', email: 'eve@example.com', class: '10-E', status: 'Invited' },
      { id: 6, name: 'Frank Miller', email: 'frank@example.com', class: '10-F', status: 'Pending' },
      { id: 7, name: 'Grace Lee', email: 'grace@example.com', class: '10-G', status: 'Enrolled' },
      { id: 8, name: 'Henry Taylor', email: 'henry@example.com', class: '10-H', status: 'Invited' },
      { id: 9, name: 'Ivy Clark', email: 'ivy@example.com', class: '10-I', status: 'Pending' },
      { id: 10, name: 'Jack Walker', email: 'jack@example.com', class: '10-J', status: 'Enrolled' },
      { id: 11, name: 'Karen Hall', email: 'karen@example.com', class: '10-K', status: 'Invited' },
    ]
  };

  // Filter candidates based on search query
  const filteredCandidates = testData.candidates.filter(candidate => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.class.toLowerCase().includes(searchLower) ||
      candidate.status.toLowerCase().includes(searchLower)
    );
  });

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(newRows);

    if (newRows >= filteredCandidates.length) {
      setShowButtons(false);
    }
  };

  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredCandidates.length);
    } else {
      setRowsPerPage(10);
    }
    setFullViewMode(!fullViewMode);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
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
    // {
    //   name: "Status",
    //   selector: "status",
    //   cell: (row) => <span className={`status ${row.status?.toLowerCase() || "na"}`}>{row.status || "N/A"}</span>,
    //   sortable: true,
    // }
  ];

  return (
    <>
      <Helmet>
        <title> Upcomming Test Details</title>
        <meta name="description" content="Upcomming Test Details" />
      </Helmet>
      <Header />
      <div className="test-details-container">
        <div className="top-cards-container">
          <div className="top-card">
            <div className="card-icon">
              <Clock size={24} />
            </div>
            <div className="card-content">
              <h3>Hours Consumed</h3>
              <p>{testData.hoursConsumed}/100</p>
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
          <div className="top-card">
            <div className="card-icon">
              <Timer size={24} />
            </div>
            <div className="card-content">
              <h3>Timer</h3>
              <p>{testData.timerDuration}</p>
            </div>
          </div>
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
                <span>{testData.classbatch}</span>
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
              <h3>Student Table</h3>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredCandidates}
            pagination
            highlightOnHover
            searchoption={true}
            selectableRows={false}  // This disables the checkboxes
            searchQuery={searchQuery}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>

      {(showButtons || (fullViewMode && rowsPerPage < filteredCandidates.length)) && (
        <>
          <PaginationButtons
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            loadMore={loadMore}
            fullView={toggleFullView}
            fullViewMode={fullViewMode}
            showFullViewButton={true}
          />
          <PaginationInfo
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            label="Students"
            totalItems={testData.candidates.length}
            isSearching={searchQuery.length > 0}
          />
        </>
      )}
    </>
  );
}

export default UpcomingTestDetails;