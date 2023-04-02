import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Shop} from "../../component";
import {productActions} from "../../redux";

const ShopPage = () => {
  const dispatch = useDispatch();

  const {products, loading, error} = useSelector(state => state.productReducer);
  console.log('Products:', products);
  console.log('Loading:', loading);

  useEffect(() => {
    console.log('==== UseEffect ShopPage ====');
    dispatch(productActions.getAllProducts());
  }, []);

  return (
      <div>
        {loading && <h1>Loading...............</h1>}
        <Shop products={products}/>
      </div>
  );
};

export {ShopPage}