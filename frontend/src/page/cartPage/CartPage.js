import {useSelector} from "react-redux";

import {Cart, Top} from "../../component";

const CartPage = () => {
  const {productsInCart} = useSelector(state => state.productReducer);
  const {value} = useSelector(state => state.cartReducer);
  console.log(productsInCart);
  console.log(value);

  const productsObj = productsInCart.reduce((accum, product) => {
    accum[product.id] = product;
    return accum;
  }, {});

  return (
      <section className={'cart-page'}>
        <Top title={'Cart'}/>
        <Cart productsObj={productsObj} productsQuantityObj={value}/>
      </section>
  );
};

export {CartPage}