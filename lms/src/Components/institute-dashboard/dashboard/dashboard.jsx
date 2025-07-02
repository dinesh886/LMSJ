import React from 'react';
import {
    Users,
    GraduationCap,
    BookOpen,
    FileText,
    Bookmark,
    ClipboardList,
    Home,
    PieChart
} from 'lucide-react';
import './dashboard.css';
import Header from '../../header/header';

const DashBoard = () => {
    const statsData = [
        {
            title: "Teachers",
            value: "12/20",
            icon: <Users size={24} />,
            label: "Teachers",
            color: "#3B82F6" // blue
        },
        {
            title: "Students",
            value: "135/500",
            icon: <GraduationCap size={24} />,
            label: "Students",
            color: "#3B82F6" // emerald
        },
        {
            title: "Question Banks",
            value: "56/100",
            icon: <BookOpen size={24} />,
            label: "QB",
            color: "#3B82F6" // amber
        },
        {
            title: "Tests Count",
            value: "154/220",
            icon: <FileText size={24} />,
            label: "Tests",
            color: "#3B82F6" // violet
        },
        {
            title: "Classes",
            value: "12/20",
            icon: <Bookmark size={24} />,
            label: "Classes",
            color: "#3B82F6" // pink
        },
        {
            title: "Questions",
            value: "1356/3000",
            icon: <ClipboardList size={24} />,
            label: "Questions",
            color: "#3B82F6" // indigo
        }
    ];

    return (
        <>
            {/* <Header /> */}
        <section className="dashboard-content">
          <div>
                    <h3 className='dashboardheading'>Institute Dashboard</h3>
          </div>

                <div className="dashboard-stats-grid">
                {statsData.map((stat, index) => (
                    <div className="dashboard-stat-card" key={index}>
                        <div className="dashboard-stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <p className="stat-title">{stat.title}</p>
                            <h3 className="dashboard-stat-value">{stat.value} {stat.label}</h3>
                            {/* <span className="dashboard-stat-label"></span> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
};

export default DashBoard;