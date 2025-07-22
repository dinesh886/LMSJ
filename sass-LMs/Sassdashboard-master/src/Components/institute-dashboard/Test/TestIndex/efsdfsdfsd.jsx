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

    // ... rest of your BulkActions component ...

    return (
        <div className="tube-bulk-actions-container" ref={dropdownRef}>
            {/* ... dropdown UI with tag options ... */}
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