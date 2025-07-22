"use client"

import { useState, useRef, useEffect } from "react"
import { FaPaperPlane, FaCopy, FaFilePdf, FaShare, FaArchive, FaTrashAlt, FaEdit, FaTag } from "react-icons/fa"
import { BiSolidRename } from "react-icons/bi"
import { HiDotsVertical } from "react-icons/hi"
import "./TestIndex.css"
import ShareModal from "../../../ReusableComponents/TestShareModal/ShareModal"
import { Link } from "react-router-dom"
import TestSidebar from "../TestSidebar/TestSidebar"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo"
import PublishModal from "../../../ReusableComponents/PublishModal/PublishModal"
import Header from "../../../header/header"
import { Helmet } from "react-helmet"
import AddTagModal from "../../../ReusableComponents/AddTagModal/AddTagModal"
import NewTestModal from "../../../ReusableComponents/NewTestModal/NewTestModal"

const initialData = [
  { id: 1, test: "Test 1", owner: "John Doe", status: "Published", lastModified: "2 days ago by You", duration: 60, description: "Sample test 1", instructions: "Follow the guidelines" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status: "Not Published", lastModified: "1 month ago by You", duration: 45, description: "Sample test 2", instructions: "Read carefully" },
  { id: 3, test: "Test 3", owner: "Mark Johnson", status: "Published", lastModified: "5 days ago by You", duration: 90, description: "Sample test 3", instructions: "Complete all sections" },
  { id: 4, test: "Test 4", owner: "Mark Johnson", status: "Published", lastModified: "30 minutes ago by You", duration: 30, description: "Sample test 4", instructions: "Time-bound test" },
  { id: 5, test: "Test 5", owner: "Mark Johnson", status: "Not Published", lastModified: "2 months ago by You", duration: 75, description: "Sample test 5", instructions: "Answer all questions" },
  { id: 6, test: "Test 6", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 6", instructions: "Follow instructions" },
  { id: 7, test: "Test 7", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 7", instructions: "Follow instructions" },
  { id: 8, test: "Test 8", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 8", instructions: "Follow instructions" },
  { id: 9, test: "Test 9", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 9", instructions: "Follow instructions" },
  { id: 10, test: "Test 10", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 10", instructions: "Follow instructions" },
  { id: 11, test: "Test 11", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 11", instructions: "Follow instructions" },
  { id: 12, test: "Test 12", owner: "Mark Johnson", status: "Published", lastModified: "1 day ago by You", duration: 60, description: "Sample test 12", instructions: "Follow instructions" },
]

const TestIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [emails, setEmails] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [tagColor, setTagColor] = useState("#ff0000")
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [showTagOptions, setShowTagOptions] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCustomColor, setIsCustomColor] = useState(false)
  const [customColor, setCustomColor] = useState("#000000")
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [showButtons, setShowButtons] = useState(true)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [selectedTest, setSelectedTest] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)
  const [dataTableVisible, setDataTableVisible] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [isTagQuestionsModalOpen, setIsTagQuestionsModalOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState(null)
  const [filteredData, setFilteredData] = useState(initialData)
  const [activeTag, setActiveTag] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filteredCount, setFilteredCount] = useState(initialData.length)
  const [fullViewMode, setFullViewMode] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTest, setEditingTest] = useState(null)
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false)
  const [data, setData] = useState(() => {
    const savedTests = localStorage.getItem("tests");
    return savedTests ? JSON.parse(savedTests) : initialData;
  });
  const [tags, setTags] = useState(() => {
    const savedTags = localStorage.getItem("testTags")
    return savedTags ? JSON.parse(savedTags) : [
      { id: 1, name: "Important", color: "#FF0000", questions: [] },
      { id: 2, name: "Review", color: "#FF9900", questions: [] },
      { id: 3, name: "Completed", color: "#008000", questions: [] },
    ]
  })

  useEffect(() => {
    localStorage.setItem("testTags", JSON.stringify(tags))
  }, [tags])

  const uncategorizedCount = data.length - new Set(
    tags.flatMap(tag => tag.questions)
  ).size

  useEffect(() => {
    let result = data

    if (activeTag) {
      if (activeTag === "uncategorized") {
        const allTaggedQuestions = tags.flatMap((tag) => tag.questions)
        result = result.filter((test) => !allTaggedQuestions.includes(test.id))
      } else {
        const tag = tags.find((t) => t.name === activeTag)
        if (tag) {
          result = result.filter((test) => tag.questions.includes(test.id))
        }
      }
    }

    if (searchQuery) {
      result = result.filter((test) => {
        return (
          test.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.lastModified.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
    }

    if (filterStatus) {
      result = result.filter((test) => test.status === filterStatus)
    }

    setFilteredData(result)
    setFilteredCount(result.length)
  }, [activeTag, searchQuery, filterStatus, tags, data])

  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredData
    }
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }

  const showPaginationButtons = !fullViewMode && rowsPerPage < filteredData.length

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleFilterStatusChange = (value) => {
    setFilterStatus(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-actions-dropdown")) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const openModal = (testName) => {
    setSelectedTest(testName)
    setIsModalOpen(true)
    setOpenDropdownId(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = (testName) => {
    setSelectedTest(testName)
    setIsModalOpen(true)
  }

  const tagOptionsRef = useRef(null)
  const moreOptionsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagOptionsRef.current && !tagOptionsRef.current.contains(event.target)) {
        setShowTagOptions(false)
      }
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const openShareModal = (testName) => {
    setSelectedTest(testName)
    setIsShareModalOpen(true)
    setOpenDropdownId(null)
  }

  const loadMore = () => {
    const newRows = rowsPerPage + 5
    setRowsPerPage(Math.min(newRows, filteredData.length))
  }

  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredData.length)
    } else {
      setRowsPerPage(5)
    }
    setFullViewMode(!fullViewMode)
  }

  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId)
  }

  const handleAddTag = (newTag) => {
    const tagWithId = {
      ...newTag,
      id: Date.now(),
      questions: newTag.questions || []
    }
    setTags(prev => [...prev, tagWithId])
  }

  const handleAddQuestionsToTag = (tagName, questionIds) => {
    setTags(prevTags =>
      prevTags.map(tag => {
        if (tag.name === tagName) {
          const questionSet = new Set(tag.questions);
          questionIds.forEach(id => questionSet.add(id));
          return {
            ...tag,
            questions: Array.from(questionSet)
          };
        }
        return tag;
      })
    );
  };

  const handleRemoveQuestionFromTag = (tagName, questionId) => {
    setTags(prevTags =>
      prevTags.map(tag => {
        if (tag.name === tagName) {
          return {
            ...tag,
            questions: tag.questions.filter(id => id !== questionId)
          };
        }
        return tag;
      })
    );
  };

  const handleUpdateTest = (testId, updatedFields) => {
    setData(prevData =>
      prevData.map(test =>
        test.id === testId
          ? {
            ...test,
            test: updatedFields.name || test.test,
            duration: updatedFields.duration || test.duration,
            description: updatedFields.description || test.description,
            instructions: updatedFields.instructions || test.instructions,
            lastModified: `Just now by You`
          }
          : test
      )
    );
  };

  const handleCopyTest = (testId) => {
    const testToCopy = data.find(test => test.id === testId);
    if (testToCopy) {
      const newTest = {
        ...testToCopy,
        id: Date.now(),
        test: `${testToCopy.test} (copy)`,
        lastModified: `Just now by You`
      };
      const originalIndex = data.findIndex(test => test.id === testId);
      setData(prevData => [
        ...prevData.slice(0, originalIndex + 1),
        newTest,
        ...prevData.slice(originalIndex + 1)
      ]);
    }
  };

  const handleCreateTest = (testData) => {
    const newTest = {
      id: Date.now(),
      test: testData.name,
      owner: "You",
      status: "Not Published",
      lastModified: "Just now by You",
      duration: testData.duration,
      description: testData.description,
      instructions: testData.instructions
    };
    setData(prev => [...prev, newTest]);
  };
  // Add this useEffect for persisting data
  useEffect(() => {
    localStorage.setItem("tests", JSON.stringify(data));
    localStorage.setItem("testTags", JSON.stringify(tags));
  }, [data, tags]);


  useEffect(() => {
    let result = data

    if (activeTag) {
      if (activeTag === "uncategorized") {
        const allTaggedQuestions = tags.flatMap(tag => tag.questions)
        result = result.filter(test => !allTaggedQuestions.includes(test.id))
      } else {
        const tag = tags.find(t => t.name === activeTag)
        if (tag) {
          result = result.filter(test => tag.questions.includes(test.id))
        }
      }
    }

    setFilteredData(result)
  }, [activeTag, tags, data])

  const handleTagAction = (row) => {
    setSelectedQuestions([row.id])
    setIsTagQuestionsModalOpen(true)
  }

  const handleBulkTagAction = (selectedRowIds) => {
    setSelectedQuestions(selectedRowIds)
    setIsTagQuestionsModalOpen(true)
  }

  const handleTagClick = (tagName) => {
    setActiveTag(tagName)
  }

  const handleUncategorizedClick = () => {
    setActiveTag("uncategorized")
  }
  const handleArchiveTest = (testId) => {
    setData(prevData =>
      prevData.map(test =>
        test.id === testId
          ? { ...test, archived: true, lastModified: `Just now by You` }
          : test
      )
    );
  };

  const handleDeleteTest = (testId) => {
    setData(prevData =>
      prevData.map(test =>
        test.id === testId
          ? { ...test, trashed: true, lastModified: `Just now by You` }
          : test
      )
    );
  };

  const handlePermanentDelete = (testId) => {
    setData(prevData => prevData.filter(test => test.id !== testId));
  };

  const handleRestoreTest = (testId) => {
    setData(prevData =>
      prevData.map(test =>
        test.id === testId
          ? { ...test, trashed: false, lastModified: `Just now by You` }
          : test
      )
    );
  };
  const handleActionClick = (action, row) => {
    setOpenDropdownId(null);

    switch (action) {
      case "dispatch":
        openModal(row.test);
        break;
      case "edit":
      case "rename":
        setEditingTest({
          id: row.id,
          name: row.test,
          duration: row.duration,
          description: row.description,
          instructions: row.instructions
        });
        setIsEditModalOpen(true);
        break;
      case "pdf":
        handleDownloadPdf(row);
        break;
      case "zip":
        handleDownloadZip(row);
        break;
      case "copy":
        handleCopyTest(row.id);
        break;
      case "share":
        openShareModal(row.test);
        break;
      case "archive":
        handleArchiveTest(row.id);
        break;
      case "delete":
        handleDeleteTest(row.id);
        break;
      case "restore":
        handleRestoreTest(row.id);
        break;
      case "permanent-delete":
        handlePermanentDelete(row.id);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: "Test Names",
      selector: "test",
      cell: (row) => (
        <div className="flex items-center">
          <Link to={`/test/${row.id}/movetest`} state={{ testName: row.test, testId: row.id }}>
            <span className="row-link">{row.test}</span>
          </Link>
          <div className="question-tags">
            {tags
              .filter(tag => tag.questions.includes(row.id))
              .map(tag => (
                <div key={tag.id} className="question-tag-container">
                  <div className="question-tag">
                    <span
                      className="tag-color-dot"
                      style={{ backgroundColor: tag.color }}
                    ></span>
                    <span className="index-tag-name">{tag.name}</span>
                  </div>
                  <span
                    className="tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestionFromTag(tag.name, row.id);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      name: "Owner",
      selector: "owner",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Last Modified",
      selector: "lastModified",
      sortable: true,
    },
    {
      name: <div className="table-actions">Actions</div>,
      selector: "actions",
      sortable: false,
      cell: (row) => (
        <div className="test-action-buttons">
          {isMobile ? (
            <div className="mobile-actions-dropdown">
              <button
                className="test-action-button mobile-menu-trigger"
                onClick={() => toggleDropdown(row.id)}
                aria-label="More actions"
              >
                <HiDotsVertical />
              </button>

              {openDropdownId === row.id && (
                <div className="mobile-actions-menu">
                  <button className="mobile-action-item dispatch" onClick={() => handleActionClick("dispatch", row)}>
                    <FaPaperPlane />
                    <span>Publish</span>
                  </button>
                  <button className="mobile-action-item edit" onClick={() => handleActionClick("edit", row)}>
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button className="mobile-action-item pdf" onClick={() => handleActionClick("pdf", row)}>
                    <FaFilePdf />
                    <span>Download PDF</span>
                  </button>
                  <button className="mobile-action-item copy" onClick={() => handleActionClick("copy", row)}>
                    <FaCopy />
                    <span>Copy</span>
                  </button>
                  <button className="mobile-action-item rename" onClick={() => handleActionClick("rename", row)}>
                    <BiSolidRename />
                    <span>Rename</span>
                  </button>
                  <button className="test-action-button" aria-label="Tag" >
                    <FaTag />
                    <span className="">Tag</span>
                  </button>
                  <button className="mobile-action-item share" onClick={() => handleActionClick("share", row)}>
                    <FaShare />
                    <span>Share</span>
                  </button>
                  <button className="mobile-action-item archive" onClick={() => handleActionClick("archive", row)}>
                    <FaArchive />
                    <span>Archive</span>
                  </button>
                  <button className="mobile-action-item delete" onClick={() => handleActionClick("delete", row)}>
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex">
              <button className="test-action-button dispatch" aria-label="Publish" onClick={() => openModal(row.test)}>
                <FaPaperPlane />
                <span className="tooltip-text">Publish</span>
              </button>
              <button
                className="test-action-button edit"
                aria-label="Edit"
                onClick={() => handleActionClick("edit", row)}
              >
                <FaEdit />
                <span className="tooltip-text">Edit</span>
              </button>
              <button
                className="test-action-button pdf"
                aria-label="Download PDF"
                onClick={() => handleActionClick("pdf", row)}
              >
                <FaFilePdf />
                <span className="tooltip-text">Download PDF</span>
              </button>
              <button
                className="test-action-button copy"
                aria-label="Copy"
                onClick={() => handleActionClick("copy", row)}
              >
                <FaCopy />
                <span className="tooltip-text">Copy</span>
              </button>
              <button
                className="test-action-button rename"
                aria-label="Rename"
                onClick={() => handleActionClick("rename", row)}
              >
                <BiSolidRename />
                <span className="tooltip-text">Rename</span>
              </button>
              <button className="test-action-button" aria-label="Tag" onClick={() => handleTagAction(row)}>
                <FaTag />
                <span className="tooltip-text">Tag</span>
              </button>
              <button className="test-action-button share" aria-label="Share" onClick={() => openShareModal(row.test)}>
                <FaShare />
                <span className="tooltip-text">Share</span>
              </button>
              <button
                className="test-action-button archive"
                aria-label="Archive"
                onClick={() => handleActionClick("archive", row)}
              >
                <FaArchive />
                <span className="tooltip-text">Archive</span>
              </button>
              <button
                className="test-action-button delete"
                aria-label="Delete"
                onClick={() => handleActionClick("delete", row)}
              >
                <FaTrashAlt />
                <span className="tooltip-text">Delete</span>
              </button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Helmet>
        <title>Tests</title>
        <meta name="description" content="Tests" />
      </Helmet>
      <Header />
      <div className="test-index-wrapper">
        <TestSidebar
          tags={tags}
          setTags={setTags}
          uncategorizedCount={uncategorizedCount}
          onTagClick={handleTagClick}
          onUncategorizedClick={handleUncategorizedClick}
          activeTag={activeTag}
          onAddTag={handleAddTag}
          onCreateTest={handleCreateTest}
          archivedCount={data.filter(test => test.archived).length}
          trashedCount={data.filter(test => test.trashed).length}
        />

        <div className="test-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">All Tests</h1>
            {activeTag && (
              <div className="active-tag-indicator">
                Showing tests for:{" "}
                <span style={{ color: tags.find((t) => t.name === activeTag)?.color || "#666" }}>
                  {activeTag === "uncategorized" ? "Uncategorized" : activeTag}
                </span>
              </div>
            )}
          </div>

          <div className="my-data-table">
            <DataTable
              columns={columns}
              data={getCurrentPageData()}
              availableActions={["delete", "archive", "download", "tag", "more"]}
              enableToggle={false}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              filterType={filterStatus}
              onFilterTypeChange={handleFilterStatusChange}
              tags={tags}
              onBulkTagAction={(selectedIds) => {
                setSelectedQuestions(selectedIds);
                setIsTagQuestionsModalOpen(true);
              }}
              onAddTag={handleAddTag}
              onAddQuestionsToTag={handleAddQuestionsToTag}
              isRenameModalOpen={isEditModalOpen}
              setIsRenameModalOpen={setIsEditModalOpen}
              setEditingTest={setEditingTest}
              allQuestions={data}
            />
          </div>

          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            emails={emails}
            setEmails={setEmails}
            testName={selectedTest}
          />
        </div>

        <PublishModal isOpen={isModalOpen} onClose={closeModal} selectedTest={selectedTest} />
        <AddTagModal
          isOpen={isTagQuestionsModalOpen}
          onClose={() => setIsTagQuestionsModalOpen(false)}
          tags={tags}
          selectedQuestions={selectedQuestions}
          onAddQuestions={handleAddQuestionsToTag}
          onAddTag={handleAddTag}
          allQuestions={data}
        />
        {isEditModalOpen && (
          <NewTestModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingTest(null);
            }}
            initialName={editingTest?.name || ""}
            initialDuration={editingTest?.duration || 60}
            initialDescription={editingTest?.description || ""}
            initialInstructions={editingTest?.instructions || ""}
            onSubmit={(updatedFields) => {
              handleUpdateTest(editingTest.id, updatedFields);
              setIsEditModalOpen(false);
              setEditingTest(null);
            }}
            mode="edit"
          />
        )}
        {isNewTestModalOpen && (
          <NewTestModal
            isOpen={isNewTestModalOpen}
            onClose={() => setIsNewTestModalOpen(false)}
            onSubmit={handleCreateTest}
            mode="create"
          />
        )}
      </div>

      {showPaginationButtons && (
        <PaginationButtons
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          loadMore={loadMore}
          fullView={toggleFullView}
          fullViewMode={fullViewMode}
        />
      )}

      <PaginationInfo
        filteredQuestions={filteredData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Tests"
        totalItems={data.length}
        isSearching={searchQuery.length > 0 || filterStatus.length > 0}
      />
    </>
  )
}

export default TestIndex