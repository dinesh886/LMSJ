// src/Components/institute-dashboard/ThreeTests/CurrentRunningTest/CurrentRunningTest.jsx
import React, { useState, useEffect } from "react";
import "./CurrentRunningTest.css";
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import {
  FileClock
} from "lucide-react"

const CurrentRunningTest = ({ onViewDetails }) => {
  const currentTests = [
    {
      id: 1,
      title: 1,
      name: "Advanced Mathematics",
      owner: "Dr. Jane Smith",
      minutesAllotted: 90, // Changed from hoursAllotted to minutesAllotted
      attend: "45/60",
      endTime: new Date(Date.now() + 90 * 60 * 1000), // 90 minutes in milliseconds
      attendingStudents: [
        { email: "student1@example.com", joinTime: "09:00 AM" },
        { email: "student2@example.com", joinTime: "09:05 AM" },
        { email: "student3@example.com", joinTime: "09:15 AM" },
        { email: "student4@example.com", joinTime: "09:25 AM" },
        { email: "student5@example.com", joinTime: "09:25 AM" },
        { email: "student6@example.com", joinTime: "09:27 AM" },
      ],
    },
    {
      id: 2,
      title: 2,
      name: "Physics Basics",
      owner: "Dr. John Doe",
      minutesAllotted: 30, // Changed from hoursAllotted to minutesAllotted
      attend: "28/30",
      endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes in milliseconds
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
        { email: "studentC@example.com", joinTime: "10:15 AM" },
      ],
    },
    {
      id: 3,
      title: 3,
      name: "Chemistry Fundamentals",
      owner: "Dr. John Doe",
      minutesAllotted: 120, // Changed from hoursAllotted to minutesAllotted
      attend: "52/55",
      endTime: new Date(Date.now() + 120 * 60 * 1000), // 120 minutes in milliseconds
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
        { email: "studentC@example.com", joinTime: "10:15 AM" },
      ],
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
      currentTests.forEach((test) => {
        updatedTimeLeft[test.id] = calculateTimeLeft(test);
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      name: "Test Date",
      selector: "endTime",
      cell: (row) => {
        const date = new Date(row.endTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // formatted as DD-MM-YYYY
      },
      sortable: true,
    },
    {
      name: "Duration",
      selector: "minutesAllotted",
      cell: (row) => `${row.minutesAllotted} minutes`, // Updated to show minutes
      sortable: true,
    },
    {
      name: "Attend/Enrolled",
      selector: "attendingStudents",
      cell: (row) => `${row.attend} `,
      sortable: true,
    },
    {
      name: "Timer (Counter)",
      selector: "timer",
      cell: (row) => (
        <span className="timer">
          {timeLeft[row.id]
            ? `${timeLeft[row.id].hours}:${timeLeft[row.id].minutes}:${timeLeft[row.id].seconds}`
            : "00:00:00"}
        </span>
      ),
      sortable: false,
    },
  ];

  return (
    <>
  
    <div className="current-running-test">
        <div className="status-header">
          <div className="status-title status-title2">
            <FileClock size={20} className="status-title-icon" />
            <h3>Ongoing Tests</h3>
          </div>
        </div>
      <DataTable
        columns={columns}
        data={currentTests}
        onRowClicked={handleRowClick}
        availableActions={[]}
        enableToggle={false}
        showColumnVisibility={false}
        fullViewMode={false}
      />
    </div>
    </>
  );
};

export default CurrentRunningTest;