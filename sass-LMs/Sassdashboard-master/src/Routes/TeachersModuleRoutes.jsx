import React from 'react'
import TeachersIndex from '../Components/institute-dashboard/Teachers/TeachersIndex/TeachersIndex'

import { Routes, Route } from "react-router-dom";
import Trashed from '../Components/institute-dashboard/Teachers/Pages/Trashed/Trashed';
import Archived from '../Components/institute-dashboard/Teachers/Pages/Archived/Archived';
import TeachersModuleLayouts from '../layouts/TeachersModuleLayouts';

const TeachersModuleRoutes = () => {
    return (


        <Routes>
            {/* Define the parent route with Layout */}
            <Route path="/" element={<TeachersModuleLayouts />}>

                <Route index element={<TeachersIndex />} />
                
                {/* Child route  */}
                <Route path="allteachers" element={<TeachersIndex />} />
                <Route path="Trashed" element={<Trashed />} />
                <Route path="Archived" element={<Archived />} />



            </Route>

        </Routes>

    )
}

export default TeachersModuleRoutes