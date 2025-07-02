import React from 'react'

import { Routes, Route } from "react-router-dom";
import SubscriptionIndex from '../Components/institute-dashboard/Subscription/SubscriptionIndex/SubscriptionIndex';
import SubscriptionLayout from '../layouts/SubscriptionLayout';

const SubscriptionRoutes = () => {
  return (
    <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={ <SubscriptionLayout />}>
        {/* Child route for TestIndex */}
        <Route index element={<SubscriptionIndex />} />

      </Route>

    </Routes>
  )
}

export default SubscriptionRoutes