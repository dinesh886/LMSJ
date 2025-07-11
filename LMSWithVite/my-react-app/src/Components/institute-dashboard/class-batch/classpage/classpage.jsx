import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineArchive } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../header/header";
import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaCog,
  FaEdit,
  FaEllipsisH
} from "react-icons/fa";
import { Settings, FilePenLine, Archive,Trash2  } from 'lucide-react';
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const ClassPage = () => {
  const data = [
    { id: "1", name: "Class 1", strength: 30, maximumallowed: 50, expiryDate: new Date(2024, 5, 30) },
    { id: "2", name: "Class 2", strength: 25, maximumallowed: 100, expiryDate: new Date(2024, 6, 15) },
    { id: "3", name: "Class 3", strength: 28, maximumallowed: 70, expiryDate: new Date(2024, 7, 1) },
    { id: "4", name: "Class 4", strength: 28, maximumallowed: 70, expiryDate: new Date(2024, 7, 1) },
  ];

  // State management
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCount, setFilteredCount] = useState(data.length);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Filter data based on search
  const getFilteredData = () => {
    return data.filter((cls) => {
      const matchesSearch = searchQuery === "" ||
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.strength.toString().includes(searchQuery) ||
        cls.maximumallowed.toString().includes(searchQuery) ||
        cls.expiryDate.toLocaleDateString().includes(searchQuery);

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

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-actions-dropdown")) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(Math.min(newRows, filteredData.length));
  };

  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredData.length);
    } else {
      setRowsPerPage(5);
    }
    setFullViewMode(!fullViewMode);
  };

  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId);
  };

  const handleActionClick = (action, row) => {
    setOpenDropdownId(null);
    switch (action) {
      case "settings":
        console.log("Settings for", row.name);
        break;
      case "rename":
        console.log("Rename", row.name);
        break;
      case "archive":
        console.log("Archive", row.name);
        break;
      case "delete":
        console.log("Delete", row.name);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: (
        <div className="flex items-center">
          <span>Class Names</span>
        </div>
      ),
      selector: "name",
      cell: (row) => (
        <div className="flex items-center">
          <Link to={`/class/${row.id}/classdetailpage`} state={{ className: row.name, classId: row.id }}>
            <span className="row-link">{row.name}</span>
          </Link>
        </div>
      ),
    },
    {
      name: <div className="cursor-pointer">Strength</div>,
      selector: "strength",
      sortable: true,
    },
    {
      name: <div className="cursor-pointer">Maximum Allowed</div>,
      selector: "maximumallowed",
      sortable: true,
    },
    {
      name: <div className="cursor-pointer">Expiry Date</div>,
      selector: "expiryDate",
      sortable: true,
      cell: (row) => <span>{row.expiryDate.toLocaleDateString()}</span>,
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
                <HiDotsVertical />
              </button>

              {openDropdownId === row.id && (
                <div className="mobile-actions-menu">
                  <button
                    className="mobile-action-item settings"
                    onClick={() => handleActionClick("settings", row)}
                  >
                    <FaCog />
                    <span>Settings</span>
                  </button>
                  <button
                    className="mobile-action-item rename"
                    onClick={() => handleActionClick("rename", row)}
                  >
                    <FaEdit />
                    <span>Rename</span>
                  </button>
                  <button
                    className="mobile-action-item archive"
                    onClick={() => handleActionClick("archive", row)}
                  >
                    <FaArchive />
                    <span>Archive</span>
                  </button>
                  <button
                    className="mobile-action-item delete"
                    onClick={() => handleActionClick("delete", row)}
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
                className="test-action-button settings"
                aria-label="Settings"
                onClick={() => handleActionClick("settings", row)}
              >
                  <FaCog  />
                <span className="tooltip-text">Settings</span>
              </button>
              <button
                className="test-action-button rename"
                aria-label="Rename"
                onClick={() => handleActionClick("rename", row)}
              >
                  <FaEdit  />
                <span className="tooltip-text">Rename</span>
              </button>
              <button
                className="test-action-button archive"
                aria-label="Archive"
                onClick={() => handleActionClick("archive", row)}
              >
                  <FaArchive  />
                <span className="tooltip-text">Archive</span>
              </button>
              <button
                className="test-action-button delete"
                aria-label="Delete"
                onClick={() => handleActionClick("delete", row)}
              >
                  <FaTrashAlt  />
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
      <Helmet>
        <title>Classes</title>
        <meta name="description" content="Classes" />
      </Helmet>
      <Header />
      <div className="test-index-wrapper">
        <div className="test-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">All Classes Lists</h1>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={columns}
              data={getCurrentPageData()}
              availableActions={["delete", "archive", "download", "tag", "more"]}
              enableToggle={false}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
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
          label="Classes"
          totalItems={data.length}
          isSearching={searchQuery.length > 0}
        />
      </div>
    </>
  );
};

export default ClassPage;