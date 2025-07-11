import React, { useState, useRef, useEffect } from "react";
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
  FaTimes,
  FaEdit,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import ShareModal from "../ShareModal/ShareModal";

import { Link } from "react-router-dom";
import DataTable from "../../../../ReusableComponents/TableComponent/TableComponent";
import PaginationButtons from "../../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../../ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../../header/header";

const data = [
  { id: 1, test: "Test 1", owner: "John Doe", status: "Published", lastModified: "2days ago by You" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status: "Published", lastModified: "1month ago by You" },
  { id: 3, test: "Test 3", owner: "Mark Johnson", status: "Published", lastModified: "5days ago by You" },
  { id: 4, test: "Test 4", owner: "Mark Johnson", status: "Published", lastModified: "30mns ago by You" },
  { id: 5, test: "Test 5", owner: "Mark Johnson", status: "Published", lastModified: "2month ago by You" },
  { id: 6, test: "Test 6", owner: "Mark Johnson", status: "Published", lastModified: "1day ago by You" },
];

const mockScheduledTests = [
  { date: "2025-01-05", time: "10:30 AM" },
  { date: "2025-01-06", time: "2:00 PM" },
];

const Dispatched = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredCount, setFilteredCount] = useState(data.length);

  // Selection and UI states
  const [selectedRows, setSelectedRows] = useState([]);
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showButtons, setShowButtons] = useState(true);
  const [emails, setEmails] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const tagOptionsRef = useRef(null);
  const moreOptionsRef = useRef(null);

  // New state for mobile dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  // Filter data based on search
  const getFilteredData = () => {
    return data.filter((item) => {
      const matchesSearch = searchQuery === "" ||
        item.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lastModified.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  };

  const filteredData = getFilteredData();

  // Update filtered count when data changes
  useEffect(() => {
    setFilteredCount(filteredData.length);
  }, [filteredData.length]);

  // Get current page data
  const getCurrentPageData = () => {
    return filteredData.slice(0, rowsPerPage);
  };

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(Math.min(newRows, filteredData.length));
    if (newRows >= filteredData.length) {
      setShowButtons(false);
    }
  };

  const fullView = () => {
    setRowsPerPage(filteredData.length);
    setShowButtons(false);
  };


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-actions-dropdown')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (testName) => {
    setSelectedTest(testName);
    setIsModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when action is taken
  };

  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId);
  };
  const openShareModal = (testName) => {
    setSelectedTest(testName);
    setIsShareModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when action is taken
  };

  const handleActionClick = (action, row) => {
    // Close dropdown first
    setOpenDropdownId(null);

    // Then execute the action
    switch (action) {
      case 'dispatch':
        openModal(row.test);
        break;
      case 'share':
        openShareModal(row.test);
        break;
      case 'copy':
        console.log('Copy action for', row.test);
        break;
      case 'pdf':
        console.log('PDF download for', row.test);
        break;
      case 'archive':
        console.log('Archive action for', row.test);
        break;
      case 'delete':
        console.log('Delete action for', row.test);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: <div><span>Test Names</span></div>,
      selector: "test",
      cell: (row) => (
        <div>
          <Link to={`/test/${row.id}/movetest`} state={{ testName: row.test, testId: row.id }}>
            <span className="row-link">{row.test}</span>
          </Link>
        </div>
      ),
    },
    {
      name: <div>Owner</div>,
      selector: "owner",
      sortable: false,
    },
    {
      name: <div>Last Modified</div>,
      selector: "lastModified",
      sortable: false,
    },
    {
      name: "Actions",
      selector: "actions",
      sortable: false,
      cell: (row) => (
        <div className="test-action-buttons">
          {isMobile ? (
            <div className="mobile-actions-dropdown">
              <button
                className="test-action-button mobile-menu-trigger"
                onClick={() => toggleDropdown(row.id)}
                aria-label="More actions"
              >
                <FaEllipsisH />
              </button>

              {openDropdownId === row.id && (
                <div className="mobile-actions-menu">
                  <button
                    className="mobile-action-item dispatch"
                    onClick={() => handleActionClick('dispatch', row)}
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    className="mobile-action-item copy"
                    onClick={() => handleActionClick('copy', row)}
                  >
                    <FaCopy />
                    <span>Copy</span>
                  </button>
                  <button
                    className="mobile-action-item pdf"
                    onClick={() => handleActionClick('pdf', row)}
                  >
                    <FaFilePdf />
                    <span>Download PDF</span>
                  </button>
                  <button
                    className="mobile-action-item share"
                    onClick={() => handleActionClick('share', row)}
                  >
                    <FaShare />
                    <span>Share</span>
                  </button>
                  <button
                    className="mobile-action-item archive"
                    onClick={() => handleActionClick('archive', row)}
                  >
                    <FaArchive />
                    <span>Archive</span>
                  </button>
                  <button
                    className="mobile-action-item delete"
                    onClick={() => handleActionClick('delete', row)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="test-action-button dispatch"
                aria-label="Dispatch"

              >
                <FaEdit />
                <span className="tooltip-text">Edit</span>
              </button>
              <button className="test-action-button copy" aria-label="Copy">
                <FaCopy />
                <span className="tooltip-text">Copy</span>
              </button>
              <button className="test-action-button pdf" aria-label="Download PDF">
                <FaFilePdf />
                <span className="tooltip-text">Download PDF</span>
              </button>
              <button
                className="test-action-button share"
                aria-label="Share"
                onClick={() => openShareModal(row.test)}
              >
                <FaShare />
                <span className="tooltip-text">Share</span>
              </button>
              <button className="test-action-button archive" aria-label="Archive">
                <FaArchive />
                <span className="tooltip-text">Archive</span>
              </button>

            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />

      <div className="test-index-wrapper">
        <div className="test-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">Published</h1>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={columns}
              data={getCurrentPageData()}
              availableActions={["delete", "download", "tag"]}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
            />
          </div>

          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            emails={emails}
            setEmails={setEmails}
          />

          <DispatchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            scheduledTests={mockScheduledTests}
          />
        </div>

        {showButtons && (
          <PaginationButtons
            filteredQuestions={filteredData}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            loadMore={loadMore}
            fullView={fullView}
          />
        )}

        <PaginationInfo
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          label="Tests"
          totalItems={data.length}
          isSearching={searchQuery.length > 0}
        />
      </div>
    </>
  );
};

export default Dispatched;