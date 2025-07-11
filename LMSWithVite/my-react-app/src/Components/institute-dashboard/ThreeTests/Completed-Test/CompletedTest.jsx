import React, { useState } from "react";
import "./CompletedTest.css";
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import { FileCheck2 } from "lucide-react";
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";

const CompletedTest = ({ onViewDetails }) => {
    // Pagination state
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [fullViewMode, setFullViewMode] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const searchPlaceholder = "Search tests...";

    const completedTests = [
        {
            id: 1,
            name: "Advanced Mathematics",
            owner: "Dr. Jane Smith",
            duration: 120,
            startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
            enrolledStudents: 60,
            attendedStudents: 58,
            hoursUsed: 116
        },
        {
            id: 2,
            name: "Physics Basics",
            owner: "Dr. John Doe",
            duration: 180,
            startTime: new Date(Date.now() - 72 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
            enrolledStudents: 45,
            attendedStudents: 42,
            hoursUsed: 170
        },
        {
            id: 3,
            name: "Chemistry Fundamentals",
            owner: "Dr. Alice Johnson",
            duration: 90,
            startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
            enrolledStudents: 30,
            attendedStudents: 28,
            hoursUsed: 85
        },
        {
            id: 4,
            name: "Biology Advanced",
            owner: "Dr. Robert Brown",
            duration: 150,
            startTime: new Date(Date.now() - 96 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 72 * 60 * 60 * 1000),
            enrolledStudents: 35,
            attendedStudents: 32,
            hoursUsed: 140
        },
        {
            id: 5,
            name: "Computer Science",
            owner: "Dr. Emily White",
            duration: 120,
            startTime: new Date(Date.now() - 120 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 96 * 60 * 60 * 1000),
            enrolledStudents: 40,
            attendedStudents: 38,
            hoursUsed: 115
        },
        {
            id: 6,
            name: "English Literature",
            owner: "Dr. Michael Green",
            duration: 90,
            startTime: new Date(Date.now() - 144 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 120 * 60 * 60 * 1000),
            enrolledStudents: 25,
            attendedStudents: 23,
            hoursUsed: 85
        }
    ];

    // Filter tests based on search query
    const filteredTests = completedTests.filter(test => {
        const searchLower = searchQuery.toLowerCase();
        return (
            test.name.toLowerCase().includes(searchLower) ||
            test.owner.toLowerCase().includes(searchLower) ||
            test.duration.toString().includes(searchQuery) ||
            test.enrolledStudents.toString().includes(searchQuery) ||
            test.attendedStudents.toString().includes(searchQuery) ||
            test.hoursUsed.toString().includes(searchQuery)
        );
    });


    // Get current page data
    const getCurrentPageData = () => {
        if (fullViewMode) {
            return filteredTests;
        }
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredTests.slice(startIndex, startIndex + rowsPerPage);
    };

    // Check if we should show pagination buttons
    const showPaginationButtons = !fullViewMode && rowsPerPage < filteredTests.length;

    // Pagination functions
    const loadMore = () => {
        const newRows = rowsPerPage + 5;
        setRowsPerPage(Math.min(newRows, filteredTests.length));
    };

    const toggleFullView = () => {
        if (!fullViewMode) {
            // Enter Full View mode
            setRowsPerPage(filteredTests.length);
        } else {
            // Exit Full View mode
            setRowsPerPage(5);
        }
        setFullViewMode(!fullViewMode);
    };

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };
    const handleRowClick = (row) => {
        if (typeof onViewDetails === 'function') {
            onViewDetails(row.id);
        }
    };

    const columns = [
        {
            name: "Test Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Date",
            selector: "endTime",
            cell: (row) => {
                const date = new Date(row.endTime);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
                const year = date.getFullYear();
                return `${day}-${month}-${year}`; // format: DD-MM-YYYY
            },
            sortable: true,
        },
          
        {
            name: "Duration",
            selector: "duration",
            cell: (row) => `${row.duration} minutes`,
            sortable: true,
        },
        {
            name: "Participation",
            selector: "participation",
            cell: (row) => {
                const percentage = (row.attendedStudents / row.enrolledStudents * 100).toFixed(1);
                return `${row.attendedStudents}/${row.enrolledStudents} (${percentage}%)`;
            },
            sortable: true,
        },
        {
            name: "Hours Used",
            selector: "hoursUsed",
            cell: (row) => `${row.hoursUsed} `,
            sortable: true,
        },
    ];

    return (
        <>
           

            <div className="completed-test">
                <div className="status-header">
                    <div className="status-title status-title2">
                        <FileCheck2 size={20} className="status-title-icon" />
                        <h3>Completed Tests</h3>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={getCurrentPageData()}
                    onRowClicked={handleRowClick}
                    availableActions={["download"]}
                    enableToggle={false}
                    fullViewMode={fullViewMode}
                    searchoption={true}
                    searchQuery={searchQuery}
                    searchPlaceholder={searchPlaceholder}
                    onSearchChange={handleSearchChange}
                />
            </div>

            {/* Pagination components */}
            {showPaginationButtons && (
                <PaginationButtons
                    filteredQuestions={filteredTests}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    loadMore={loadMore}
                    fullView={toggleFullView}
                    fullViewMode={fullViewMode}
                />
            )}

            <PaginationInfo
                filteredQuestions={filteredTests}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                label="Tests"
                totalItems={completedTests.length}
                isSearching={searchQuery.length > 0}
            />
        </>
    );
};

export default CompletedTest;