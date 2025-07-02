
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import QuestionBankLayout from "../layouts/QuestionBankLayout";
import Questionindex from "../Components/institute-dashboard/QuestionBanks/Questionindex/Questionindex";
import Trashed from "../Components/institute-dashboard/QuestionBanks/Pages/Trashed/Trashed";
import Archived from "../Components/institute-dashboard/QuestionBanks/Pages/Archived/Archived";
import All from "../Components/institute-dashboard/QuestionBanks/Pages/All/All";
import QuestionsAdd from "../Components/institute-dashboard/QuestionBanks/QuestionsAdd/QuestionsAdd";

import QuestionDetail from "../Components/institute-dashboard/QuestionBanks/QuestionDetail/QuestionDetail";
import AddQuestionTrash from "../Components/institute-dashboard/QuestionBanks/QuestionsAdd/AddQuestionTrash/AddQuestionTrash";

const QuestionBankRoutes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);

  return (
    <div className="question-bank-layout">
      <div className="content-area">
        <Routes>
      
          <Route path="/" element={<QuestionBankLayout />}>
            <Route index element={<Questionindex />} />
            <Route path="Trashed" element={<Trashed />} />
            <Route path="Trashed/:id/add" element={<AddQuestionTrash />} />
            <Route path="Archived" element={<Archived />} />
            <Route path="All" element={<All />} />
            <Route path=":id/add" element={<QuestionsAdd />} />
            <Route path="question-bank/:id/question/:questionId" element={<QuestionDetail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default QuestionBankRoutes;
