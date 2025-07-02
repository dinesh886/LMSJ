
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardIndex from "../Components/institute-dashboard/dashboard/DashboardIndex/DashboardIndex";
import General from "../Components/institute-dashboard/dashboard/Pages/General/General";
import Scheduled from "../Components/institute-dashboard/dashboard/Pages/Sheduled/Sheduled";
import UpcomingTestDetails from "../Components/institute-dashboard/ThreeTests/UpcomingTestDetails/UpcomingTestDetails";
import Unscheduled from "../Components/institute-dashboard/dashboard/Pages/UnScheduled/UnScheduled";
import CurrentRunningTestDetails from "../Components/institute-dashboard/ThreeTests/Current-Running-Test-Details/CurrentRunningTestDetails";
import CompletedTestDetails from "../Components/institute-dashboard/ThreeTests/Completed-test-details/CompletedTestDetails";
import TestStudentOverview from "../Components/institute-dashboard/ThreeTests/Test-Student-Overview/TestStudentOverview";
import UnscheduledTestDetails from "../Components/institute-dashboard/ThreeTests/UnscheduledTestDetails/UnscheduledTestDetails";

const MainDashboard = () => {
    return (
        <Routes>
            <Route path="*" element={<DashboardLayout />}> 

                <Route index element={<DashboardIndex />} />
                <Route path="general" element={<General />} />
                <Route path="scheduled" element={<Scheduled />} />
                <Route path="unscheduled" element={<Unscheduled />} />

                <Route path="unscheduled/unscheduledtest-details/:id" element={<UnscheduledTestDetails />} />
                <Route path="scheduled/current-running-test-details/:id" element={<CurrentRunningTestDetails />} />
                <Route path="scheduled/upcoming-test-details/:id" element={<UpcomingTestDetails />} />
                <Route path="completed-test-details/:testId">
                    <Route index element={<CompletedTestDetails />} />
                    <Route path="teststudent-overview/:studentId" element={<TestStudentOverview />} />
                </Route>
            </Route>
        </Routes>
    );
};


export default MainDashboard;