"use client"

import React, { useState, useEffect, useRef } from "react"
import { FaArrowDown, FaArrowUp, FaSearch, FaPlus, FaCheck, FaMinus, FaEye } from "react-icons/fa"
import "./TableComponent.css"
import BulkActions from "../BulkActions/BulkAction"
import StudentBulkActions from "../StudentBulkActions/StudentBulkActions"
import LatexRenderer from "../LatexRenderer/LatexRenderer"
import NewTestModal from "../NewTestModal/NewTestModal"
const DataTable = ({
    columns,
    data,
    tags,
    availableActions = [],
    studentActions = [],
    onBulkSuspend,
    onBulkTerminate,
    selectableRows = true,
    onBulkSendMessage,
    enableToggle = false,
    showColumnVisibility = false,
    onRowClicked,
    fullViewMode = false,
    searchoption = false,
    searchQuery = "",
    onSearchChange,
    filterType = "",
    onFilterTypeChange,
    expandedRows = [],
    searchPlaceholder = "Search...",
    conditionalRowStyles,
    setExpandedRows,
    sampleCandidates,
    expandableRowsComponent,
    onAddQuestionsToTag ,
    allQuestions ,
    onCopyTest = () => { },
    onUpdateTest = () => { },
    onDelete = () => { },
    onArchive = () => { },
    
    onDownload = () => { },
    isRenameModalOpen,
    setIsRenameModalOpen,
    setEditingTest
}) => {
    const [selectedRows, setSelectedRows] = useState([])
    const [sortColumn, setSortColumn] = useState(null)
    const [isAscending, setIsAscending] = useState(true)
    const [showTagOptions, setShowTagOptions] = useState(false)
    const [isTagModalOpen, setIsTagModalOpen] = useState(false)
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const [suspendedStates, setSuspendedStates] = useState({})
    const [terminatedStates, setTerminatedStates] = useState({})
    const [showMcqOptions, setShowMcqOptions] = useState({})
    const selectAllCheckboxRef = useRef()
   
    const toggleMcqOptions = (rowId, e) => {
        e?.stopPropagation()
        setShowMcqOptions(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }))
    }

    const handleSearchInputChange = (e) => {
        const value = e.target.value
        if (onSearchChange) {
            onSearchChange(value)
        }
    }

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedRows(data.map((row) => row.id))
        } else {
            setSelectedRows([])
        }
    }

    const handleRowSelect = (rowId) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(rowId) ? prevSelectedRows.filter((id) => id !== rowId) : [...prevSelectedRows, rowId],
        )
    }

    useEffect(() => {
        if (selectAllCheckboxRef.current) {
            const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length
            selectAllCheckboxRef.current.indeterminate = isIndeterminate
            selectAllCheckboxRef.current.checked = selectedRows.length === data.length && data.length > 0
        }
    }, [selectedRows, data])

    const handleSort = (column) => {
        const colDef = columns.find((col) => col.selector === column)
        if (!colDef || colDef.sortable === false) return

        const ascending = sortColumn === column ? !isAscending : true
        setSortColumn(column)
        setIsAscending(ascending)
    }

    const toggleRowExpansion = (rowId, e) => {
        e?.stopPropagation();
        if (setExpandedRows) {
            setExpandedRows(prev =>
                prev.includes(rowId)
                    ? prev.filter(id => id !== rowId)
                    : [...prev, rowId]
            );
        }
    };


    const handleExpandToggle = (rowId, e) => {
        e.stopPropagation()
        toggleRowExpansion(rowId)
    }

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0

        const aValue = a[sortColumn] ?? ""
        const bValue = b[sortColumn] ?? ""

        return isAscending
            ? aValue.toString().localeCompare(bValue.toString())
            : bValue.toString().localeCompare(aValue.toString())
    })


    const handleRowClick = (row, e) => {
        if (typeof onRowClicked === "function") {
            onRowClicked(row, e);
        }
        // Only allow toggle when not in full view mode
        // (full view mode toggles are handled by parent)
        if (enableToggle && !fullViewMode) {
            toggleRowExpansion(row.id, e);
        }
    };



    return (
        <div className={fullViewMode ? "full-view" : ""}>
            <div className="test-index-actions">
                <div className="test-search-container mb-1 d-flex justify-content-between align-items-center">
                    <div className="search-input-wrapper">
                        {searchoption && (
                            <>
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="test-search-input"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <FaSearch className="test-search-icon" />
                            </>
                        )}
                    </div>

                    {selectedRows.length > 0 && availableActions.length > 0 && (
                        <BulkActions
                            selectedRows={selectedRows}
                            tags={tags}
                            setShowTagOptions={setShowTagOptions}
                            setIsTagModalOpen={setIsTagModalOpen}
                            showMoreOptions={showMoreOptions}
                            setShowMoreOptions={setShowMoreOptions}
                            studentActions={studentActions}
                            availableActions={availableActions}
                            onAddQuestionsToTag={onAddQuestionsToTag} // Add this
                            allQuestions={allQuestions}
                            onCopyTest={onCopyTest}
                            onUpdateTest={onUpdateTest}
                            onDelete={onDelete}
                            onArchive={onArchive}
                            isRenameModalOpen={isRenameModalOpen}
                            setIsRenameModalOpen={setIsRenameModalOpen}
                            setEditingTest={setEditingTest}
                        />
                    )}
                    {selectedRows.length > 1 && studentActions.length > 0 && (
                        <StudentBulkActions
                            selectedRows={selectedRows.map(id => ({ id }))}
                            studentActions={["suspend", "terminate", "sendMessage"]}
                            onBulkSuspend={onBulkSuspend}
                            onBulkTerminate={onBulkTerminate}
                            onBulkSendMessage={onBulkSendMessage}
                            suspendedStates={suspendedStates}
                            setSuspendedStates={setSuspendedStates}
                            terminatedStates={terminatedStates}
                            setTerminatedStates={setTerminatedStates}
                            allStudents={sampleCandidates}
                        />
                    )}
                </div>
            </div>

            <div className="table-wrapper">
                <table className="custom-data-table">
                    <thead>
                        <tr>
                            {selectableRows && (
                                <th className="col-checkbox">
                                    <div className="custom-checkbox-container">
                                        <input
                                            type="checkbox"
                                            ref={selectAllCheckboxRef}
                                            onChange={(e) => {
                                                e.stopPropagation()
                                                handleSelectAll(e)
                                            }}
                                            checked={selectedRows.length === data.length && data.length > 0}
                                        />
                                        {selectedRows.length > 0 && selectedRows.length < data.length ? (
                                            <FaMinus className="checkbox-icon indeterminate-icon" />
                                        ) : selectedRows.length === data.length && data.length > 0 ? (
                                            <FaCheck className="checkbox-icon checked-icon" />
                                        ) : null}
                                    </div>
                                </th>
                            )}

                            {columns.map((col, colIndex) => (
                                <th
                                    key={colIndex}
                                    className={`col-${typeof col.name === "string" ? col.name.toLowerCase().replace(/\s+/g, "-") : "default-column"}`}
                                    style={{ width: col.width || "auto" }}
                                >
                                    <div className="table-header-content" style={{ display: "flex", alignItems: "center" }}>
                                        <span
                                            style={{ cursor: col.selector ? "pointer" : "default" }}
                                            onClick={() => col.selector && handleSort(col.selector)}
                                        >
                                            {col.name}
                                        </span>
                                        {sortColumn === col.selector && (
                                            isAscending
                                                ? <FaArrowUp
                                                    className="ml-2 sorting-arrow"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => col.selector && handleSort(col.selector)}
                                                />
                                                : <FaArrowDown
                                                    className="ml-2 sorting-arrow"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => col.selector && handleSort(col.selector)}
                                                />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectableRows ? 1 : 0)} className="empty-state">
                                    <div className="empty-state-content">
                                        <div className="empty-state-icon">
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 7H21M5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7"
                                                    stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M10 11V16M14 11V16" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <h3 className="empty-state-title">
                                            {searchQuery ? "No Matching Data" : "No questions yet"}
                                        </h3>
                                        <p className="empty-state-subtitle">
                                            {searchQuery ? "Try different search terms" : "Add your data to get started"}
                                        </p>
                                        {!searchQuery && (
                                            <button className="empty-state-action">
                                                <FaPlus className="mr-2" />
                                                Add Question
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((row) => (
                                <React.Fragment key={row.id}>
                                    <tr
                                        onClick={(e) => handleRowClick(row, e)}
                                        className={`${selectedRows.includes(row.id) ? 'checked-row' : ''} ${expandedRows.includes(row.id) ? 'expanded' : ''
                                            }`}
                                    >
                                        {selectableRows && (
                                            <td className="col-checkbox" style={{ width: "50px" }}>
                                                <div className="custom-checkbox-container">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(row.id)}
                                                        onChange={(e) => {
                                                            e.stopPropagation()
                                                            handleRowSelect(row.id)
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    {selectedRows.includes(row.id) && (
                                                        <FaCheck className="checkbox-icon checked-icon" />
                                                    )}
                                                </div>
                                            </td>
                                        )}

                                        {columns.map((col, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={`col-${typeof col.name === "string" ? col.name.toLowerCase().replace(/\s+/g, "-") : "default-column"}`}
                                            >
                                                {col.cell ? col.cell(row) : row[col.selector]}
                                            </td>
                                        ))}
                                    </tr>

                                    {enableToggle && expandedRows.includes(row.id) && (
                                        <tr className="expanded-row">
                                            <td colSpan={columns.length + (selectableRows ? 1 : 0)}>
                                                <div className="expanded-content">
                                                    {expandableRowsComponent ? (
                                                        expandableRowsComponent({ data: row })
                                                    ) : (
                                                        <div className="default-expanded-content">
                                                            {row.type === "Programming" && row.code ? (
                                                                <div className="programming-section">
                                                                    <h4 className="code-title">Code:</h4>
                                                                    <pre className="code-content">
                                                                        <code>{row.code}</code>
                                                                    </pre>
                                                                    {row.options && (
                                                                        <div className="programming-options">
                                                                            <h4 className="options-title">Options:</h4>
                                                                            <div className="options-list">
                                                                                {row.options.map((option, idx) => (
                                                                                    <div
                                                                                        key={idx}
                                                                                        className={`option-item ${row.correctAnswer === idx ? 'correct-option' : ''}`}
                                                                                    >
                                                                                        <div className="option-content">
                                                                                            <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                                                                                            <div className="option-text">
                                                                                                {option}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : row.type === "Table" ? (
                                                                <div className="table-section">
                                                                    <div dangerouslySetInnerHTML={{ __html: row.question }} />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="answer-section">
                                                                        <div className="answer-content">
                                                                            <LatexRenderer content={row.answer} />
                                                                        </div>
                                                                    </div>
                                                                    {(row.type === "MCQ" || row.type === "Mcq") && row.options && (
                                                                        <div className="mcq-options">
                                                                            <div className="options-header">
                                                                                <h4 className="options-title">Options:</h4>
                                                                                <button
                                                                                    className="toggle-options-button"
                                                                                    onClick={(e) => toggleMcqOptions(row.id, e)}
                                                                                    aria-label={showMcqOptions[row.id] ? "Hide options" : "Show options"}
                                                                                >
                                                                                    <FaEye className={`eye-icon ${showMcqOptions[row.id] ? 'active' : ''}`} />
                                                                                </button>
                                                                            </div>
                                                                            {showMcqOptions[row.id] && (
                                                                                <div className="options-list">
                                                                                    {row.options.map((option, idx) => (
                                                                                        <div
                                                                                            key={idx}
                                                                                            className={`option-item ${row.correctAnswer === idx ? 'correct-option' : ''}`}
                                                                                        >
                                                                                            <div className="option-content">
                                                                                                <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                                                                                                <div className="option-text">
                                                                                                    <LatexRenderer content={option} />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable