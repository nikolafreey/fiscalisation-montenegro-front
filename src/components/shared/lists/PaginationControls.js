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
    <nav aria-label="Pagination">
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <span
                  className="page-link"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </span>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <span
                  className="page-link"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </span>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${current_page === page ? ' active' : ''}`}
            >
              <span
                className="page-link"
                onClick={handleClick(page)}
              >
                {page}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationControls;
