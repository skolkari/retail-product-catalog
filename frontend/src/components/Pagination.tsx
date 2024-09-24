import "./Pagination.css";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  onLimitChange,
}) => {
  // current page is used to determine which page is currently
  const [currentPage, setCurrentPage] = useState(1);

  // limit is used to determine how many items to display per page
  // use 8 as default limit
  const [limit, setLimit] = useState(12);

  // calculate page numbers to display based on current page and total pages
  // if we consider example where there are total 15 pages to paginate.
  // if current page is 1, we want to display page numbers like this:
  // 1 2 3 4 5 .. 15
  // if current page is 8, we want to display page numbers like this:
  // 1 .. 6 7 8 9 10 .. 15
  // if current page is 15, we want to display page numbers like this:
  // 1 .. 11 12 13 14 15
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Maximum number of pages to display in the pagination
    const sidePagesToShow = Math.floor(maxPagesToShow / 2); // Number of pages to show on each side of the current page
    console.log("sidePagesToShow", sidePagesToShow);
    console.log("totalPages", totalPages);

    // If the total number of pages is less than or equal to the maximum pages to show
    if (totalPages <= maxPagesToShow) {
      // Add all page numbers to the pages array
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If the current page is near the beginning
      if (currentPage <= sidePagesToShow + 1) {
        // Show the first few pages
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        // Add an ellipsis and the last page
        pages.push("..", totalPages);
      }
      // If the current page is near the end
      else if (currentPage >= totalPages - sidePagesToShow) {
        // Add the first page and an ellipsis
        pages.push(1, "..");
        // Show the last few pages
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      }
      // If the current page is somewhere in the middle
      else {
        // Add the first page and an ellipsis
        pages.push(1, "..");
        // Show a range of pages around the current page
        for (
          let i = currentPage - sidePagesToShow;
          i <= currentPage + sidePagesToShow;
          i++
        ) {
          pages.push(i);
        }
        // Add an ellipsis and the last page
        pages.push("..", totalPages);
      }
    }

    console.log("pages", pages);

    return pages;
  };

  const handlePageChange = (page: string | number) => {
    if (typeof page === "string") {
      if (page === "..") return;
    } else if (page !== currentPage) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handleLimitChange = (selectedLimit: number) => {
    setLimit(selectedLimit);
    if (onLimitChange) {
      onLimitChange(selectedLimit);
    }
  };

  return (
    <div className="pagination">
      {totalPages > 1 && (
        <div className="pages-wrapper">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <div className="pagination-pages">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`pagination-btn ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageChange(page as number)}
                disabled={page === ".."}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="pagination-info">{`${currentPage} of ${totalPages}`}</span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}

      <div className="limit-wrapper">
        <select
          className="pagination-limit"
          value={limit}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
          <option value={48}>48</option>
          <option value={60}>60</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
