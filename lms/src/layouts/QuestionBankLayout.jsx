
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AddQuestionSidebar from '../Components/institute-dashboard/QuestionBanks/QuestionsAdd/AddQuestionSidebar/AddQuestionSidebar';
import Sidebar from '../Components/institute-dashboard/QuestionBanks/Sidebar/Sidebar';
import './Layout.css';

const QuestionBankLayout = () => {
  const location = useLocation();
  const isQuestionsAdd = location.pathname.includes("/add");

  return (
    <div className="layout-container">
      <div className="layout-main">
        {isQuestionsAdd ? <AddQuestionSidebar /> : <Sidebar />}
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default QuestionBankLayout;
