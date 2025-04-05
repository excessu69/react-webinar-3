import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ totalPages, currentPage, onPageChange, limit, onLimitChange }) {
  const getVisiblePages = () => {
    const pages = new Set();
    pages.add(1);
    if (totalPages > 1) pages.add(totalPages);

    if (currentPage > 2) pages.add(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.add(currentPage);
    if (currentPage < totalPages - 1) pages.add(currentPage + 1);

    while (pages.size < 4 && pages.size < totalPages) {
      const sortedPages = [...pages].sort((a, b) => a - b);
      if (sortedPages[1] > 2) pages.add(sortedPages[1] - 1);
      if (sortedPages[sortedPages.length - 2] < totalPages - 1) pages.add(sortedPages[sortedPages.length - 2] + 1);
    }
    return [...pages].sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="Pagination">
      <div className="Pagination-limit">
        <span>Показывать по:</span>
        {[5, 10, 20].map(value => (
          <button
            key={value}
            onClick={() => onLimitChange(value)}
            className={value === limit ? 'active' : ''}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="Pagination-pages">
        {visiblePages.map((page, index, array) => (
          <React.Fragment key={page}>
            {index > 0 && page !== array[index - 1] + 1 && <span className="Pagination-ellipsis">...</span>}
            <button onClick={() => onPageChange(page)} disabled={page === currentPage}>
              {page}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
