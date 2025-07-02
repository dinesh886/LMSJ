import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Questionindex from "../Questionindex/Questionindex";

const NewQB = () => {
  const [questionBanks, setQuestionBanks] = useState([]);

  // Function to add a new Question Bank
  const addQuestionBank = (newQB) => {
    setQuestionBanks((prevQuestionBanks) => [...prevQuestionBanks, newQB]);
  };
console.log("addQuestionBank function in NewQB----------:", addQuestionBank);
  console.log("addQuestionBank function is deined:", addQuestionBank); // Check if function is defined

  return (
    <div>
      {/* Pass addQuestionBank as a prop */}
      <Sidebar addQuestionBank={addQuestionBank} />
      <Questionindex questionBanks={questionBanks} />
    </div>
  );
};

export default NewQB;
