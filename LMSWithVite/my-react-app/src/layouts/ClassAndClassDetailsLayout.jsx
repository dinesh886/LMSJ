import React from "react";

import ClassSideMenu from "../Components/institute-dashboard/class-batch/classsidemenu/classsidemenu";
import ClassDetailPageSideMenu from "../Components/institute-dashboard/class-batch/classdetailspage/ClassDetailPageSidemenu/classdetailpagesidemenu";
import { Outlet, useLocation } from "react-router-dom";

const ClassAndClassDetailsLayout = () => {
  const location = useLocation();
  const isClassDetailPage = location.pathname.includes("/classdetailpage");

  return (
    <div className="layout-container">
      <div className="layout-main">
        {isClassDetailPage ? (
          <ClassDetailPageSideMenu className="class-detail-sidebar" />
        ) : (
          <ClassSideMenu className="class-sidebar" />
        )}
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClassAndClassDetailsLayout;
