import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../Components/StudentDashboard/StudentComponents/Pages/student/layout/StudentLayout';
import TestList from '../Components/StudentDashboard/StudentComponents/Pages/student/Tests/TestList';
import TestAttempt from '../Components/StudentDashboard/StudentComponents/Pages/student/Tests/TestAttempt';
import StudentMainDashboard from '../Components/StudentDashboard/StudentComponents/Pages/student/Dashboard/StudentMainDashboard';

const StudentRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentLayout />}>
                <Route path="dashboard" element={<StudentMainDashboard />} />
                <Route path="tests" element={<TestList />} />
                <Route path="tests/:testId/attempt" element={<TestAttempt />} />
            </Route>
        </Routes>
    );
};

export default StudentRoutes;
