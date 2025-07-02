"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  DollarSign,
  Users,
  ClipboardList,
  UserCheck,
  FolderOpen,
  User,
  Power,
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  BookOpen,
  FileText,
  Menu,
  CircleDollarSign,
  BookOpenCheck,
  X,
} from "lucide-react"
import "./sidemenu.css"

const SidebarMenu = () => {
  const location = useLocation()
  const [isManageHomeVisible, setManageHomeVisible] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const currentPath = location.pathname

  const isActive = (section) => {
    const path = currentPath;

    switch (section) {
      case "general":
        return path === "/";

      case "scheduled":
        return (
          path.startsWith("/maindashboard/scheduled") ||
          path.includes("/current-running-test-details/") ||
          path.includes("/upcoming-test-details/") ||
          path.includes("/completed-test-details/")
        );

      case "unscheduled":
        return (
          path.startsWith("/maindashboard/unscheduled") ||
          path.includes("/unscheduledtest-details/")
        );

      case "subscription":
        return path === "/maindashboard/subscription";

      case "teachers":
        return path.includes("/Teachers");

      default:
        return path.includes(section);
    }
  }
  
  
  

  const toggleManageHomeVisibility = () => {
    setManageHomeVisible(!isManageHomeVisible)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleCloseMobile = () => {
    setIsMobileOpen(false)
  }

  return (
    <div className="sidebar-wrapper">
      {isMobileOpen && <div className="mobile-overlay" onClick={handleCloseMobile} />}

      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Main Navigation">
        <div className="test-sidebar-header">
          <span className="sidebar-letters">LMS Institute</span>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li className="sidebar-section-title">Dashboard</li>

            <li>
              <Link
                to="/"
                className={`sidebar-contents ${isActive("general") ? "active" : ""}`}
                aria-label="General"
                onClick={handleCloseMobile}
              >
                <Users className="icon" size={20} />
                <span className="sidebar-letters">General</span>
              </Link>
            </li>

            <li>
              <Link
                to="/maindashboard/scheduled"

                className={`sidebar-contents ${isActive("scheduled") ? "active" : ""}`}
                aria-label="scheduled"
                onClick={handleCloseMobile}
              >
                <UserCheck className="icon" size={20} />
                <span className="sidebar-letters">Scheduled</span>
              </Link>

            </li>

            <li>
              <Link
                to="/maindashboard/unscheduled"
                className={`sidebar-contents ${currentPath === "/maindashboard/unscheduled" ? "active" : ""}`}
                aria-label="UnScheduled"
                onClick={handleCloseMobile}
              >
                <ClipboardList className="icon" size={20} />
                <span className="sidebar-letters">UnScheduled</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Teachers"
                className={`sidebar-contents ${currentPath.includes("/Teachers") ? "active" : ""}`}
                aria-label="Teachers"
                onClick={handleCloseMobile}
              >
                <BookOpenCheck className="icon" size={20} />
                <span className="sidebar-letters">Teachers</span>
              </Link>
            </li>

            <li>
              <Link
                to="/subscription"
                className={`sidebar-contents ${currentPath === "/subscription" ? "active" : ""}`}
                aria-label="Subscription"
                onClick={handleCloseMobile}
              >
                <CircleDollarSign className="icon" size={20} />
                <span className="sidebar-letters">Subscription</span>
              </Link>
            </li>

            <li className="sidebar-section-title" onClick={toggleManageHomeVisibility}>
              Manage Home
            </li>

            {isManageHomeVisible && (
              <ul className="test-sidebar-submenu">
                <li>
                  <Link
                    to="/home"
                    className={`sidebar-contents ${currentPath === "/home" ? "active" : ""}`}
                    aria-label="Home"
                    onClick={handleCloseMobile}
                  >
                    <Home className="icon" size={20} />
                    <span className="sidebar-letters">Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={`sidebar-contents ${currentPath === "/about" ? "active" : ""}`}
                    aria-label="About"
                    onClick={handleCloseMobile}
                  >
                    <Info className="icon" size={20} />
                    <span className="sidebar-letters">About</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses"
                    className={`sidebar-contents ${currentPath === "/courses" ? "active" : ""}`}
                    aria-label="Courses"
                    onClick={handleCloseMobile}
                  >
                    <BookOpen className="icon" size={20} />
                    <span className="sidebar-letters">Courses</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blog-manage"
                    className={`sidebar-contents ${currentPath === "/blog-manage" ? "active" : ""}`}
                    aria-label="Blog"
                    onClick={handleCloseMobile}
                  >
                    <FileText className="icon" size={20} />
                    <span className="sidebar-letters">Blog</span>
                  </Link>
                </li>
              </ul>
            )}

            <li className="sidebar-section-title">Profile Info</li>

            <li>
              <Link
                to="/profile"
                className={`sidebar-contents ${currentPath === "/profile" ? "active" : ""}`}
                aria-label="Profile"
                onClick={handleCloseMobile}
              >
                <User className="icon" size={20} />
                <span className="sidebar-letters">Profile</span>
              </Link>
            </li>

            <li>
              <Link
                to="/logout"
                className="sidebar-contents"
                aria-label="Logout"
                onClick={handleCloseMobile}
              >
                <Power className="icon" size={20} />
                <span className="sidebar-letters">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <button
        className={`mobile-toggle-btn ${isMobileOpen ? "sidebar-open" : ""}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  )
}

export default SidebarMenu
