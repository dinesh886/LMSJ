import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFrown } from 'react-icons/fi';
import './PathLostPage.css'
const PathLostPage = () => {
    const navigate = useNavigate();

    return (
        <div className="navigation-mishap-container">
            <div className="lost-in-knowledge-space">
                <div className="digital-abyss-content">
                    <div className="disconnected-module-icon">
                        <FiFrown size={80} />
                    </div>
                    <h1 className="route-unavailable-heading">Learning Path Interrupted</h1>
                    <p className="course-not-found-text">
                        The educational module you're seeking has either been archived or hasn't been created yet.
                    </p>
                    <p className="dashboard-redirect-suggestion">
                        Let's get you back to your learning dashboard.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="return-to-curriculum-button"
                    >
                        <FiArrowLeft className="button-icon" />
                        Back to Learning Hub
                    </button>
                </div>

                <div className="knowledge-graph-visual">
                    <div className="node node--central"></div>
                    <div className="node node--orbiting"></div>
                    <div className="node node--orbiting"></div>
                    <div className="node node--orbiting"></div>
                    <div className="connection connection--1"></div>
                    <div className="connection connection--2"></div>
                    <div className="connection connection--3"></div>
                </div>
            </div>
        </div>
    );
};

export default PathLostPage;