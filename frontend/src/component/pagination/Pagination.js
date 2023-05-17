import './pagination.scss';

const Pagination = (props) => {

  const {query, setQuery, page, prevPage, nextPage, totalPages, scrollHere} = props;

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const prevPageHandler = () => {
    setQuery(prevQuery => ({...search, page: +prevQuery.get('page') - 1}));

    scrollHere.current.scrollIntoView();
  };
  const nextPageHandler = () => {
    setQuery(prevQuery => ({...search, page: +prevQuery.get('page') + 1}));

    scrollHere.current.scrollIntoView();
  };

  return (
      <div className={'pagination'}>
        <div className={'pagination__inner'}>
          <button className={'pagination__prev-button'} disabled={!prevPage} onClick={prevPageHandler}>
            previous
          </button>
          <div className={'pagination__nums'}>
            <span className={'pagination__nums-current'}>
              {page}
            </span>
            <span className={'pagination__nums-text'}>
              of
            </span>
            <span className={'pagination__nums-total'}>
              {totalPages}
            </span>
          </div>
          <button className={'pagination__next-button'} disabled={!nextPage} onClick={nextPageHandler}>
            next
          </button>
        </div>
      </div>
  );
};

export {Pagination}
