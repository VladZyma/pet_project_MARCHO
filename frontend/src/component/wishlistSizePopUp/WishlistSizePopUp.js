import {useDispatch} from 'react-redux';

import './wishlistSizePopUp.scss';
import {createProductObj} from "../../helper";
import {productActions, cartActions, userActions} from "../../redux";
import {oauthService} from "../../service";

const WishlistSizePopUp = (props) => {

  const {product, isShowWishlistSizePopUp, setIsShowWishlistSizePopUp} = props;

  const dispatch = useDispatch();

  const userId = oauthService.getUserId();

  const selectSize = (event) => {
    const selectedSize = event.target.value;
    const productObj = createProductObj(product, selectedSize);

    setIsShowWishlistSizePopUp(false);
    event.target.checked = false;

    addToCartHandler(productObj, product._id, selectedSize);
  };

  const addToCartHandler = (obj, id, selectedSize) => {
    // dispatch(productActions.addProductInCart(obj));
    dispatch(cartActions.addProductToCart(id));
    dispatch(userActions.addProductToUserCart({userId, productId: id, selectedSize}));
  };

  return (
      <div className={isShowWishlistSizePopUp ? 'wishlistSizePopUp wishlistSizePopUp--show' : 'wishlistSizePopUp'}>
        <form className={'wishlistSizePopUp__form'}>
          {product?.info.map((info, i) => (
              <label className={'wishlistSizePopUp__form-label'} key={`wishlistSizePopUp-${i}`}>
                <input className={'wishlistSizePopUp__form-input'}
                       type={'radio'}
                       value={info.size}
                       name={'size'}
                       onChange={selectSize}
                />
                <span className={'wishlistSizePopUp__form-checkbox'}>
                  {info.size}
                </span>
              </label>
          ))}
        </form>
      </div>
  );
};

export {WishlistSizePopUp}
