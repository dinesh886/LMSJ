import React, { useState } from "react";
import { FaSearch, FaPlus, FaArrowLeft, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./TestQuestionAdd.css";
import { useTestContext } from "../context/TestContext";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../header/header";

const TestQuestionAdd = () => {
  const { questionsToShow } = useTestContext();
  const location = useLocation();
  const { testName, testId } = location.state || {}; // Safe access using optional chaining

  console.log(testName, testId); // Log the values to ensure data is passed
  const { id } = useParams();

  const navigate = useNavigate();

  // State for checkbox selection
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState(null); // To track which column is being sorted
  const [isAscending, setIsAscending] = useState(true); // To track the sorting order (ascending or descending)
  const [filteredData, setFilteredData] = useState(questionsToShow); // Your data array
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showButtons, setShowButtons] = useState(true);




  // Handle individual row checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedQuestionIds.includes(id)) {
      // Deselect this question
      setSelectedQuestionIds(selectedQuestionIds.filter((qid) => qid !== id));
    } else {
      // Select this question
      setSelectedQuestionIds([...selectedQuestionIds, id]);
    }

    // Update the "Select All" checkbox state dynamically
    if (
      selectedQuestionIds.length === questionsToShow.length - 1 &&
      !selectedQuestionIds.includes(id)
    ) {
      setIsSelectAllChecked(true);
    } else {
      setIsSelectAllChecked(false);
    }
  };


  const availableActions = [];


  const handleAddToTest = () => {
    if (selectedQuestionIds.length > 0) {
      // Implement the logic to add selected questions to the test
      console.log("Questions added to test:", selectedQuestionIds);

      // Optionally show a popup
      setIsPopupVisible(true);
    }
  };
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const data = questionsToShow;

  const paginatedData = data.slice(0, rowsPerPage);

  const loadMore = () => {
    setRowsPerPage((prevRows) => {
      const newRows = prevRows + 5;
      if (newRows >= data.length) setShowButtons(false); // Hide buttons if all data is shown
      return newRows;
    });
  };


  const fullView = () => {
    setRowsPerPage(data.length); // Show all data
    setShowButtons(false); // Hide buttons after Full View
  };





  // Define columns for the DataTable
  const columns = [
    {
      name: (
        <div>
          Questions
        </div>
      ),
      selector: "question",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Question text */}
          <span className="row-link" onClick={(e) => e.stopPropagation()}>
            {row.question}
          </span>
        </div>
      ),
    },
  ];


  return (
    <>
      <Header />
      <div className="testquestionadd-index-wrapper">
        <div className="testquestionadd-index-container">
          <div className="test-index-header">
            <h3 className="breadcrumb">Add Questions in Test {id}</h3>
          </div>

          {/* DataTable */}
          <div className="test-question-add">
            {questionsToShow.length === 0 ? (
              <div className="empty-state">
                <p>No questions found for this section.</p>

              </div>
            ) : (
              <div className="my-data-table-test">
                <DataTable
                  columns={columns}
                  data={data}
                  availableActions={[]}
                  enableToggle={true}
                />
              </div>
            )}
          </div>
        </div>


      </div>
      <PaginationButtons
        filteredQuestions={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        loadMore={loadMore}
        fullView={fullView}
      />

      <PaginationInfo
        filteredQuestions={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Questions"
      />
    </>

  );
};

export default TestQuestionAdd;
