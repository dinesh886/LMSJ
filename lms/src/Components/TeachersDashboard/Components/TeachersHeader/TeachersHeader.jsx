"use client"

import { useState, useRef, useEffect } from "react"
import './TeachersHeader.css'

const TeachersHeader = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [isProfileExpanded, setIsProfileExpanded] = useState(false)
    const profileDropdownRef = useRef(null)

    const toggleNav = () => {
        setIsNavExpanded(!isNavExpanded)
        if (isProfileExpanded) setIsProfileExpanded(false)
    }

    const toggleProfile = () => {
        setIsProfileExpanded(!isProfileExpanded)
        if (isNavExpanded) setIsNavExpanded(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileExpanded(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Close mobile nav when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && isNavExpanded) {
                setIsNavExpanded(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [isNavExpanded])

    return (
        <header className="header-container">
            <div className="container-fluid header-inner">
                <div className="header-content">
                    {/* Logo - Left Side */}
                    <div className="logo-container">
                        <a href="/" className="logo-link">
                            <img src="/placeholder.svg?height=32&width=120" alt="Logo" className="logo-image" />
                        </a>
                    </div>

                    {/* Center Navigation - Desktop */}
                    <div className="nav-center d-none d-lg-flex">
                        <nav className="main-nav">
                            <a href="/" className="nav-link active" aria-current="page">
                                Home
                            </a>
                            <a href="/question-banks" className="nav-link">
                                Question Banks
                            </a>
                            <a href="/tests" className="nav-link">
                                Tests
                            </a>
                        </nav>
                    </div>

                    {/* Right Side - Profile Management */}
                    <div className="profile-section">
                        <div className="profile-dropdown" ref={profileDropdownRef}>
                            <button className="profile-button" onClick={toggleProfile} aria-expanded={isProfileExpanded}>
                                <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="profile-img" />
                                <span className="profile-name d-none d-md-inline-block">John Doe</span>
                                <i className={`bi bi-chevron-down profile-chevron ${isProfileExpanded ? "rotated" : ""}`}></i>
                            </button>

                            {/* Profile Dropdown */}
                            <div className={`dropdown-menu profile-menu ${isProfileExpanded ? "show" : ""}`}>
                                <div className="dropdown-header profile-header">
                                    <div className="profile-header-content">
                                        <img src="/placeholder.svg?height=50&width=50" alt="Profile" className="profile-header-img" />
                                        <div className="profile-header-info">
                                            <p className="profile-header-name">John Doe</p>
                                            <p className="profile-header-email">john.doe@example.com</p>
                                        </div>
                                    </div>
                                </div>

                                <a href="/profile" className="dropdown-item">
                                    <i className="bi bi-person me-2"></i> My Profile
                                </a>
                                <a href="/account" className="dropdown-item">
                                    <i className="bi bi-gear me-2"></i> Account Settings
                                </a>
                                <a href="/dashboard" className="dropdown-item">
                                    <i className="bi bi-speedometer me-2"></i> Dashboard
                                </a>
                                <a href="/courses" className="dropdown-item">
                                    <i className="bi bi-book me-2"></i> My Courses
                                </a>
                                <a href="/grades" className="dropdown-item">
                                    <i className="bi bi-award me-2"></i> Grades & Certificates
                                </a>

                                <div className="dropdown-divider"></div>

                                <a href="/help" className="dropdown-item">
                                    <i className="bi bi-question-circle me-2"></i> Help Center
                                </a>
                                <a href="/logout" className="dropdown-item text-danger">
                                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="navbar-toggler d-lg-none ms-3"
                            onClick={toggleNav}
                            aria-expanded={isNavExpanded}
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav d-lg-none ${isNavExpanded ? "show" : ""}`}>
                <div className="mobile-nav-items">
                    <a href="/" className="mobile-nav-link active" aria-current="page">
                        <i className="bi bi-house-door me-2"></i>
                        Home
                    </a>
                    <a href="/question-banks" className="mobile-nav-link">
                        <i className="bi bi-collection me-2"></i>
                        Question Banks
                    </a>
                    <a href="/tests" className="mobile-nav-link">
                        <i className="bi bi-clipboard-check me-2"></i>
                        Tests
                    </a>
                </div>
            </div>
        </header>
    )
}

export default TeachersHeader

