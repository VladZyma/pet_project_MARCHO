import {useSelector} from "react-redux";
import {useEffect} from "react";

import {Cart, Top} from "../../component";

const CartPage = () => {
  const {productsInCart} = useSelector(state => state.productReducer);
  const {value} = useSelector(state => state.cartReducer);

  const productsObj = productsInCart.reduce((accum, product) => {
    accum[product.id] = product;
    return accum;
  }, {});

  let isProductsInCart = productsInCart.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <section className={'cart-page'}>
        <Top title={'Cart'}/>
        <Cart productsObj={productsObj} productsQuantityObj={value} isProductsInCart={isProductsInCart}/>
      </section>
  );
};

export {CartPage}