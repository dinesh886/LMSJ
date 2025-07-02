import React from 'react'


import { Helmet } from "react-helmet";
import DashBoard from '../../dashboard';
import TestStatusBar from '../../teststaus/teststatus';
const General = () => {
  return (
    <>
      <Helmet>
        <title> General</title>
        <meta name="description" content="General Usage Overview" />
      </Helmet>
    <div>
      <DashBoard />
      <TestStatusBar />
     




    </div>
    </>
  )
}

export default General