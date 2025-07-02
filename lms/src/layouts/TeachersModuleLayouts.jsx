import React, { useState } from 'react';
import TeachersSidebar from '../Components/institute-dashboard/Teachers/TeachersSideabr/TeachersSidebar'
import { Outlet } from "react-router-dom";

import './Layout.css'
const TeachersModuleLayouts = () => {
   const [teachersEmails, setTeachersEmails] = useState([]); // Shared state for teachers' emails
  return (
   <div className="layout-container">
      {/* Header */}
    
      {/* TopBar */}
     
    
      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Sidebar */}
        <TeachersSidebar setTeachersEmails={setTeachersEmails}/>{/* Pass setter */}


        {/* Page Content */}
        <main className="layout-content">
          <Outlet context={[teachersEmails, setTeachersEmails]}/>
        </main>
      </div>
    </div>
  )
}

export default TeachersModuleLayouts