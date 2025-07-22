import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassPage from "../Components/institute-dashboard/class-batch/classpage/classpage";
import ArchivePage from "../Components/institute-dashboard/class-batch/archive/archivepage";
import TrashPage from "../Components/institute-dashboard/class-batch/trashpage/trashpage";

import ClassDetailsPage from "../Components/institute-dashboard/class-batch/classdetailspage/classdetailspage";
import ClassDetailsArchive from '../Components/institute-dashboard/class-batch/classdetailspage/ClassDetailsArchive/ClassDetailsArchive';
import ClassDetailsTrash from '../Components/institute-dashboard/class-batch/classdetailspage/ClassDetailsTrash/ClassDetailsTrash';




import ActiveStudents from "../Components/institute-dashboard/class-batch/classdetailspage/ActiveStudents/ActiveStudents";
import InactiveStudents from "../Components/institute-dashboard/class-batch/classdetailspage/InactiveStudents/InactiveStudents";
import ClassAndClassDetailsLayout from "../layouts/ClassAndClassDetailsLayout";
import AddClass from "../Components/institute-dashboard/class-batch/newclasspage/newclasspage";

const ClassAndClassDetailsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={  <ClassAndClassDetailsLayout />}>
  
        <Route index element={<ClassPage />} />
        <Route path="AddClass" element={ <AddClass />} />
       
        <Route path="ArchivePage" element={<ArchivePage />} />
        <Route path="TrashPage" element={<TrashPage />} />

        <Route path=":id/classdetailpage" element={<ClassDetailsPage />} />
        <Route path=":id/classdetailpage/activeStudents" element={<ActiveStudents />} />
        <Route path=":id/classdetailpage/inactiveStudents" element={<InactiveStudents />} />
        <Route path=":id/classdetailpage/archive" element={<ClassDetailsArchive />} />
        <Route path=":id/classdetailpage/trash" element={<ClassDetailsTrash />} />
      </Route>
    </Routes>
  );
};

export default ClassAndClassDetailsRoutes;
