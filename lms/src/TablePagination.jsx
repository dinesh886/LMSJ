import React from "react";

const TablePagination = ({ currentCount, totalCount, loadMore }) => {
  const handleLoadMore = () => {
    loadMore(); // Call the loadMore function passed as a prop
  };

  return (
    <div className="table-pagination">
      <p>
        Showing {currentCount} out of {totalCount} projects.
      </p>
      <button onClick={handleLoadMore} className="load-more-button">
        Load More
      </button>
    </div>
  );
};

export default TablePagination;
