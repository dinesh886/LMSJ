// TestContext.js
import React, { createContext, useState, useContext } from "react";

const TestContext = createContext();

export const useTestContext = () => useContext(TestContext);

export const TestProvider = ({ children }) => {
  const [questionsToShow, setQuestionsToShow] = useState([]);

  return (
    <TestContext.Provider value={{ questionsToShow, setQuestionsToShow }}>
      {children}
    </TestContext.Provider>
  );
};
