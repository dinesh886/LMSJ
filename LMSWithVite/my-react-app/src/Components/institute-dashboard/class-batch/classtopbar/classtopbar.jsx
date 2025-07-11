import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./classtopbar.css";
import { LayoutDashboard, BookOpen, Database, GraduationCap, Users } from 'lucide-react';

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tests", href: "/test", icon: BookOpen },
  { name: "Question Banks", href: "/QuestionBank", icon: Database },
  { name: "Classes", href: "/class", icon: GraduationCap },
  { name: "Teachers", href: "/teachers", icon: Users },
];

const TopBar = () => {
  const location = useLocation();

  const isActive = (href) => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const itemPath = href.replace(/\/$/, "");
    return currentPath.toLowerCase() === itemPath.toLowerCase();
  };

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-item ${isActive(item.href) ? "active" : ""}`}
            >
              <div className="nav-item-content">
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
