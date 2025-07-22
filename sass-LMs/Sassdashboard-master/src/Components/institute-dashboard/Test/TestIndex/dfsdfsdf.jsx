"use client"

import React, { useState, useRef, useEffect } from "react"
import { Trash2, Archive, Download, Check } from "lucide-react"
import { BiSolidTag } from "react-icons/bi"
import "./BulkAction.css"
import AddTagModal from "../../ReusableComponents/AddTagModal/AddTagModal"
import PropTypes from 'prop-types'

const BulkActions = ({
    selectedRows = [],
    availableActions = [],
    tags = [],
    onAddQuestionsToTag = () => { },
    onAddTag = () => { },
    allQuestions = []
}) => {
    const [activeDropdown, setActiveDropdown] = useState(null)
    const dropdownRef = useRef(null)
    const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false)
    const [recentlyTagged, setRecentlyTagged] = useState({})

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleAddToTag = (tagName) => {
        if (typeof onAddQuestionsToTag !== 'function') {
            console.error('onAddQuestionsToTag is not a function')
            return
        }

        const tag = tags.find(t => t.name === tagName)
        const newQuestions = selectedRows.filter(id => !tag.questions.includes(id))

        // Show visual feedback
        setRecentlyTagged(prev => ({
            ...prev,
            [tagName]: Date.now()
        }))

        // Remove feedback after 2 seconds
        setTimeout(() => {
            setRecentlyTagged(prev => {
                const newState = { ...prev }
                delete newState[tagName]
                return newState
            })
        }, 2000)

        // Only add questions that aren't already in this tag
        if (newQuestions.length > 0) {
            onAddQuestionsToTag(tagName, newQuestions)
        }

        setActiveDropdown(null)
    }

    const renderActionButton = (action, index, isLastVisible) => {
        const baseClass = `tube-action-button ${isLastVisible ? "last-visible" : ""}`
        switch (action) {
            case "delete":
                return <button className={baseClass} data-tooltip="Delete"><Trash2 size={18} /></button>
            case "archive":
                return <button className={baseClass} data-tooltip="Archive"><Archive size={18} /></button>
            case "download":
                return <button className={baseClass} data-tooltip="Download"><Download size={18} /></button>
            case "tag":
                return (
                    <button
                        className={`${baseClass} dropdown-toggle2 ${activeDropdown === "tag" ? "active" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleDropdown("tag")
                        }}
                    >
                        <BiSolidTag size={18} className="tag-flipped" />
                    </button>
                )
            case "more":
                if (selectedRows.length === 1) {
                    return (
                        <button
                            className={`${baseClass} dropdown-toggle2 moreoption ${activeDropdown === "more" ? "active" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleDropdown("more")
                            }}
                        >
                            More
                        </button>
                    )
                }
                return null
            default:
                return null
        }
    }

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
    }

    const shouldShowDivider = (index) => {
        if (index === availableActions.length - 1) return false
        if (availableActions[index + 1] === "more") {
            return selectedRows.length === 1
        }
        return true
    }

    if (!selectedRows.length || !availableActions.length) return null

    const visibleActions = availableActions.filter(action => {
        if (action === "more") return selectedRows.length === 1
        return true
    })
    const lastVisibleAction = visibleActions[visibleActions.length - 1]

    return (
        <div className="tube-bulk-actions-container" ref={dropdownRef}>
            <div className="tube-bulk-actions">
                {availableActions.map((action, index) => {
                    const isVisible = action !== "more" || selectedRows.length === 1
                    if (!isVisible) return null

                    const isLastVisible = action === lastVisibleAction

                    return (
                        <React.Fragment key={`${action}-${index}`}>
                            <div className="tube-bulk-button">
                                {renderActionButton(action, index, isLastVisible)}
                            </div>
                            {shouldShowDivider(index) && <div className="tube-divider" />}
                        </React.Fragment>
                    )
                })}

                {activeDropdown === "tag" && (
                    <div className="tag-options">
                        <p className="addtotag-box-heading">Add to tag</p>
                        <ul className="tag-options-list">
                            {tags.map((tag) => {
                                const alreadyTaggedCount = selectedRows.filter(id =>
                                    tag.questions.includes(id)
                                ).length
                                const isRecentlyTagged = recentlyTagged[tag.name] &&
                                    (Date.now() - recentlyTagged[tag.name] < 2000)
                                const willAddNewQuestions = selectedRows.some(id => !tag.questions.includes(id))

                                return (
                                    <li
                                        key={tag.id}
                                        className={`tag-options-item ${alreadyTaggedCount === selectedRows.length ? 'all-tagged' : ''}`}
                                        onClick={() => handleAddToTag(tag.name)}
                                    >
                                        <span
                                            className="tag-dot"
                                            style={{ backgroundColor: tag.color || "#000" }}
                                        ></span>
                                        <span className="tag-name">{tag.name}</span>
                                        <span className="tag-counts">
                                            <span className="total-count">({tag.questions.length})</span>
                                            {alreadyTaggedCount > 0 && (
                                                <span className="selected-count">
                                                    {alreadyTaggedCount}/{selectedRows.length}
                                                </span>
                                            )}
                                        </span>
                                        {isRecentlyTagged && (
                                            <span className="tag-checkmark">
                                                <Check size={16} />
                                                {willAddNewQuestions ? (
                                                    <span className="tooltip">Added to tag</span>
                                                ) : (
                                                    <span className="tooltip">Already in tag</span>
                                                )}
                                            </span>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                        <div>
                            <button
                                className="tags-create-button"
                                onClick={() => setIsNewTagModalOpen(true)}
                            >
                                Create New tag
                            </button>
                        </div>
                    </div>
                )}

                {activeDropdown === "more" && (
                    <div className="more-options">
                        <ul>
                            <li className="more-options-item">Rename</li>
                            <li className="more-options-item">Make a Copy</li>
                        </ul>
                    </div>
                )}
            </div>

            <AddTagModal
                isOpen={isNewTagModalOpen}
                onClose={() => setIsNewTagModalOpen(false)}
                onAddFolder={onAddTag}
                heading="Create New Tag"
            />
        </div>
    )
}

BulkActions.propTypes = {
    selectedRows: PropTypes.array,
    availableActions: PropTypes.array,
    tags: PropTypes.array,
    onAddQuestionsToTag: PropTypes.func,
    onAddTag: PropTypes.func,
    allQuestions: PropTypes.array
}

export default BulkActions