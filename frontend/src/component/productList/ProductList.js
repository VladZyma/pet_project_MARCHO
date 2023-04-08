import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './productList.scss';

import {ProductCard} from "../productCard/ProductCard";
import {productActions} from "../../redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.productReducer);

  useEffect(() => {
    dispatch(productActions.getAllProducts({page: '1'}));
  }, [dispatch]);
  console.log(products);

  return (
      <section className={'product-list'}>
        <div className={'container'}>
          <h3 className={'title product-list__title'}>
            TRENDING PRODUCTS
          </h3>
          <p className={'product-list__text'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodmoe tempor
            incididunt ut labore et dolore aliqua.
          </p>
          <div className={'product-list__inner'}>
            {products.products?.map(product => <ProductCard product={product} key={product._id}/>)}
          </div>
        </div>
      </section>
  );
};

export {ProductList}
