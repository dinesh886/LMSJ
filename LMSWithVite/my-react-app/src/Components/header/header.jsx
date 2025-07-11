"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { LayoutDashboard, BookOpen, Database, GraduationCap, Users, CircleUser } from 'lucide-react'
import "./header.css"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tests", href: "/test", icon: BookOpen },
  { name: "Question Banks", href: "/QuestionBank", icon: Database },
  { name: "Classes", href: "/class", icon: GraduationCap },
  { name: "Teachers", href: "/teachers", icon: Users },
]

const Header = () => {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSettingsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsSettingsExpanded(!isSettingsExpanded)
  }

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <nav className="nav-menu">
          {navItems.map((item) => {
            const isDashboard = item.href === "/"
            const isActiveDashboard = isDashboard && (
              location.pathname === "/" ||
              location.pathname.startsWith("/maindashboard") ||
              location.pathname === "/subscription"
            )

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav-item ${isActive || isActiveDashboard ? "active" : ""}`}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="header-right2" ref={dropdownRef}>
          <button className="header-settings-button" onClick={toggleDropdown} aria-label="User menu">
            <CircleUser className="header-profile-icon" />
            <p className="admin-label">Admin</p>
          </button>


          {isSettingsExpanded && (
            <div className={`settings-dropdown ${isMobile ? "mobile" : ""}`}>
              <a href="/profile" className="header-dropdown-item">My Profile</a>
              <a href="/account" className="header-dropdown-item">Account Settings</a>
              <a href="/dashboard" className="header-dropdown-item">Dashboard</a>
              <a href="/courses" className="header-dropdown-item">My Courses</a>
              <div className="divider2"></div>
              <a href="/help" className="header-dropdown-item">Help Center</a>
              <a href="/logout" className="header-dropdown-item logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
