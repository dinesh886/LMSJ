
import { useState, useEffect ,useMemo } from "react"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import { FaCopy, FaEdit, FaTrashAlt, FaArrowRight, FaFolderPlus } from "react-icons/fa"
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo"
import ColumnVisibilityDropdown from "../../../ReusableComponents/ColumnVisibilityDropdown/ColumnVisibilityDropdown"
import ActionDropdown from "../../../ReusableComponents/ActionDropdown/ActionDropdown"
import "./QuestionsAdd.css"
import Modal from "react-modal"
import Header from "../../../header/header"
import LatexRenderer from "../../../ReusableComponents/LatexRenderer/LatexRenderer"
import "katex/dist/katex.min.css"
import { Helmet } from "react-helmet"
import QuestionAddDropdown from "../../../ReusableComponents/QuestionAddDropdown/QuestionAddDropdown"

const QuestionsAdd = () => {
  const data = [
    {
      id: 1,
      question: `Identify the graph of the function $$y = \\sin(x)$$ from the options below: <img src="https://insightsedu.in/new/3.png" alt="Sine function formula" style="max-width: 300px; height: auto; display: block;">`,
      answer: `The correct answer is option a) Sine Wave. The sine function produces a characteristic wave pattern that oscillates between -1 and 1.`,
      type: "MCQ",
      marks: 3,
      owner: "Admin",
      section: "Trigonometry",
      created: "15/03/2025",
      modified: "3 weeks ago",
      options: [
        '<img src="https://insightsedu.in/new/4.png" alt="Option A - Sine Wave" style="max-width: 120px; height: auto; display: block;"> Sine Wave',
        '<img src="https://insightsedu.in/new/4.png" alt="Option B - Straight Line" style="max-width: 120px; height: auto; display: block;"> Straight Line',
        '<img src="https://insightsedu.in/new/4.png" alt="Option C - Parabola" style="max-width: 120px; height: auto; display: block;"> Parabola',
        '<img src="https://insightsedu.in/new/4.png" alt="Option D - Exponential" style="max-width: 120px; height: auto; display: block;"> Exponential Curve',
      ],
      correctAnswer: 0,
      isLaTeXEnabled: true,
      hasImages: true,
    },
    {
      id: 2,
      question: `A particle moves along a path defined by:
          $$x(t) = R \\cos(\\omega t), \\quad y(t) = R \\sin(\\omega t), \\quad z(t) = kt^2$$
          Which of the following represents the arc length $$S$$?`,
      answer: `The correct solution is option D:
          $$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
      type: "MCQ",
      marks: 10,
      owner: "Admin",
      section: "Advanced Mathematics",
      created: "15/03/2025",
      modified: "1 day ago",
      options: [
        `$$S = \\frac{T}{2} \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2} + \\frac{R ^ 2 \\omega^2}{4k} \\sinh^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
        `$$S = \\frac{T}{2} \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2} + \\frac{R ^ 2 \\omega^2}{4k} \\ln\\left|2kT + \\sqrt{R ^ 2\\omega^2 + 4k^2 T^2}\\right|$$`,
        `$$S = \\frac{T}{2} \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2} + \\frac{R ^ 2 \\omega^2}{4k} \\tan^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
        `$$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R ^ 2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
      ],
      correctAnswer: 3,
      isLaTeXEnabled: true,
    },
    {
      id: 3,
      question: `Explain the concept of wave-particle duality in quantum mechanics. Include:
          - Description of the phenomenon
          - Key experiments demonstrating it
          - Implications for understanding matter
          - Examples where this duality is observed`,
      answer: `Wave-particle duality is a fundamental concept in quantum mechanics that states every particle exhibits both wave and particle properties. Key experiments include:
          1. Young's double-slit experiment with electrons
          2. Photoelectric effect demonstrating particle nature of light
          3. Davisson-Germer experiment showing wave nature of electrons

          Implications: Classical concepts of "particle" or "wave" are inadequate to fully describe quantum-scale objects. Examples include:
          - Electron diffraction patterns
          - Photon behavior in quantum optics experiments
          - Neutron interference patterns`,
      type: "Paragraph",
      marks: 15,
      owner: "Admin",
      section: "Quantum Physics",
      created: "16/03/2025",
      modified: "2 days ago",
      isLaTeXEnabled: true,
    },
    {
      id: 4,
      question: `The following table shows experimental data for a reaction:
          <table class="data-table">
            <thead><tr><th>Time (s)</th><th>Concentration (M)</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>1.00</td></tr>
              <tr><td>10</td><td>0.82</td></tr>
            </tbody>
          </table>
          Determine the reaction order and rate constant.`,
      type: "Table",
      isLaTeXEnabled: false,
      hasTables: true,
    },
    {
      id: 5,
      question: `Calculate the root mean square speed of oxygen molecules (O₂) at 300 K.
          Molar mass = 32 g/mol, R = 8.314 J/(mol·K).`,
      answer: `The root mean square speed is calculated using:
          $$v_{rms} = \\sqrt{\\frac{3RT}{M}}$$
          Result: 483.56 m/s`,
      type: "Numerical",
      marks: 5,
      owner: "Admin",
      section: "Thermodynamics",
      created: "16/03/2025",
      modified: "3 days ago",
      correctAnswer: "483.56 m/s",
      tolerance: "±5%",
      isLaTeXEnabled: true,
      units: "m/s",
    },
    {
      id: 6,
      question: `The Pythagorean theorem states $$c^2 = a^2 + b^2$$ for right triangles. true false`,
      answer: `True. The Pythagorean theorem correctly relates the sides of a right-angled triangle.`,
      type: "True/False",
      marks: 2,
      owner: "Admin",
      section: "Geometry",
      created: "16/03/2025",
      modified: "1 week ago",
      correctAnswer: true,
    },
    {
      id: 7,
      question: `एक आयाम में ऊष्मा समीकरण पर विचार करें:
          $$\\frac{\\partial u(x,t)}{\\partial t} = \\alpha \\frac{\\partial^2 u(x,t)}{\\partial x^2}$$
          सामान्य समाधान है:`,
      answer: `विकल्प a और b दोनों सही हैं। समाधान $$u(x,t) = \\sum_{n = 1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$ है`,
      type: "MCQ",
      marks: 7,
      owner: "Admin",
      section: "गणित (हिंदी)",
      created: "15/03/2025",
      modified: "1 week ago",
      options: [
        "$$u(x,t) = \\sum_{n = 1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$",
        "स्वदेशी मान $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$",
        "विकल्प a और b दोनों सही हैं",
        "समाधान को स्वदेशी मानों के रूप में व्यक्त नहीं किया जा सकता",
      ],
      correctAnswer: 2,
      isLaTeXEnabled: true,
    },
    {
      id: 8,
      question: `సత్యనారాయణ వ్యవసాయం లో ఏ మూడు భాగాలు ఉంటాయి?`,
      answer: `రబి, ఖరీఫ్, బోనాల`,
      type: "MCQ",
      marks: 2,
      owner: "Admin",
      section: "వ్యవసాయం (తెలుగు)",
      created: "15/03/2025",
      modified: "2 weeks ago",
      options: ["రబి, ఖరీఫ్, బోనాల", "శీతకాల, వేసవికాల, ఆదివార", "పంటల్ని వేరే విభజించలేదు", "ఉష్ణకటిన, ట్రోపికల్, మాన్సూన్"],
      correctAnswer: 0,
      isLaTeXEnabled: false,
    },
    {
      id: 9,
      question: `In Python, what will be the output of the following code?`,
      answer: `The output will be 120 (5 factorial)`,
      type: "Programming",
      options: ["120", "24", "60", "Runtime Error"],
      correctAnswer: 0,
      isLaTeXEnabled: false,
      hasCode: true,
      code: `def factorial(n):
          if n == 0:
          return 1
          else:
          return n * factorial(n-1)

          result = factorial(5)
          print(result)`,
    },
  ]

  // State management
  const INITIAL_ROWS_PER_PAGE = 5
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [filteredCount, setFilteredCount] = useState(data.length)
  const [fullViewMode, setFullViewMode] = useState(false)
  const [allRowsExpanded, setAllRowsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)


  // Column visibility state - only Questions visible by default
  const [columnVisibility, setColumnVisibility] = useState({
    questions: true,
    type: false,
    section:false,
    marks: false,
    modified:false,
    created:false,
    actions: true,
  })




  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getFilteredData = () => {
    const safeSearchQuery = (searchQuery || "").toLowerCase();

    return data.filter((question) => {
      const matchesSearch =
        safeSearchQuery === "" ||
        (question.question || "").toLowerCase().includes(safeSearchQuery) ||
        (question.answer || "").toLowerCase().includes(safeSearchQuery) ||
        (question.type || "").toLowerCase().includes(safeSearchQuery) ||
        (question.section || "").toLowerCase().includes(safeSearchQuery);

      const matchesType = filterType === "" || question.type === filterType;
      const matchesSection = filterSection === "" || question.section === filterSection;

      return matchesSearch && matchesType && matchesSection;
    });
  };


  const filteredData = getFilteredData()

  // Update filtered count when data changes
  useEffect(() => {
    setFilteredCount(filteredData.length)
  }, [filteredData.length])

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredData
    }
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }

  // Check if we should show pagination buttons
  const showPaginationButtons = !fullViewMode && rowsPerPage < filteredData.length

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Handle filter type change
  const handleFilterTypeChange = (value) => {
    setFilterType(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Handle filter section change
  const handleFilterSectionChange = (value) => {
    setFilterSection(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Handle individual row expansion toggle
  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId)
      } else {
        return [...prev, rowId]
      }
    })
  }

  // Toggle full view mode
  const toggleFullView = () => {
    if (!fullViewMode) {
      // Enter Full View mode
      setRowsPerPage(filteredData.length)
      setAllRowsExpanded(true)
      setExpandedRows(filteredData.map((q) => q.id))
    } else {
      // Exit Full View mode
      setRowsPerPage(INITIAL_ROWS_PER_PAGE)
      setAllRowsExpanded(false)
      setExpandedRows([])
    }
    setFullViewMode(!fullViewMode)
  }
  const handleActionFromDropdown = (actionType, questionId) => {
    // Your existing action handler
  };

  const handleAddQuestionAction = (actionType, questionId) => {
    console.log(`Add action: ${actionType} for question ID: ${questionId}`);
    // Implement your add question logic here
  };
  // Handle action from dropdown
  // const handleActionFromDropdown = (actionType, questionId) => {
  //   const row = data.find((q) => q.id === questionId)
  //         switch (actionType) {
  //     case "copy":
  //         console.log("Copy action for", questionId)
  //         break
  //         case "edit":
  //         setSelectedQuestion(row)
  //         setModalIsOpen(true)
  //         break
  //         case "move":
  //         console.log("Move to test action for", questionId)
  //         break
  //         case "folder":
  //         console.log("Add to section action for", questionId)
  //         break
  //         case "delete":
  //         console.log("Delete action for", questionId)
  //         break
  //         default:
  //         console.log("Unknown action:", actionType)
  //   }
  // }

  // Define columns with visibility state
  const columns = useMemo(() => [
    {
      name: "Questions",
      selector: (row) => row?.id || "N/A", // Always use ID as selector
      sortable: true,
      cell: (row) => {
        const visibleColumnCount = columns.filter(col => col.isVisible).length;
        const isExpanded = expandedRows.includes(row.id);

        // Show only ID if more than 3 columns are visible
        if (visibleColumnCount > 3) {
          return <span>{row.id}</span>;
        }

        // Otherwise show question (truncated if not expanded)
        const shouldTruncate = !isExpanded && row.question?.length > 50;
        const displayedContent = shouldTruncate
          ? row.question.slice(0, 50) + "..."
          : row.question;

        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleRowExpansion(row.id);
            }}
          >
            <div className={`row-link ${shouldTruncate ? "truncate-inline" : "expanded-content"}`}>
              <LatexRenderer content={displayedContent} />
            </div>
          </div>
        );
      },
      isVisible: columnVisibility.questions,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      cell: (row) => <span className={`type-badge ${row.type.toLowerCase().replace("/", "")}`}>{row.type}</span>,
      isVisible: columnVisibility.type,
    },
    {
      name: "Section",
      selector: "section",
      sortable: true,
      isVisible: columnVisibility.section,
    },
    {
      name: "Marks",
      selector: "marks",
      sortable: true,
      cell: (row) => row.marks ? <span className="marks-display">{row.marks}</span> : "N/A",
      isVisible: columnVisibility.marks,
    },
    {
      name: "Modified",
      selector: "modified",
      sortable: true,
      isVisible: columnVisibility.modified,
    },
    {
      name: "Created",
      selector: "created",
      sortable: true,
      isVisible: columnVisibility.created,
    },
    {
      name: "Actions",
      selector: "actions",
      cell: (row) => (
        <div className="test-action-buttons flex">
          <div className="desktop-actions">
            <button
              className="test-action-button copy"
              aria-label="Copy"
              onClick={(e) => {
                e.stopPropagation()
                handleActionFromDropdown("copy", row.id)
              }}
            >
              <FaCopy />
              <span className="tooltip-text">Copy</span>
            </button>
            <button
              className="test-action-button edit"
              aria-label="Edit"
              onClick={(e) => {
                e.stopPropagation()
                handleActionFromDropdown("edit", row.id)
              }}
            >
              <FaEdit />
              <span className="tooltip-text">Edit</span>
            </button>
            <button
              className="test-action-button move"
              aria-label="Move to Test"
              onClick={(e) => {
                e.stopPropagation()
                handleActionFromDropdown("move", row.id)
              }}
            >
              <FaArrowRight />
              <span className="tooltip-text">Move to Test</span>
            </button>
            <button
              className="test-action-button folder"
              aria-label="Add to Section"
              onClick={(e) => {
                e.stopPropagation()
                handleActionFromDropdown("folder", row.id)
              }}
            >
              <FaFolderPlus />
              <span className="tooltip-text">Add to Section</span>
            </button>
            <button
              className="test-action-button delete"
              aria-label="Delete"
              onClick={(e) => {
                e.stopPropagation()
                handleActionFromDropdown("delete", row.id)
              }}
            >
              <FaTrashAlt />
              <span className="tooltip-text">Delete</span>
            </button>
          </div>
          <div className="mobile-actions">
            <QuestionAddDropdown onAddAction={(actionType) => handleAddQuestionAction(actionType, row.id)} />
          </div>

        </div>
      ),
      isVisible: columnVisibility.actions,
    },
  ])

  // Toggle column visibility function
  const toggleColumnVisibility = (columnSelector) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnSelector]: !prev[columnSelector],
    }))
  }


  const visibleColumns = columns.filter((column) => column.isVisible)

  // Reset expanded rows when search changes
  useEffect(() => {
    if (!fullViewMode) {
      setExpandedRows([])
    }
  }, [searchQuery, filterType, filterSection])

  return (
    <>
      <Helmet>
        <title>Questions</title>
        <meta name="description" content="Questions in QuestionBanks" />
      </Helmet>
      <Header />
      <div className="questionsadd-index-wrapper">
        <div className="questionsadd-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">QB 1 Questions</h1>
            <div className="columnvisibility-wrapper">
              <ColumnVisibilityDropdown columns={columns} onToggleColumn={toggleColumnVisibility} />
            </div>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={visibleColumns}
              data={getCurrentPageData()}
              enableToggle={true}
              fullViewMode={fullViewMode}
              allRowsExpanded={allRowsExpanded}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              filterType={filterType}
              onFilterTypeChange={handleFilterTypeChange}
              filterSection={filterSection}
              onFilterSectionChange={handleFilterSectionChange}
            />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            {selectedQuestion && (
              <div className="question-detail-modal">
                <h3>Question Details</h3>
                <div className="question-content">
                  <LatexRenderer content={selectedQuestion.question} />
                </div>
                {selectedQuestion.type === "MCQ" && selectedQuestion.options && (
                  <div className="mcq-options-modal">
                    <h4>Options:</h4>
                    {selectedQuestion.options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`mcq-option ${selectedQuestion.correctAnswer === idx ? "correct-answer" : ""}`}
                      >
                        <LatexRenderer content={option} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="answer-content">
                  <h4>Answer:</h4>
                  <LatexRenderer content={selectedQuestion.answer} />
                </div>
                <div className="modal-footer">
                  <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
      {showPaginationButtons && (
        <PaginationButtons
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          loadMore={() => setRowsPerPage((prev) => Math.min(prev + 10, filteredData.length))}
          fullView={toggleFullView}
          fullViewMode={fullViewMode}
        />
      )}

      <PaginationInfo
        filteredQuestions={filteredData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Questions"
        totalItems={data.length}
        isSearching={searchQuery.length > 0 || filterType.length > 0 || filterSection.length > 0}
      />
    </>
  )
}

export default QuestionsAdd
