import {useSelector} from "react-redux";

import {Cart, Top} from "../../component";

const CartPage = () => {
  const {productsInCart} = useSelector(state => state.productReducer);
  const {value} = useSelector(state => state.cartReducer);

  const productsObj = productsInCart.reduce((accum, product) => {
    console.log('productsObg');
    accum[product.id] = product;
    return accum;
  }, {});

  let isProductsInCart = productsInCart.length;

  return (
      <section className={'cart-page'}>
        <Top title={'Cart'}/>
        <Cart productsObj={productsObj} productsQuantityObj={value} isProductsInCart={isProductsInCart}/>
      </section>
  );
};

export {CartPage}