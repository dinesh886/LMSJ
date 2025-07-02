import React, { useState, useRef, useEffect } from "react";
import DispatchModal from "../../../Test/DispatchModal/DispatchModal";
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
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import DataTable from "../../../../../Components/ReusableComponents/TableComponent/TableComponent";
import PaginationButtons from "../../../../../Components/ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../../../Components/ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../../../Components/header/header";

const data = [
  { id: 1, test: "Test 1", owner: "John Doe", status: "Published", lastModified: "2days ago by You" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status: "notpublished", lastModified: "1month ago by You" },
];

const mockScheduledTests = [
  { date: "2025-01-05", time: "10:30 AM" },
  { date: "2025-01-06", time: "2:00 PM" },
];

const SharedWithMe = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredCount, setFilteredCount] = useState(data.length);

  // Selection and tag states
  const [selectedRows, setSelectedRows] = useState([]);
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [newTag, setNewTag] = useState("");
  const [tagColor, setTagColor] = useState("#ff0000");

  // UI states
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");
  const [sortColumn, setSortColumn] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);
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
  // Check if screen is mobile size
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

  // Other handler functions
  const handleSort = (column) => {
    const newIsAscending = sortColumn === column ? !isAscending : true;
    setSortColumn(column);
    setIsAscending(newIsAscending);

    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[column] || '';
      const valueB = b[column] || '';
      return newIsAscending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };
  const openShareModal = (testName) => {
    setSelectedTest(testName);
    setIsShareModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when action is taken
  };
  const handleSelectAll = (event) => {
    setSelectedRows(event.target.checked ? filteredData.map(row => row.id) : []);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { name: newTag, color: tagColor }]);
      setNewTag("");
      setTagColor("#ff0000");
      setIsTagModalOpen(false);
    }
  };
  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId);
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
      name: <div className="flex items-center">Test Names</div>,
      selector: "test",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/test/${row.id}/movetest`} state={{ testName: row.test, testId: row.id }}>
            <span className="row-link">{row.test}</span>
          </Link>
        </div>
      ),
    },
    {
      name: <div className="cursor-pointer">Status</div>,
      selector: "status",
      sortable: false,
    },
    {
      name: <div className="cursor-pointer">Last Modified</div>,
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
                    className="mobile-action-item archive"
                    onClick={() => handleActionClick('archive', row)}
                  >
                    <FaArchive />
                    <span>Archive</span>
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">

              <button className="test-action-button copy" aria-label="Copy">
                <FaCopy />
                <span className="tooltip-text">Copy</span>
              </button>
              <button className="test-action-button pdf" aria-label="Download PDF">
                <FaFilePdf />
                <span className="tooltip-text">Download PDF</span>
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
            <h1 className="breadcrumb">Shared With Me</h1>
            <div className="test-index-actions"></div>
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

export default SharedWithMe;