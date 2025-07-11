"use client"

import DataTable from "../../../../ReusableComponents/TableComponent/TableComponent"
import { useState, useEffect } from "react"
import PaginationButtons from "../../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../../ReusableComponents/Pagination/PaginationInfo"
import Header from "../../../../header/header"
import ToggleSwitch from "../../../../ReusableComponents/ToggleSwitch/ToggleSwitch"
import { toast } from "react-toastify"

import { FaArchive, FaTrashAlt, FaEllipsisH, FaUsers, FaUserCheck, FaUserTimes, FaRegWindowRestore } from "react-icons/fa"
import { LuArchiveRestore } from "react-icons/lu";
import { Link } from "react-router-dom"

const ClassDetailsTrash = () => {
const initialData = [
   
    { id: 5, name: "Uthaya", email: "uthaya@gmail.com", joinDate: "16/0/2023", status: "active" },
  ]

  // State management
  const [data, setData] = useState(initialData)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [fullViewMode, setFullViewMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [currentView, setCurrentView] = useState("all") // 'all', 'active', 'inactive'

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Filter data based on search and status
  const getFilteredData = () => {
    let filteredData = data

    // Filter by current view
    if (currentView === "active") {
      filteredData = filteredData.filter((student) => student.status === "active")
    } else if (currentView === "inactive") {
      filteredData = filteredData.filter((student) => student.status === "inactive")
    }

    // Apply search and status filters
    return filteredData.filter((student) => {
      const matchesSearch =
        searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.joinDate.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = filterStatus === "" || student.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }

  const filteredData = getFilteredData()

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredData
    }
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }

  // Toggle student status
  const toggleStudentStatus = (studentId) => {
    setData(prevData =>
      prevData.map(student =>
        student.id === studentId
          ? { ...student, status: student.status === "active" ? "inactive" : "active" }
          : student
      )
    )

    const student = data.find(s => s.id === studentId)
    toast.success(
      `Student ${student.name} has been ${student.status === "active" ? "deactivated" : "activated"}`,
      { position: "top-right", autoClose: 3000 }
    )
  }

  const handleArchive = (student) => {
    toast.info(`Archiving student ${student.name}`, { autoClose: 2000 })
  }

  const handleDelete = (student) => {
    toast.warning(`Deleting student ${student.name}`, { autoClose: 2000 })
  }
  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId)
  }

  const columns = [
    {
      name: "Student Names",
      selector: "name",
     
    },
    {
      name: "Student Emails",
      selector: "email",
    },
    {
      name: "Date Of Joining",
      selector: "joinDate",
    },
    {
      name: "Status",
      selector: "status",
      cell: (row) => (
        <span className={`status-text ${row.status === "active" ? "active" : "inactive"}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      selector: "actions",
      cell: (row) => (
        <div className="action-button-group">
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
                    onClick={() => handleArchive(row)}
                  >
                    <FaRegWindowRestore />
                    <span>Restore</span>
                  </button>
                  <button
                    className="mobile-action-item delete"
                    onClick={() => handleDelete(row)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
             
              <button
                className="test-action-button archive"
                onClick={() => handleArchive(row)}
                
              >
                  <FaRegWindowRestore />
                <span className="tooltip-text">Restore</span>
              </button>
              <button
                className="test-action-button delete"
                onClick={() => handleDelete(row)}
               
              >
                <FaTrashAlt />
                <span className="tooltip-text">Delete</span>
              </button>
            </>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ]

  // Get counts for different views
  const activeCount = data.filter((student) => student.status === "active").length
  const inactiveCount = data.filter((student) => student.status === "inactive").length
  const totalCount = data.length

  return (
    <>
      <Header />
      <div className="test-index-wrapper">
        <div className="test-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">Trashed Students</h1>

            {/* View Toggle Buttons */}
          
          </div>

          <div className="my-data-table">
            <DataTable
              columns={columns}
              data={getCurrentPageData()}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {!fullViewMode && rowsPerPage < filteredData.length && (
          <PaginationButtons
            filteredQuestions={filteredData}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            loadMore={() => setRowsPerPage(prev => Math.min(prev + 5, filteredData.length))}
            fullView={() => {
              setRowsPerPage(filteredData.length)
              setFullViewMode(true)
            }}
            fullViewMode={fullViewMode}
          />
        )}

        <PaginationInfo
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          label="Students"
          totalItems={data.length}
          isSearching={searchQuery.length > 0}
        />
      </div>
    </>
  )
};

export default ClassDetailsTrash