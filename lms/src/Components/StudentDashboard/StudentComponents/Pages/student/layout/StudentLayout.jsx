import React from 'react';
import StudentSidebar from '../../../sidebar/StudentSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import './StudentLayout.css';

const StudentLayout = () => {
    const location = useLocation();
    const hideSidebar = location.pathname.includes('/tests/') && location.pathname.includes('/attempt');

    return (
        <div className="student-layout">
            {!hideSidebar && <StudentSidebar />}
            <div className={`student-content ${hideSidebar ? 'full-width' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default StudentLayout;