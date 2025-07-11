import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';



// import General from './Components/institute-dashboard/General/General';
import MainDashboard from './Routes/MainDashboard.jsx';
import TeachersRoutes from "./Routes/teachersRoutes.jsx";
import StudentRoutes from './Routes/StudentRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Changed to min.css
import PathLostPage from './Components/PathLostPage/PathLostPage';
import ClassAndClassDetailsRoutes from './Routes/ClassAndClassDetailsRoutes.jsx';
import TestRoutes from './Routes/TestRoutes.jsx';

import QuestionBankRoutes from './Routes/QuestionBankRoutes.jsx';
import SubscriptionRoutes from './Routes/SubscriptionRoutes.jsx';

import TeachersModuleRoutes from './Routes/TeachersModuleRoutes.jsx';

function App() {
  return (
    <Router basename="/lmsinstitutejune5">
      <Routes>


        {/* Define routes for institute Dashboard components */}s
        <Route path="/" element={<MainDashboard />} />

        <Route path="/MainDashboard/*" element={<MainDashboard />} />
        <Route path="/class/*" element={<ClassAndClassDetailsRoutes />} />
        <Route path="/QuestionBank/*" element={<QuestionBankRoutes />} />
        <Route path="/Test/*" element={<TestRoutes />} />
        <Route path="/teachers/*" element={<TeachersModuleRoutes />} />
        <Route path="/subscription/*" element={<SubscriptionRoutes />} />


        {/* Teachers Dashboard Routes */}
        <Route path="/teachers-dashboard/*" element={<TeachersRoutes />} />
        {/* student */}
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="*" element={<PathLostPage />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // <- Set theme here
      />
    </Router>
  );
}

export default App;