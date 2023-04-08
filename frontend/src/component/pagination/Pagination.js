import {useState} from 'react';


import './pagination.scss';

const Pagination = (props) => {
  const {setQuery, page, prevPage, nextPage, totalPages, onPageChange} = props;

  const [currentPage, setCurrentPage] = useState(page);


  const prevPageHandler = () => {
    setCurrentPage(page - 1);
    setQuery(prevQuery => ({page: +prevQuery.get('page') - 1}));
  };
  const nextPageHandler = () => {
    setCurrentPage(page + 1);
    setQuery(prevQuery => ({page: +prevQuery.get('page') + 1}));
  };


  return (
      <div className={'pagination'}>
        <div className={'pagination__inner'}>
          <button className={'pagination__prev-button'} disabled={!prevPage} onClick={prevPageHandler}>
            previous
          </button>
          <div className={'pagination__nums'}>
            <button className={`pagination__nums-button ${currentPage === page ? 'active' : ''}`}>
              1
            </button>
            <button className={`pagination__nums-button ${currentPage === page ? 'active' : ''}`} disabled={(+page + 1) > totalPages}>
              2
            </button>
            <button className={`pagination__nums-button ${currentPage === page ? 'active' : ''}`} disabled={(+page + 2) >= totalPages}>
              3
            </button>
            <button className={'pagination__nums-button'}>
              ....
            </button>
            <button className={'pagination__nums-button'}>
              {totalPages}
            </button>
          </div>
          <button className={'pagination__next-button'} disabled={!nextPage} onClick={nextPageHandler}>
            next
          </button>
        </div>
      </div>
  );
};

export {Pagination}
