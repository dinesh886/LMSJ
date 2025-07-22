
import { Outlet } from "react-router-dom";
import Header from "../Components/header/header";
import SidebarMenu from "../Components/institute-dashboard/dashboard/sidebar/sidemenu";


const DashboardLayout = () => {
  return (
    <div className="layout-container">
    {/* Header */}
   
      <Header />
  
    {/* Main Content Area */}
    <div className="layout-main">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Page Content */}
      <main className="layout-content">
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
    </div>
  </div>
  );
};

export default DashboardLayout;