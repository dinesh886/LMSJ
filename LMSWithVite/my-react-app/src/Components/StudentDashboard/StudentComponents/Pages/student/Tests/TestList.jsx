"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "../../../../../ReusableComponents/TableComponent/TableComponent"
import PaginationButtons from "../../../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../../../ReusableComponents/Pagination/PaginationInfo"
import "./TestList.css"
import { CiPlay1 } from "react-icons/ci"
import { FiClock, FiCalendar, FiUser, FiBookOpen } from "react-icons/fi"
import { BsHourglassSplit } from "react-icons/bs"
import { Plus, Filter, ChevronRight, ClipboardCheck } from "lucide-react"
// Sample data with additional fields
const testData = [
    {
        id: 1,
        test: "Mathematics Final",
        owner: "John Doe",
        hours: 2,
        status: "Scheduled",
        time: "10:00 AM - 12:00 PM",
        type: "scheduled",
        startTime: "2023-06-15T10:00:00",
        endTime: "2023-06-15T12:00:00",
    },
    {
        id: 2,
        test: "Science Quiz",
        owner: "Jane Smith",
        hours: 1,
        status: "Live",
        time: "Ongoing",
        type: "live",
        startTime: "2025-03-27T03:00:00",
        endTime: "2025-03-27T05:00:00",
    },
    {
        id: 3,
        test: "History Midterm",
        owner: "Mark Johnson",
        hours: 1.5,
        status: "Scheduled",
        time: "Starts in 2 hours",
        type: "scheduled",
        startTime: "2023-06-15T14:00:00",
        endTime: "2023-06-15T15:30:00",
    },
    {
        id: 4,
        test: "English Essay",
        owner: "Sarah Williams",
        hours: 3,
        status: "Unscheduled",
        time: "Not scheduled",
        type: "unscheduled",
    },
    {
        id: 5,
        test: "Physics Test",
        owner: "Robert Brown",
        hours: 2,
        status: "Scheduled",
        time: "Starts tomorrow",
        type: "scheduled",
        startTime: "2023-06-16T10:00:00",
        endTime: "2023-06-16T12:00:00",
    },
    {
        id: 6,
        test: "Chemistry Lab",
        owner: "Emily Davis",
        hours: 2.5,
        status: "Live",
        time: "Ongoing",
        type: "live",
        startTime: "2023-06-15T08:30:00",
        endTime: "2023-06-15T11:00:00",
    },
]

const RemainingTimeCounter = ({ endTime }) => {
    const [timeRemaining, setTimeRemaining] = useState("")

    useEffect(() => {
        const updateRemainingTime = () => {
            const now = new Date()
            const end = new Date(endTime)
            const diff = end - now

            if (diff <= 0) {
                setTimeRemaining("00:00:00")
                return
            }

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeRemaining(
                `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
            )
        }

        updateRemainingTime()
        const interval = setInterval(updateRemainingTime, 1000)

        return () => clearInterval(interval)
    }, [endTime])

    return <span className="countdown-timer">{timeRemaining}</span>
}

const TestList = () => {
    const [selectedRows, setSelectedRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState("all") // 'all', 'scheduled', 'unscheduled'
    const [showButtons, setShowButtons] = useState(true)
    const navigate = useNavigate() // Initialize the navigate function

    // Filter data based on active tab
    const filteredData = activeTab === "all" ? testData : testData.filter((test) => test.type === activeTab)

    const paginatedData = filteredData.slice(0, rowsPerPage)

    const loadMore = () => {
        setRowsPerPage((prevRows) => {
            const newRows = prevRows + 5
            if (newRows >= filteredData.length) setShowButtons(false)
            return newRows
        })
    }

    const fullView = () => {
        setRowsPerPage(filteredData.length)
        setShowButtons(false)
    }

    const handleStartTest = (test) => {
        // Store test timing information in localStorage for the test attempt page
        if (test.type === "scheduled" || test.type === "live") {
            localStorage.setItem(
                "currentTestTiming",
                JSON.stringify({
                    startTime: test.startTime,
                    endTime: test.endTime,
                    type: test.type,
                }),
            )
        }

        // Navigate to the test attempt page
        navigate(`/student/tests/${test.id}/attempt`)
    }

    // Format scheduled time
    const formatScheduledTime = (startTime, endTime) => {
        const start = new Date(startTime)
        const end = new Date(endTime)

        const options = { hour: "2-digit", minute: "2-digit", hour12: true }

        return `${start.toLocaleTimeString([], options)} - ${end.toLocaleTimeString([], options)}`
    }

    const columns = [
        {
            name: "Test Name",
            selector: "test",
            cell: (row) => (
                <div className="test-name-cell">
                    {/* <FiBookOpen className="test-icon" /> */}
                    <span className="test-name-link" onClick={() => handleStartTest(row)}>
                        {row.test}
                    </span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Owner",
            selector: "owner",
            cell: (row) => (
                <div className="owner-cell">
                    {/* <FiUser className="owner-icon" /> */}
                    <span>{row.owner}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Duration",
            selector: "hours",
            cell: (row) => (
                <div className="duration-cell">
                    {/* <BsHourglassSplit className="duration-icon" /> */}
                    <span>{row.hours} hrs</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Status",
            selector: "status",
            cell: (row) => (
                <div className="status-cell">
                    <span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Time",
            selector: "time",
            cell: (row) => {
                if (row.type === "live") {
                    return (
                        <div className="time-cell live">
                            {/* <FiClock className="time-icon pulse" /> */}
                            <RemainingTimeCounter endTime={row.endTime} />
                        </div>
                    )
                } else if (row.type === "scheduled") {
                    return (
                        <div className="time-cell scheduled">
                            {/* <FiCalendar className="time-icon" /> */}
                            <span>{formatScheduledTime(row.startTime, row.endTime)}</span>
                        </div>
                    )
                } else {
                    return (
                        <div className="time-cell unscheduled">
                            <span>Not scheduled</span>
                        </div>
                    )
                }
            },
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="action-cell">
                    <button
                        className={`action-button ${row.type === "live" ? "live-action" : ""}`}
                        onClick={() => handleStartTest(row)}
                    >
                        <CiPlay1 className="action-icon" />
                        {row.type === "live" ? "Join Now" : "Start Test"}
                    </button>
                </div>
            ),
        },
    ]

    return (
        <div className="dashboard-container">
            <div className="header-container">
            <div className="header-wrapper">
                <div className="header-titles">
                    <h1 className="dashboard-title">
                        <span className="title-icon">
                            <ClipboardCheck size={20} />
                        </span>
                     Tests
                        <span className="title-badge">2 Live</span>
                    </h1>
                    <p className="dashboard-subtitle">
                        View and manage your upcoming and available tests
                        <ChevronRight className="subtitle-arrow" size={16} />
                    </p>
                </div>

                {/* <div className="header-actions">
                    <button className="action-btn primary">
                        <Plus size={16} /> Create New Test
                    </button>
                    <button className="action-btn secondary">
                        <Filter size={16} /> Filter
                    </button>
                </div> */}
            </div>
            </div>

            <div className="test-card">
                <div className="test-tabs">
                    <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
                        All Tests
                    </button>
                    <button
                        className={`tab-button ${activeTab === "scheduled" ? "active" : ""}`}
                        onClick={() => setActiveTab("scheduled")}
                    >
                        Scheduled
                    </button>
                    <button className={`tab-button ${activeTab === "live" ? "active" : ""}`} onClick={() => setActiveTab("live")}>
                        Live
                    </button>
                    <button
                        className={`tab-button ${activeTab === "unscheduled" ? "active" : ""}`}
                        onClick={() => setActiveTab("unscheduled")}
                    >
                        Unscheduled
                    </button>
                </div>

                <div className="test-table">
                    <DataTable columns={columns} data={paginatedData} enableToggle={false} />
                </div>

                {showButtons && (
                    <div className="pagination-controls">
                        <PaginationButtons
                            filteredQuestions={filteredData}
                            rowsPerPage={rowsPerPage}
                            currentPage={currentPage}
                            loadMore={loadMore}
                            fullView={fullView}
                        />
                    </div>
                )}

                <div className="pagination-info">
                    <PaginationInfo
                        filteredQuestions={filteredData}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        label="Tests"
                    />
                </div>
            </div>
        </div>
    )
}

export default TestList

