// src/Components/institute-dashboard/ThreeTests/UpcomingTest/UpcomingTest.jsx
import React, { useState, useEffect } from "react";
import "./UpcommingTest.css";
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import { CalendarClock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpcomingTest = ({ onViewDetails }) => {
  const upcomingTests = [
    {
      id: 1,
      title: 1,
      name: "Advanced Mathematics",
      owner: "Dr. Jane Smith",
      hoursAllotted: 90,
      candidates: "45/60",
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      countdown: "2d4h23m",
      attendingStudents: [
        { email: "student1@example.com", joinTime: "09:00 AM" },
        { email: "student2@example.com", joinTime: "09:05 AM" },
      ],
    },
    {
      id: 2,
      title: 2,
      name: "Physics Basics",
      owner: "Dr. John Doe",
      hoursAllotted: 30,
      candidates: "28/30",
      countdown: "3d4h23m",
      startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
      ],
    },
    {
      id: 3,
      title: 3,
      name: "Physics Basics",
      owner: "Dr. John Doe",
      hoursAllotted: 120,
      candidates:" 52/55",
      countdown: "1d4h23m",
      startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
      ],
    },
  ];

  const [timeLeft, setTimeLeft] = useState({});
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [showTerminatePopup, setShowTerminatePopup] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [newTestDate, setNewTestDate] = useState(null);

  function calculateTimeLeft(test) {
    const difference = test.startTime.getTime() - new Date().getTime();
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
      upcomingTests.forEach((test) => {
        updatedTimeLeft[test.id] = calculateTimeLeft(test);
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRowClick = (row) => {
    if (typeof onViewDetails === 'function') {
      onViewDetails(row.id);
    } else {
      console.error("onViewDetails is not a function");
    }
  };

  const handleModifyClick = (e, row) => {
    e.stopPropagation();
    setSelectedTest(row);
    setNewTestDate(row.startTime);
    setShowModifyPopup(true);
  };

  const handleTerminateClick = (e, row) => {
    e.stopPropagation();
    setSelectedTest(row);
    setShowTerminatePopup(true);
  };

  const handleSaveChanges = () => {
    // Here you would typically update the test's start time in your state or API
    console.log(`Test ${selectedTest.id} new date:`, newTestDate);
    setShowModifyPopup(false);
  };

  const handleConfirmTerminate = () => {
    // Here you would typically terminate the test in your state or API
    console.log(`Terminating test ${selectedTest.id}`);
    setShowTerminatePopup(false);
  };

  const columns = [
    {
      name: "Test Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Test Date",
      selector: "startTime",
      cell: (row) => {
        const date = new Date(row.startTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
      sortable: true,
    },
    
    {
      name: "Duration",
      selector: "hoursAllotted",
      cell: (row) => `${row.hoursAllotted} Minutes`,
      sortable: true,
    },
    {
      name: "Attend/Enrolled",
      selector: "candidates",
      cell: (row) => `${row.candidates} `,
      sortable: true,
    },
    {
      name: "	Countdown",
      selector: "timer",
      cell: (row) =>`${row.countdown}`,
      sortable: false,
    },
   
  ];

  return (
    <>
   
    <div className="upcoming-test">
     
        <div className="status-header">
          <div className="status-title status-title2">
            <CalendarClock size={20} className="status-title-icon" />
            <h3>Upcoming Tests</h3>
          </div>
        </div>
      <DataTable
        columns={columns}
        data={upcomingTests}
        onRowClicked={handleRowClick}
        availableActions={[]}
        enableToggle={false}
        showColumnVisibility={false}
        fullViewMode={false}
      />

      {/* Modify Popup */}
      {showModifyPopup && (
        <div className="action-modal">
          <h3>Modify Test</h3>
          <p>Select a new time and date for the test:</p>
          <DatePicker
            selected={newTestDate}
            onChange={setNewTestDate}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            timeIntervals={15}
            className="date-time-picker"
            placeholderText="Enter Time And Date"
          />
          <button className="action-btn confirm" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button
            className="action-btn cancel"
            onClick={() => setShowModifyPopup(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Terminate Popup */}
      {showTerminatePopup && (
        <div className="action-modal">
          <h3>Terminate Test</h3>
          <p>Are you sure you want to terminate this test?</p>
          <button className="action-btn confirm" onClick={handleConfirmTerminate}>
            Yes, Terminate Test
          </button>
          <button
            className="action-btn cancel"
            onClick={() => setShowTerminatePopup(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default UpcomingTest;