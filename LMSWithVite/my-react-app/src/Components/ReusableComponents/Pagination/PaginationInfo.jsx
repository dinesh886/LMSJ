import "./PaginationInfo.css"

const PaginationInfo = ({ filteredQuestions, rowsPerPage, currentPage, label, totalItems, isSearching = false }) => {
  const filteredCount = filteredQuestions?.length || 0

  if (filteredCount === 0 && isSearching) {
    return <div className="pagination-info">No {label.toLowerCase()} found matching your search</div>
  }

  if (filteredCount === 0) {
    return <div className="pagination-info">No {label.toLowerCase()} available</div>
  }

  const startIndex = 1
  const endIndex = Math.min(rowsPerPage, filteredCount)

  return (
    <div className="pagination-info">
      {isSearching ? (
        <>
          Showing {startIndex} to {endIndex} of {filteredCount} matching {label.toLowerCase()}
          {totalItems && totalItems !== filteredCount && (
            <span className="total-count"> (out of {totalItems} total)</span>
          )}
        </>
      ) : (
        `Showing ${startIndex} to ${endIndex} of ${filteredCount} ${label.toLowerCase()}`
      )}
    </div>
  )
}

export default PaginationInfo
