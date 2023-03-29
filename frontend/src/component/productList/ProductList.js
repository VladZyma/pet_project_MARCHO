import {ProductCard} from "../productCard/ProductCard";

import './productList.scss';

const ProductList = () => {

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
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </div>
        </div>
      </section>
  );
};

export {ProductList}
