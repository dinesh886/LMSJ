import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DispatchModal from "../../DispatchModal/DispatchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaSearch,
  FaTrash,
  FaShare,
  FaTag,
  FaEllipsisH,
  FaDownload,
  FaPlus,
  FaCheck,
  FaTimes, FaEdit
} from "react-icons/fa";

import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import TablePagination from "../../../../../TablePagination";

const data = [
  { id: 1, test: "Test 1", owner: "John Doe", status: "Published", Type: "Scheduled" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status: "Published", Type: "Scheduled" },
  { id: 3, test: "Test 3", owner: "Mark Johnson", status: "Published", Type: "Scheduled" },
  { id: 4, test: "Test 4", owner: "Mark Johnson", status: "Published", Type: " Un Scheduled" },
  { id: 5, test: "Test 5", owner: "Mark Johnson", status: "Published", Type: " Un Scheduled" },
  { id: 6, test: "Test 6", owner: "Mark Johnson", status: "Published", Type: "Scheduled" },
];
const mockScheduledTests = [
  { date: "2025-01-05", time: "10:30 AM" },
  { date: "2025-01-06", time: "2:00 PM" },
];

const Undispatched = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [emails, setEmails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const tagColors = {
    "Urgent": "#FF0000", // Red
    "Review": "#FF9900", // Orange
    "Completed": "#008000", // Green
  };
  const [newTag, setNewTag] = useState("");
  const [tagColor, setTagColor] = useState("#ff0000"); // Default color for the tag
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  console.log("ShareModal isOpen: ", isShareModalOpen);
  console.log("tag modal", isTagModalOpen);
  const [draftTests, setDraftTests] = useState([]);
  const [editingTest, setEditingTest] = useState(null); // Test being edited

  const defaultColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#33FFEC",
    "#F7FF33", "#FF9633", "#9B33FF", "#33A6FF", "#FF5733"
  ];
  const handleCreateClick = () => {
    if (!newTag.trim()) {
      setTooltipVisible(true);
    } else {
      handleAddTag();
      setIsTagModalOpen(false);  // Close modal after creating
    }
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.test.toLowerCase().includes(value) ||
        item.owner.toLowerCase().includes(value) ||
        item.lastModified.includes(value)
    );
    setFilteredData(filtered);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredData.map((row) => row.id)); // Select all visible rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const showMoreOptionsButton = selectedRows.length > 1; // Show 'More' button only when multiple rows are selected

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { name: newTag, color: tagColor }]);
      setNewTag("");
      setTagColor("#ff0000"); // Reset the color picker
      setIsTagModalOpen(false); // Close the modal
    }
  };

  // Function to handle editing a draft test
  const handleEditTest = (test) => {
    setEditingTest(test); // Set the test to be edited
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle publishing a draft test
  const handlePublishTest = (test) => {
    // You can update the test status and move it to the published list, if necessary
    const updatedTest = { ...test, status: "Published" };
    // Remove from draft list and add to the published list
    setDraftTests(draftTests.filter((t) => t.id !== test.id));
    setFilteredData([...filteredData, updatedTest]); // Add to the published list
  };

  // Function to handle saving a test (whether it's draft or published)
  const handleSaveTest = (test) => {
    if (test.status === "Draft") {
      setDraftTests([...draftTests, test]); // Save as draft
    } else {
      setFilteredData([...filteredData, test]); // Save as published
    }
    setIsModalOpen(false); // Close the modal after saving
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={
            selectedRows.length > 0 &&
            selectedRows.length === filteredData.length
          }
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => handleRowSelect(row.id)}
        />
      ),
      width: "50px",
    },
    {
      name: "Test Names",
      selector: (row) => row.test,
      sortable: true,
      cell: (row) => (
        <Link to={`/test/${row.id}/movetest`}>
          <span className="row-link">{row.test}</span>
        </Link>
      ),
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.Type,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="test-action-buttons">

          <button
            className="test-action-button edit"
            aria-label="Edit"
            onClick={() => handleEditTest(row)}
          >
            <FaEdit onClick={() => setIsModalOpen(true)} />
            <span className="tooltip-text">Edit</span>
          </button>

          <button
            className="test-action-button publish"
            aria-label="Publish"
            onClick={() => handlePublishTest(row)}
          >
            <FaPaperPlane />
            <span className="tooltip-text">Publish</span>
          </button>

        </div>
      ),
      width: "250px",
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.includes(row.id),
      style: {
        backgroundColor: "#f0f8ff",
        color: "#000",
      },
    },
  ];
  return (
    <div className="test-index-wrapper">
      <div className="test-index-container">
        <div className="test-index-header">
          <h1 className="breadcrumb">Pending</h1>
          <div className="test-index-actions">
            <div className="test-search-container">
              <input
                type="text"
                placeholder="Search pending tests..."
                className="test-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="test-search-icon" />
            </div>
          </div>


          {selectedRows.length > 0 && (
            <div className="bulk-actions">
              {/* <button className="bulk-action-button bulk-delete-button">
                <FaTrash className="bulk-icon" />
                <span className="tooltip-text">Delete </span>
              </button> */}
              <div className="divider"></div>
              <button className="bulk-action-button bulk-archive-button">
                <FaArchive className="bulk-icon" />
                <span className="tooltip-text">Archive </span>
              </button>
              <div className="divider"></div>
              <button className="bulk-action-button bulk-download-button">
                <FaDownload className="bulk-icon" />

                <span className="tooltip-text">Download </span>
              </button>
              <div className="divider"></div>
              <div className="bulk-action-button">
                <button
                  className="bulk-tag-button "
                  onClick={() => setShowTagOptions(!showTagOptions)}
                >
                  <FaTag className="bulk-icon tag-icon" />
                  <span className="tooltip-text">Tag</span>
                </button>




              </div>
              {showTagOptions && (
                <div className="tag-options">
                  <button
                    className="close-tag-options"
                    onClick={() => setShowTagOptions(false)} // Close the options
                  >
                    <FaTimes />
                  </button>
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={index} className="tag-item">
                        <span
                          className="tag-dot"
                          style={{ backgroundColor: tagColors[tag] || "#000" }} // Default color if not found
                        ></span>
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <button className="add-tag-button" onClick={() => setIsTagModalOpen(true)}>
                    <FaTag /> Add Tag


                  </button>
                </div>
              )}
              <div className="divider"></div>
              {selectedRows.length === 1 && (
                <div className="bulk-action-button">
                  {/* <button
                    className="more-button"
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                  >
                    More
                  </button> */}
                </div>
              )}

              {selectedRows.length <= 1 && !showMoreOptions && (
                // Show the More button only when one row is selected, and hide it otherwise
                <></> // No need to render anything
              )}


            </div>
          )}


          {showMoreOptions && (
            <div className="more-options">
              <button
                className="close-tag-options"
                onClick={() => setShowMoreOptions(false)} // Close the options
              >
                <FaTimes />
              </button>
              <ul>
                <li>Rename</li>
                <li>Make a Copy</li>
              </ul>
            </div>
          )}

        </div>

        <DataTable
          columns={columns}
          data={filteredData.slice(0, rowsPerPage * currentPage)}
          pagination={false}
          conditionalRowStyles={conditionalRowStyles}
        />

        <ShareModal
          isOpen={isShareModalOpen} // Correct state variable
          onClose={() => setIsShareModalOpen(false)}
          emails={emails}
          setEmails={setEmails}
        />




        <DispatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          testDetails={editingTest} // Pass the test details for editing
          saveTest={handleSaveTest} // Save edited or new test
        />

      </div>
      <div className="flex items-center space-x-2">
        <div className="pagination-info">
          Showing {Math.min(rowsPerPage * currentPage, filteredData.length)} out of {filteredData.length} Tests
        </div>
        {rowsPerPage * currentPage < filteredData.length && (
          <button
            variant="outline"
            size="sm"
            className="load-more-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load More
          </button>
        )}
      </div>
      {/* Render the Modal */}
      {isTagModalOpen && (
        <div className="tag-modal-backdrop">
          <div className="tag-modal">
            <h2 className="new-tag-heading">Create New Tag</h2>
            <hr />
            <div className="tag-modal-body">
              <label>New Tag Name:</label>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag name"
              />
              {tooltipVisible && !newTag.trim() && (
                <div className="tag-tooltip">Please enter a tag name!</div>
              )}

              <label>Tag Color:</label>
              <div className="color-selection-container">
                {/* Default color squares */}
                {defaultColors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-box ${color === tagColor ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTagColor(color)}
                  >
                    {color === tagColor && <FaCheck className="checkmark" />}
                  </div>
                ))}

                {/* Custom color picker trigger */}
                <div
                  className="color-box custom-color-box"
                  onClick={() => setIsCustomColor(true)}
                >
                  <FaPlus />
                </div>

                {/* Custom color picker */}
                {isCustomColor && (
                  <div className="color-picker-container color-box">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="tag-modal-footer">
              <div
                onClick={handleCreateClick}
                className={`create-tag-button ${!newTag.trim() ? 'muted' : ''}`}
              >
                Create
              </div>
              <div onClick={() => setIsTagModalOpen(false)} className="cancel-tag-button">
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Undispatched;
