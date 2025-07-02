// src/Components/institute-dashboard/ThreeTests/UnscheduledTest/UnscheduledTest.jsx
import React, { useState, useEffect } from "react";
import "../CurrentRunningTest/CurrentRunningTest.css";
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import { FileClock } from "lucide-react";

 const UnscheduledTest = ({ onViewDetails = () => { } }) => {
    const unscheduledTests = [
        {
            id: 1,
            name: "Advanced Mathematics",
            owner: "Dr. Jane Smith",
            doc: "01-01-2025",
            totalAttempts: "99",
            hoursAllotted: 2,
            status: "Writing Now",
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
        {
            id: 2,
            name: "Physics Basics",
            owner: "Dr. John Doe",
            doc: "02-01-2025",
            totalAttempts: "125",
            hoursAllotted: 3,
            status: "Writing Now",
            endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        },
        {
            id: 3,
            name: "Chemistry Fundamentals",
            owner: "Dr. Alice Johnson",
            doc: "03-01-2025",
            totalAttempts: "75",
            hoursAllotted: 1.5,
            status: "Writing Now",
            endTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
        },
    ];

    const [timeLeft, setTimeLeft] = useState({});

    function calculateTimeLeft(test) {
        const difference = test.endTime.getTime() - new Date().getTime();
        if (difference > 0) {
            return {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
                    .toString()
                    .padStart(2, "0"),
                minutes: Math.floor((difference / 1000 / 60) % 60)
                    .toString()
                    .padStart(2, "0"),
                seconds: Math.floor((difference / 1000) % 60)
                    .toString()
                    .padStart(2, "0"),
            };
        }
        return { hours: "00", minutes: "00", seconds: "00" };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTimeLeft = {};
            unscheduledTests.forEach((test) => {
                updatedTimeLeft[test.id] = calculateTimeLeft(test);
            });
            setTimeLeft(updatedTimeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

     // UnscheduledTest.jsx
     const handleRowClick = (row) => {
         console.log("Row clicked:", row);
         if (typeof onViewDetails === 'function') {
             onViewDetails(row.id);

         } else {
             console.error("onViewDetails is not a function");
         }
      };
    const columns = [
        {
            name: "Test Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Owner",
            selector: "owner",
            sortable: true,
        },
        {
            name: "Date of Creation",
            selector: "doc",
            sortable: true,
        },
        {
            name: "Total Attempts",
            selector: "totalAttempts",
            sortable: true,
        },
        {
            name: "Status",
            selector: "status",
            cell: (row) => (
                <span className="status-writing">{row.status}</span>
            ),
            sortable: true,
        },
    ];

    return (
        <div className="current-running-test">
            <div className="status-header">
                <div className="status-title status-title2">
                    <FileClock size={20} className="status-title-icon" />
                    <h3>Unscheduled Tests</h3>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={unscheduledTests}
                onRowClicked={handleRowClick}
                availableActions={[]}
                enableToggle={false}
                showColumnVisibility={false}
                fullViewMode={false}
            />
        </div>
    );
};

export default UnscheduledTest;