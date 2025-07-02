

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Home,
    FileText,
    BookOpen,
    List,
    Calendar,
    Bookmark,
    Target,
    Shield,
    FileCodeIcon as FileContract,
    RefreshCw,
    MessageCircle,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    User,
} from "lucide-react"
import './StudentSidebar.css';

const StudentSidebar = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [expandedSections, setExpandedSections] = useState({
        study: true,
        myContent: true,
        tools: true,
        company: false,
    })
    const location = useLocation()

    // Check if current route is active
    const isActive = (path) => {
        return location.pathname === path
    }

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {/* Mobile Toggle Button */}
            {isMobile && (
                <button className="sidebar-toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Sidebar">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            {/* Sidebar */}
            <div className={`student-sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <BookOpen className="logo-icon" />
                        <h2>EduPro</h2>
                    </div>
                    {!isMobile && (
                        <button className="collapse-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Collapse Sidebar">
                            {isOpen ? <ChevronRight size={20} /> : <ChevronRight size={20} className="rotate-180" />}
                        </button>
                    )}
                </div>

                <div className="user-profile">
                    <div className="avatar">
                        <User size={24} />
                    </div>
                    {isOpen && (
                        <div className="user-info">
                            <h3>John Doe</h3>
                            <p>Student</p>
                        </div>
                    )}
                </div>

                <div className="sidebar-content">
                    {/* Main Navigation */}
                    <ul className="nav-list main-nav">
                        <li className={isActive("/student/dashboard") ? "active" : ""}>
                            <Link to="/student/dashboard">
                                <Home size={20} />
                                {isOpen && <span>Dashboard</span>}
                            </Link>
                        </li>
                        <li className={isActive("/student/tests") ? "active" : ""}>
                            <Link to="/student/tests">
                                <FileText size={20} />
                                {isOpen && <span>Tests</span>}
                            </Link>
                        </li>
                    </ul>


                    {/* Study Section */}
                    <div className="sidebar-section">
                        {isOpen && (
                            <div className="section-header" onClick={() => toggleSection("study")}>
                                <h3>Study</h3>
                                <ChevronDown size={16} className={expandedSections.study ? "rotate-180" : ""} />
                            </div>
                        )}
                        {(!isOpen || expandedSections.study) && (
                            <ul className="nav-list">
                                <li className={isActive("/student/previous-year") ? "active" : ""}>
                                    <Link to="/student/previous-year">
                                        <Calendar size={20} />
                                        {isOpen && <span>Previous Year Questions</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/student/ncert") ? "active" : ""}>
                                    <Link to="/student/ncert">
                                        <BookOpen size={20} />
                                        {isOpen && <span>NCERT</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/student/syllabus") ? "active" : ""}>
                                    <Link to="/student/syllabus">
                                        <List size={20} />
                                        {isOpen && <span>Syllabus</span>}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* My Content Section */}
                    <div className="sidebar-section">
                        {isOpen && (
                            <div className="section-header" onClick={() => toggleSection("myContent")}>
                                <h3>My Content</h3>
                                <ChevronDown size={16} className={expandedSections.myContent ? "rotate-180" : ""} />
                            </div>
                        )}
                        {(!isOpen || expandedSections.myContent) && (
                            <ul className="nav-list">
                                <li className={isActive("/student/my-tests") ? "active" : ""}>
                                    <Link to="/student/my-tests">
                                        <FileText size={20} />
                                        {isOpen && <span>My Tests</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/student/bookmarks") ? "active" : ""}>
                                    <Link to="/student/bookmarks">
                                        <Bookmark size={20} />
                                        {isOpen && <span>Bookmark Questions</span>}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Tools Section */}
                    <div className="sidebar-section">
                        {isOpen && (
                            <div className="section-header" onClick={() => toggleSection("tools")}>
                                <h3>Tools</h3>
                                <ChevronDown size={16} className={expandedSections.tools ? "rotate-180" : ""} />
                            </div>
                        )}
                        {(!isOpen || expandedSections.tools) && (
                            <ul className="nav-list">
                                <li className={isActive("/student/daily-goals") ? "active" : ""}>
                                    <Link to="/student/daily-goals">
                                        <Target size={20} />
                                        {isOpen && <span>Daily Goals</span>}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Company Section */}
                    <div className="sidebar-section">
                        {isOpen && (
                            <div className="section-header" onClick={() => toggleSection("company")}>
                                <h3>Company</h3>
                                <ChevronDown size={16} className={expandedSections.company ? "rotate-180" : ""} />
                            </div>
                        )}
                        {(!isOpen || expandedSections.company) && (
                            <ul className="nav-list">
                                <li className={isActive("/privacy-policy") ? "active" : ""}>
                                    <Link to="/privacy-policy">
                                        <Shield size={20} />
                                        {isOpen && <span>Privacy Policy</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/terms-of-service") ? "active" : ""}>
                                    <Link to="/terms-of-service">
                                        <FileContract size={20} />
                                        {isOpen && <span>Terms of Service</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/refund-policy") ? "active" : ""}>
                                    <Link to="/refund-policy">
                                        <RefreshCw size={20} />
                                        {isOpen && <span>Refund Policy</span>}
                                    </Link>
                                </li>
                                <li className={isActive("/contact-us") ? "active" : ""}>
                                    <Link to="/contact-us">
                                        <MessageCircle size={20} />
                                        {isOpen && <span>Contact Us</span>}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentSidebar





