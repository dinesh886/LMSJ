import React, { useState, useRef, useEffect } from "react";
import DispatchModal from "../../../Test/DispatchModal/DispatchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import DataTable from "../../../../../Components/ReusableComponents/TableComponent/TableComponent";
import PaginationButtons from "../../../../../Components/ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../../../Components/ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../../../Components/header/header";
import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,

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
const data = [
  { id: 1, test: "Test 1", owner: "John Doe", status: "Published", lastModified: "2days ago by You" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status: "notpublished", lastModified: "1month ago by You" },
];

const mockScheduledTests = [
  { date: "2025-01-05", time: "10:30 AM" },
  { date: "2025-01-06", time: "2:00 PM" },
];

const Archived = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showButtons, setShowButtons] = useState(true);
  const [selectedTest, setSelectedTest] = useState("");
  // Search and filter related state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredCount, setFilteredCount] = useState(data.length);
  const [fullViewMode, setFullViewMode] = useState(false);

  const tagOptionsRef = useRef(null);
  const moreOptionsRef = useRef(null);
  // New state for mobile dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Filter data based on search and status
  const getFilteredData = () => {
    return data.filter((test) => {
      const matchesSearch = searchQuery === "" ||
        test.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.lastModified.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filterStatus === "" || test.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  };

  const filteredData = getFilteredData();
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
  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId);
  };
  const openShareModal = (testName) => {
    setSelectedTest(testName);
    setIsShareModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when action is taken
  };
  const openModal = (testName) => {
    setSelectedTest(testName);
    setIsModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when action is taken
  };

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

  // Handle filter status change
  const handleFilterStatusChange = (value) => {
    setFilterStatus(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagOptionsRef.current && !tagOptionsRef.current.contains(event.target)) {
        setShowTagOptions(false);
      }
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(Math.min(newRows, filteredData.length));
  };

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
      name: (
        <div>
          Test Names
        </div>
      ),
      selector: "test",
      sortable: false,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/test/${row.id}/movetest`} state={{ testName: row.test, testId: row.id }}>
            <span className="row-link">{row.test}</span>
          </Link>
        </div>
      ),
    },
    {
      name: (
        <div>
          Owner
        </div>
      ),
      selector: "owner",
      sortable: false,
    },
    {
      name: (
        <div>
          Status
        </div>
      ),
      selector: "status",
      sortable: false,
    },
    {
      name: (
        <div>
          Last Modified
        </div>
      ),
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
                    className="mobile-action-item archive"
                    onClick={() => handleActionClick('archive', row)}
                  >
                    <RiInboxUnarchiveFill />
                    <span> Un Archive</span>
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


              <button className="test-action-button archive" aria-label="Archive">
                <RiInboxUnarchiveFill />
                <span className="tooltip-text"> Un Archive</span>
              </button>
              <button
                className="test-action-button dispatch"
                aria-label="Dispatch"

              >
                <FaTrashAlt />
                <span className="tooltip-text">Delete</span>
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
            <h1 className="breadcrumb">Archived</h1>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={columns}
              data={getCurrentPageData()}
              availableActions={["delete", "download", "tag"]}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              filterType={filterStatus}
              onFilterTypeChange={handleFilterStatusChange}
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
          label="Tests"
          totalItems={data.length}
          isSearching={searchQuery.length > 0 || filterStatus.length > 0}
        />
      </div>
    </>
  );
};

export default Archived;