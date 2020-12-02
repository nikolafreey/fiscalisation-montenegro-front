import React from 'react';
import { fetchPageNumbers, LEFT_PAGE, RIGHT_PAGE } from '../../../helpers/pagination';

const PaginationControls = ({
  paginatedData,
  onPageChange,
  pageNeighbours = 2,
}) => {
  const { current_page, last_page } = paginatedData;

  const handleClick = page => event => {
    event.preventDefault();
    onPageChange(page);
  }

  const handleMoveLeft = event => {
    event.preventDefault();
    onPageChange(current_page - (pageNeighbours * 2) - 1);
  }

  const handleMoveRight = event => {
    event.preventDefault();
    onPageChange(current_page + (pageNeighbours * 2) + 1);
  }

  const pages = fetchPageNumbers(current_page, last_page, pageNeighbours);

  console.log(pages)

  return (
    <nav className="pagination-wrapper" aria-label="Pagination">
      <div className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <button key={index} onClick={handleMoveLeft}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            );

          if (page === RIGHT_PAGE)
          return (
              <button key={index} onClick={handleMoveRight}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            );

            return (
              <button key={index} className={page === current_page && 'active'} onClick={() => handleClick(page)}>
                {page}
              </button>
            );
        })}
      </div>
    </nav>
  );
};

export default PaginationControls;
