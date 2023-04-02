import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from 'react-router-dom';

import {Shop} from "../../component";
import {productActions} from "../../redux";

const ShopPage = () => {
  const dispatch = useDispatch();

  const {products, loading, error} = useSelector(state => state.productReducer);
  const [query, setQuery] = useSearchParams({page: '1'});

  console.log('Products:', products);
  console.log('Page:', query.get('page'));


  useEffect(() => {
    console.log('==== UseEffect ShopPage ====');
    dispatch(productActions.getAllProducts({page: query.get('page')}));
  }, [dispatch, query]);

  return (
      <div>
        {loading && <h1>Loading...............</h1>}
        <Shop products={products} setQuery={setQuery}/>
      </div>
  );
};

export {ShopPage}