"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Plus,
  Clock,
  Award,
  Hash,
  Check,
  X,
  Menu
} from "lucide-react";
import { MdTimer, MdPlaylistAddCheck, MdExposureNeg1 } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useTestContext } from "../context/TestContext";
import "./TestQuestionAddSidebar.css";

const TestQuestionAddSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuestionBankDropdownOpen, setIsQuestionBankDropdownOpen] = useState(false);
  const [isSectionsDropdownOpen, setIsSectionsDropdownOpen] = useState(false);
  const [isAddToSectionOpen, setIsAddToSectionOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [marks, setMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState(0);
  const { setQuestionsToShow } = useTestContext();
  const location = useLocation();

  const questionBankDropdownRef = useRef(null);
  const sectionsDropdownRef = useRef(null);
  const addToSectionRef = useRef(null);

  // Test information
  const testInfo = {
    marks: 100,
    noOfQuestions: 50,
    negativeMarks: -0.25,
    duration: "2h",
  };

  // Question banks data
  const questionBanks = [
    {
      id: 1,
      name: "Questionbank-1",
      questions :[
        { id: 1, question: "What is React?", answer: "React is a JavaScript library for building UIs.", type: "Descriptive", marks: 1, owner: "Admin" },

        { id: 2, question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript, used with React.", type: "Shortanswer", marks: 2, owner: "Admin" },

        { id: 3, question: "What is Virtual DOM?", answer: "Virtual DOM is an in-memory representation of the real DOM elements.", type: "Descriptive", marks: 2, owner: "Admin" },

        { id: 4, question: "Which of the following is a JavaScript framework?", options: ["Laravel", "Django", "React", "Ruby on Rails"], answer: "React", type: "Multiplechoice", marks: 1, owner: "Admin" },

        { id: 5, question: "React is a backend framework.", answer: "False", type: "TrueFalse", marks: 1, owner: "Admin" },

        { id: 6, question: "____ is used to manage state in React applications.", answer: "Redux", type: "Fillintheblank", marks: 1, owner: "Admin" },

        {
          id: 7, question: "Match the following:",
          match: {
            columnA: ["React", "Angular", "Vue"],
            columnB: ["Facebook", "Google", "Evan You"]
          },
          answer: {
            React: "Facebook",
            Angular: "Google",
            Vue: "Evan You"
          },
          type: "Matchthefollowing",
          marks: 3,
          owner: "Admin"
        },

        {
          id: 8, question: "Write a function in JavaScript to reverse a string.",
          answer: `function reverseString(str) { return str.split('').reverse().join(''); }`,
          type: "Code",
          marks: 4,
          owner: "Admin"
        }
      ],
      
      sections: [
        {
          name: "QB-1 Tag 1",
          questions: [
            { id: 4, question: "What are React Hooks?", answer: "Hooks are functions that let you use state and lifecycle features in functional components.", type: "descriptive", marks: 5, owner: "Admin" },
            { id: 5, question: "Explain useState Hook.", answer: "useState is a Hook that lets you add state to functional components.", type: "shortanswer", marks: 3, owner: "Admin" },
          ],
        },
        {
          name: "QB-1 Tag 2",
          questions: [
            { id: 6, question: "What is a Component?", answer: "A Component is a reusable piece of UI in React.", type: "shortanswer", marks: 2, owner: "Admin" },
            { id: 7, question: "What is useEffect Hook?", answer: "useEffect is a React Hook for side effects in functional components.", type: "longanswer", marks: 4, owner: "Admin" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Questionbank-2",
      questions: [
        { id: 1, question: "What is JavaScript?", answer: "JavaScript is a programming language for web development.", type: "descriptive", marks: 2, owner: "Teacher1" },
        { id: 2, question: "What is ES6?", answer: "ES6 is the 6th version of ECMAScript, with features like let/const, arrow functions, and classes.", type: "shortanswer", marks: 3, owner: "Teacher1" },
      ],
      sections: [
        {
          name: "QB-2 : Tag 5",
          questions: [
            { id: 5, question: "What is an event loop in JavaScript?", answer: "The event loop is a mechanism that handles asynchronous operations in JavaScript.", type: "shortanswer", marks: 3, owner: "Teacher1" },
          ],
        },
      ],
    },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleQuestionBankDropdown = () => {
    setIsQuestionBankDropdownOpen(!isQuestionBankDropdownOpen);
    setIsSectionsDropdownOpen(false);
  };

  const toggleSectionsDropdown = () => {
    setIsSectionsDropdownOpen(!isSectionsDropdownOpen);
  };

  const toggleAddToSection = () => {
    setIsAddToSectionOpen(!isAddToSectionOpen);
  };

  const handleBankSelect = (bankIndex) => {
    const selectedBank = questionBanks[bankIndex];
    setSelectedBank(selectedBank);
    setSelectedSection(null);
    setQuestionsToShow(selectedBank.questions);
    setIsQuestionBankDropdownOpen(false);
    setIsSectionsDropdownOpen(true);
  };

  const handleSectionSelect = (sectionIndex) => {
    const selectedSection = selectedBank.sections[sectionIndex];
    setSelectedSection(selectedSection);
    setQuestionsToShow(selectedSection.questions);
    setIsSectionsDropdownOpen(false);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (questionBankDropdownRef.current && !questionBankDropdownRef.current.contains(event.target)) {
        setIsQuestionBankDropdownOpen(false);
      }
      if (sectionsDropdownRef.current && !sectionsDropdownRef.current.contains(event.target)) {
        setIsSectionsDropdownOpen(false);
      }
      if (addToSectionRef.current && !addToSectionRef.current.contains(event.target)) {
        setIsAddToSectionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Container */}
      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Question Navigation">
        <div className="test-sidebar-header">
          <div className="">
            <button className="allbuttons" aria-label="Create New Question">
              {/* <Plus className="icon" size={18} /> */}
              <span className="sidebar-letters">New Question</span>
            </button>
          </div>
        </div>

        <div className="test-sidebar-section">
          <div className="">
            <div className="dropdown-wrapper w-100" ref={questionBankDropdownRef}>
              <button
                className="allbuttons dropdown-button"
                onClick={toggleQuestionBankDropdown}
                aria-label="Select Question Bank"
              >
                <span className="sidebar-letters">{selectedBank ? selectedBank.name : "Add From QB"}</span>
                {/* {isQuestionBankDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />} */}
              </button>

              {isQuestionBankDropdownOpen && (
                <div className="dropdown-style qb-dropdown">
                  {questionBanks.map((bank, bankIndex) => (
                    <button
                      key={bank.id}
                      className="dropdown-item"
                      onClick={() => handleBankSelect(bankIndex)}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
{/* 
          {selectedBank && (
            <div className="w-100 d-flex justify-content-center mt-2">
              <div className="dropdown-wrapper w-100" ref={sectionsDropdownRef}>
                <button
                  className="allbuttons dropdown-button"
                  onClick={toggleSectionsDropdown}
                  aria-label="Select Tag"
                >
                  <span className="sidebar-letters">{selectedSection ? selectedSection.name : "Select Tag"}</span>
                 
                </button>

                {isSectionsDropdownOpen && (
                  <div className="dropdown-style">
                    {selectedBank.sections.map((section, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleSectionSelect(index)}
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )} */}
        </div>

        <hr />

        <div className="test-sidebar-section">
          <div className="testquestionadd-marks-section">
            <div className="testquestionadd-input-container">
              <span className="sidebar-letters">Selected</span>
              <div className="counter-box">{marks || 0}</div>
            </div>

            <div className="testquestionadd-input-container">
              <span className="sidebar-letters">Total Mark</span>
              <div className="counter-box">{marks || 0}</div>
            </div>

            <div className="testquestionadd-input-container">
              <span className="sidebar-letters">Negative Mark</span>
              <div className="counter-box">{negativeMarks || 0}</div>
            </div>
          </div>
        </div>

        <div className="test-sidebar-section">
          <div className="w-100 d-flex justify-content-center">
            <div className="dropdown-wrapper w-100" ref={addToSectionRef}>
              <button
                className="allbuttons dropdown-button"
                onClick={toggleAddToSection}
                aria-label="Add to Section"
              >
                <span className="sidebar-letters">Add to Section</span>
                {/* {isAddToSectionOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />} */}
              </button>

              {isAddToSectionOpen && (
                <div className="dropdown-style">
                  <button className="dropdown-item">Tag 1</button>
                  <button className="dropdown-item">Tag 2</button>
                  <button className="dropdown-item">Tag 3</button>
                  <button className="dropdown-item">Tag 4</button>
                </div>
              )}
            </div>
          </div>

          {/* <div className=" mt-2">
            <button className="allbuttons" aria-label="Add to Test">
              <span className="sidebar-letters">Add to Test</span>
            </button>
          </div> */}
        </div>

        <hr />

        <div className="test-sidebar-section">
          <h3 className="sidebar-section-title">Test Information</h3>
          <ul className="test-sidebar-menu">
            <li>
              <div className="sidebar-contents">
                <AiOutlineFileDone className="icon" size={18} />
                <span className="sidebar-letters">Marks: {testInfo.marks}</span>
              </div>
            </li>
            <li>
              <div className="sidebar-contents">
                <MdPlaylistAddCheck className="icon" size={18} />
                <span className="sidebar-letters">No. of Q: {testInfo.noOfQuestions}</span>
              </div>
            </li>
            <li>
              <div className="sidebar-contents">
                <MdExposureNeg1 className="icon" size={18} />
                <span className="sidebar-letters">Neg: {testInfo.negativeMarks}</span>
              </div>
            </li>
            <li>
              <div className="sidebar-contents">
                <Clock className="icon" size={18} />
                <span className="sidebar-letters">Duration: {testInfo.duration}</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className={`mobile-toggle-btn ${isMobileOpen ? "sidebar-open" : ""}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default TestQuestionAddSidebar;