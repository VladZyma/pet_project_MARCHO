const Shop = (props) => {
  const {products: {products, totalPages, prevPage, nextPage}, setQuery} = props;

  const prevPageHandler = () => {
    setQuery(prevQuery => ({page: +prevQuery.get('page') - 1}));
  };
  const nextPageHandler = () => {
    setQuery(prevQuery => ({page: +prevQuery.get('page') + 1}));
  };

  return (
      <div>
        <h1>Shop</h1>
        <button disabled={!prevPage} onClick={prevPageHandler}>prev</button>
        <button disabled={!nextPage} onClick={nextPageHandler}>next</button>
      </div>
  );
};

export {Shop}