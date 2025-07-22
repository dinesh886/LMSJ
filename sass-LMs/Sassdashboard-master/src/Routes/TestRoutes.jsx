// src/Components/Test/Routes/TestRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import TestLayout from "../layouts/TestLayout";

import Alltest from "../Components/institute-dashboard/Test/Pages/AllTest/Alltest";
import SharedWithMe from "../Components/institute-dashboard/Test//Pages/SharedWithMe/SharedWithMe";
import Dispatched from "../Components/institute-dashboard/Test/Pages/Dispatched/Dispatched";
import Undispatched from "../Components/institute-dashboard/Test/Pages/Undispatched/Undispatched";
import Archived from "../Components/institute-dashboard/Test/Pages/Archived/Archived";
import Trashed from "../Components/institute-dashboard/Test/Pages/Trashed/Trashed";
import TestAdd from "../Components/institute-dashboard/Test/TestAdd/TestAdd";
import TestQuestionAdd from "../Components/institute-dashboard/Test/TestQuestionAdd/TestQuestionAdd";
import QuestionView from "../Components/institute-dashboard/Test/QuestionsViewPage/QuestionsViewPage";
import TestDetail from "../Components/institute-dashboard/Test/TestDetail/TestDetail";
import TestIndex from "../Components/institute-dashboard/Test/TestIndex/TestIndex";


const TestRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<TestLayout />}>
        <Route index element={<TestIndex />} />
        <Route path="alltest" element={<Alltest />} />
        <Route path="shared-with-me" element={<SharedWithMe />} />
        <Route path="dispatched" element={<Dispatched />} />
        <Route path="undispatched" element={<Undispatched />} />
        <Route path="archived" element={<Archived />} />
        <Route path="trashed" element={<Trashed />} />
        <Route path=":id/movetest" element={<TestAdd />} />
        <Route path=":id/movetest/testquestionadd" element={<TestQuestionAdd />} />
        <Route path=":id/movetest/viewquestions" element={<QuestionView />} />
        <Route path="test/:id/test/:testId" element={<TestDetail />} />
      </Route>
    </Routes>
  );
};

export default TestRoutes;
