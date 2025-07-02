"use client"
import "./PaginationButton.css"

const PaginationButtons = ({ filteredQuestions, rowsPerPage, currentPage, loadMore, fullView, fullViewMode }) => {
  const totalItems = filteredQuestions?.length || 0
  const hasMoreData = rowsPerPage < totalItems

  if (totalItems === 0) return null

  return (
    <div className="pagination-buttons mt-4 d-flex justify-content-center gap-3">
      {hasMoreData && !fullViewMode && (
        <button className="load-more-button2" onClick={loadMore}>
          Load More 
          {/* ({Math.min(10, totalItems - rowsPerPage)} more) */}
        </button>
      )}
      {hasMoreData && (
        <button className="full-view-button" onClick={fullView}>
          {fullViewMode ? "Collapse View" : "Full View"}
        </button>
      )}
    </div>
  )
}

export default PaginationButtons
