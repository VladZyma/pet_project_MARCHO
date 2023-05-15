import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";

import {Cart, Top} from "../../component";
import {userActions, cartActions} from "../../redux";

const CartPage = () => {

  const dispatch = useDispatch();

  const {value} = useSelector(state => state.cartReducer);
  const {user, cart} = useSelector(state => state.userReducer);
  // console.log('USER', user);
  // console.log('CART', cart);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userActions.getProductsFromUserCart({productsIdArr: user.cart?.products}));
  }, [dispatch, user.cart?.products]);

  let isProductsInCart = user.cart?.products.length;

  return (
      <section className={'cart-page'}>
        <Top title={'Cart'}/>
        <Cart cart={cart} user={user} productsQuantityObj={value} isProductsInCart={isProductsInCart}/>
      </section>
  );
};

export {CartPage}