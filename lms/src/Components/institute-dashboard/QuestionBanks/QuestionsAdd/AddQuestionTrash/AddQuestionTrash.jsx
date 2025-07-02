import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../../ReusableComponents/TableComponent/TableComponent";
import { FaCopy, FaEdit, FaTrashAlt, FaArrowRight, FaFolderPlus } from "react-icons/fa";
import PaginationButtons from "../../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../../ReusableComponents/Pagination/PaginationInfo";
import ColumnVisibilityDropdown from "../../../../ReusableComponents/ColumnVisibilityDropdown/ColumnVisibilityDropdown";

import Header from "../../../../header/header";


const AddQuestionTrash = () => {
      const data = [
        {
          id: 1,
          question: "What is the primary purpose of React in web development?",
          answer: "React is primarily used for building user interfaces.",
          modified: "2 days ago",
          created :"15/03/2025",
          type: "MCQ",
          section: "Section 1",
          marks: 5,
          owner: "Admin",
          options: ["A JavaScript library", "A programming language", "A database", "A framework"],
          correctAnswer: "A JavaScript library",
        },
        {
          id: 2,
          question: "Which company developed React?",
          answer: "React was developed by Facebook (now Meta).",
          modified: "5 days ago",
          created: "15/03/2025",
          type: "MCQ",
          section: "Section 1",
          marks: 5,
          owner: "Admin",
          options: ["Google", "Facebook", "Microsoft", "Apple"],
          correctAnswer: "Facebook",
        },
     
        
      ];
    
    
const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [filteredCount, setFilteredCount] = useState(data.length);
  const [fullViewMode, setFullViewMode] = useState(false);

  // Filter data based on search and filters
  const getFilteredData = () => {
    return data.filter((question) => {
      const matchesSearch = searchQuery === "" ||
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.section.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filterType === "" || question.type === filterType;
      const matchesSection = filterSection === "" || question.section === filterSection;

      return matchesSearch && matchesType && matchesSection;
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
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter type change
  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle filter section change
  const handleFilterSectionChange = (value) => {
    setFilterSection(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Toggle full view mode
  const toggleFullView = () => {
    if (!fullViewMode) {
      // Enter Full View mode
      setRowsPerPage(filteredData.length);
    } else {
      // Exit Full View mode
      setRowsPerPage(5);
    }
    setFullViewMode(!fullViewMode);
  };

  // Define columns with visibility state
  const [columns, setColumns] = useState([
    {
      name: "Questions",
      selector: (row) => row?.question || "N/A",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          {row?.id ? (
            <Link
              to={`/QuestionBank/${row.id}/add`}
              className={`row-link ${expandedRow === row.id ? "expanded" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setExpandedRow(expandedRow === row.id ? null : row.id);
              }}
            >
              {row?.question || "No Question"}
            </Link>
          ) : (
            <span className="row-link">No Question</span>
          )}
        </div>
      ),
      isVisible: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Section",
      selector: "section",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Modified",
      selector: "modified",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Created",
      selector: "created",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Actions",
      selector: "actions",
      isVisible: false,
      cell: (row) => (
        <div className="test-action-buttons flex gap-2">
        
          <button
            className="test-action-button copy"
            aria-label="Add to section"
            onClick={(e) => {
              e.stopPropagation();
              // Handle move to test action
            }}
          >
            <FaFolderPlus />
            <span className="tooltip-text">Restore</span>
          </button>
          <button
            className="test-action-button delete"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              // Handle delete action
            }}
          >
            <FaTrashAlt />
            <span className="tooltip-text">Delete</span>
          </button>
        </div>
      ),
    },
  ]);

  // Toggle column visibility
  const toggleColumnVisibility = (columnSelector) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.selector === columnSelector
          ? { ...column, isVisible: !column.isVisible }
          : column
      )
    );
  };

  // Filter visible columns
  const visibleColumns = columns.filter((column) => column.isVisible);
  return (
    <>
      <Header />
      <div className="questionsadd-index-wrapper">
        <div className="questionsadd-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">QB 1 Questions</h1>
            <div className="columnvisibility-wrapper">
              <ColumnVisibilityDropdown
                columns={columns}
                onToggleColumn={toggleColumnVisibility}
              />
            </div>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={visibleColumns}
              data={getCurrentPageData()}
              availableActions={["delete"]}
              enableToggle={true}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              filterType={filterType}
              onFilterTypeChange={handleFilterTypeChange}
              filterSection={filterSection}
              onFilterSectionChange={handleFilterSectionChange}
            />
          </div>

          {showPaginationButtons && (
            <PaginationButtons
              filteredQuestions={filteredData}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              loadMore={() => setRowsPerPage(prev => Math.min(prev + 10, filteredData.length))}
              fullView={toggleFullView}
              fullViewMode={fullViewMode}
            />
          )}

          <PaginationInfo
            filteredQuestions={filteredData}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            label="Questions"
            totalItems={data.length}
            isSearching={searchQuery.length > 0 || filterType.length > 0 || filterSection.length > 0}
          />
        </div>
      </div>
    </>
  );
};
export default AddQuestionTrash