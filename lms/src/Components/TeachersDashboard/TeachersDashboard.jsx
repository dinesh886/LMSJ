import React from "react";
import { Outlet } from "react-router-dom";
import TeachersSidebar from "./Components/TeachersSidebar/TeachersSidebar";
import TeachersHeader from "./Components/TeachersHeader/TeachersHeader";
import './TeachersDashboard.css'
const TeachersDashboard = () => {
    return (
        <div className="teachers-dashboard">
            <TeachersSidebar />
            <div className="main-content">
                <TeachersHeader />
                <div className="content">
                    <Outlet /> {/* This will render nested routes like TeachersHome, QuestionBanks, etc. */}
                </div>
            </div>
        </div>
    );
};

export default TeachersDashboard;