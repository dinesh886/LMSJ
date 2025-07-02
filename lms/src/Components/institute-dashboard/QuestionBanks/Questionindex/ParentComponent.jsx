// ParentComponent.js
import React, { useState } from "react";

import Sidebar from '../Sidebar/Sidebar'
import Questionindex from "./Questionindex";

const ParentComponent = () => {
  const [questionBanks, setQuestionBanks] = useState([]);

  // Function to add a new QB to the state
  const addNewQB = (newQB) => {
    setQuestionBanks((prevQuestionBanks) => [...prevQuestionBanks, newQB]);
  };

  return (
    
    <div className="parent-container">
      {/* Pass addNewQB function to Sidebar */}
      <Sidebar addNewQB={addNewQB} />

      {/* Pass questionBanks data to Questionindex */}
      <Questionindex questionBanks={questionBanks} />
    
    </div>
  );
};

export default ParentComponent;
