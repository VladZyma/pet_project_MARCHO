import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';

import {Top} from "../../component";
import {WishlistList} from "../../component";
import {userActions} from "../../redux";

const WishlistPage = () => {

  const dispatch = useDispatch();

  const {user, wishlist} = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(userActions.addProductsToWishlist({productsIdArr: user.wishlist}));
  }, [dispatch, user.wishlist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <section className={'wishlist-page'}>
        <Top title={'Wishlist'}/>
        <WishlistList wishlist={wishlist}/>
      </section>
  );
};

export {WishlistPage}