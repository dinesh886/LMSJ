import React from "react";
import { Link } from "react-router-dom";


const TeachersSidebar = () => {
    return (
        <nav className="test-sidebar-container">
            <div className="test-sidebar-header">
                <div className="w-100 d-flex justify-content-center">
                    <button
                      
                        className=" allbuttons"
                        aria-label="Create New Test"
                    >
                        {/* <FaPlus className="icon" /> */}
                        <span className="sidebar-letters ">New Test</span>
                    </button>

                </div>

            </div>
            <div className="test-sidebar-section">
                <ul className="test-sidebar-menu">
                    <li><Link to="/teachers" className="sidebar-contents"> Home</Link></li>
                    <li><Link to="/teachers/question-banks" className="sidebar-contents"> Question Banks</Link></li>
                    <li><Link to="/teachers/tests" className="sidebar-contents"> Tests</Link></li>
                </ul>
                </div>
           
        </nav>
    );
};

export default TeachersSidebar;
