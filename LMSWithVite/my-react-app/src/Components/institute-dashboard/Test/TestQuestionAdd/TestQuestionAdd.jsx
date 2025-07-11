import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import "./TestQuestionAdd.css";
import { useTestContext } from "../context/TestContext";
import { useParams, useLocation } from "react-router-dom";
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../header/header";
import { ArrowDownWideNarrow } from 'lucide-react';
const TestQuestionAdd = () => {
  const { questionsToShow } = useTestContext();
  const location = useLocation();
  const { testName, testId } = location.state || {};
  const { id } = useParams();

  const INITIAL_ROWS_PER_PAGE = 10;

  // State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [filteredCount, setFilteredCount] = useState(questionsToShow.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Get all unique question types
  const allQuestionTypes = [...new Set(questionsToShow.map(q => q.type))];

  const getFilteredData = () => {
    return questionsToShow.filter((question) => {
      const matchesSearch =
        searchQuery === "" ||
        (question.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (question.type || "").toLowerCase().includes(searchQuery.toLowerCase());

      // If no types are selected, show all. Otherwise filter by selected types
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(question.type);

      return matchesSearch && matchesType;
    });
  };

  const filteredData = getFilteredData();

  // Update filtered count when data changes
  useEffect(() => {
    setFilteredCount(filteredData.length);
  }, [filteredData.length]);

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredData;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  };

  // Check if we should show pagination buttons
  const showPaginationButtons = !fullViewMode && rowsPerPage < filteredData.length;

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle individual row expansion toggle
  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 10;
    setRowsPerPage(Math.min(newRows, filteredData.length));
  };

  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredData.length);
      setAllRowsExpanded(true);
      setExpandedRows(filteredData.map((q) => q.id));
    } else {
      setRowsPerPage(INITIAL_ROWS_PER_PAGE);
      setAllRowsExpanded(false);
      setExpandedRows([]);
    }
    setFullViewMode(!fullViewMode);
  };

  // Toggle question type in filter
  const toggleQuestionType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1);
  };

  // Select all types
  const selectAllTypes = () => {
    setSelectedTypes(allQuestionTypes);
    setCurrentPage(1);
  };

  // Clear all type filters
  const clearAllTypes = () => {
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  // Handle individual row checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedQuestionIds.includes(id)) {
      setSelectedQuestionIds(selectedQuestionIds.filter((qid) => qid !== id));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, id]);
    }

    if (
      selectedQuestionIds.length === questionsToShow.length - 1 &&
      !selectedQuestionIds.includes(id)
    ) {
      setIsSelectAllChecked(true);
    } else {
      setIsSelectAllChecked(false);
    }
  };

  const handleAddToTest = () => {
    if (selectedQuestionIds.length > 0) {
      console.log("Questions added to test:", selectedQuestionIds);
      setIsPopupVisible(true);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "Questions",
      selector: "question",
      sortable: true,
      cell: (row) => {
        const isExpanded = expandedRows.includes(row.id);
        const shouldTruncate = !fullViewMode && !isExpanded;

        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleRowExpansion(row.id);
            }}
          >
            <span className={`row-link ${shouldTruncate ? "truncate" : ""}`}>
              {row.question}
            </span>
          </div>
        );
      },
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      cell: (row) => <span className={`type-badge ${row.type.toLowerCase().replace("/", "")}`}>{row.type}</span>,
    },
  ];

  // Reset expanded rows when search changes
  useEffect(() => {
    if (!fullViewMode) {
      setExpandedRows([]);
    }
  }, [searchQuery, selectedTypes]);

  return (
    <>
      <Header />
      <div className="testquestionadd-index-wrapper">
        <div className="testquestionadd-index-container">
          <div className="test-index-header">
            <div className="breadcrumb-and-filters">
              <h3 className="breadcrumb">Add Questions in Test {id}</h3>

              {/* Filter dropdown */}
              <div className="filter-dropdown-container">
                <button
                  className={`filter-button ${isFilterDropdownOpen ? "active" : ""}`}
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                >
                  <ArrowDownWideNarrow size={16} /> Filter
                </button>


                {isFilterDropdownOpen && (
                  <div className="filter-dropdown">
                    <div className="filter-dropdown-header">
                      <span>Question Types</span>
                      {/* <div className="filter-actions">
                        <button onClick={selectAllTypes}>Select All</button>
                        <button onClick={clearAllTypes}>Clear All</button>
                      </div> */}
                    </div>
                    <div className="filter-options">
                      {allQuestionTypes.map(type => (
                        <div key={type} className="filter-option">
                          <input
                            type="checkbox"
                            id={`type-${type}`}
                           
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleQuestionType(type)}
                          />
                          <label htmlFor={`type-${type}`}>
                            <span className={`type-badge ${type.toLowerCase().replace("/", "")}`}>
                              {type}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="test-question-add">
            {questionsToShow.length === 0 ? (
              <div className="empty-state">
                <p>No questions found for this section.</p>
              </div>
            ) : (
              <div className="my-data-table-test">
                <DataTable
                  columns={columns}
                  data={getCurrentPageData()}
                  availableActions={[]}
                  enableToggle={true}
                  fullViewMode={fullViewMode}
                  allRowsExpanded={allRowsExpanded}
                  expandedRows={expandedRows}
                  setExpandedRows={setExpandedRows}
                  searchoption={true}
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showPaginationButtons && (
        <PaginationButtons
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          loadMore={loadMore}
          fullView={toggleFullView}
          fullViewMode={fullViewMode}
        />
      )}

      <PaginationInfo
        filteredQuestions={filteredData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Questions"
        totalItems={questionsToShow.length}
        isSearching={searchQuery.length > 0 || selectedTypes.length > 0}
      />

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedQuestionIds.length} questions added to test</h3>
            <button onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestQuestionAdd;