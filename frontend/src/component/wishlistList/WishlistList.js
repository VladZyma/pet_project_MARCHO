import {useState} from "react";
import {useDispatch} from "react-redux";

import './wishlistList.scss';
import {ProductStarRating} from "../productStarRating/ProductStarRating";
import {WishlistSizePopUp} from "../wishlistSizePopUp/WishlistSizePopUp";
import {oauthService} from "../../service";
import {userActions} from "../../redux";

const WishlistList = ({wishlist}) => {

    const productColors = {
        blue: '#00aeef',
        red: '#f52574',
        green: '#24d4ac',
        orange: '#ff7e00',
        black: '#000000',
        purple: '#923899',
    };

    const userId = oauthService.getUserId();

    const dispatch = useDispatch();

    const [isShowWishlistSizePopUp, setIsShowWishlistSizePopUp] = useState(false);

    const addToCart = () => {
        setIsShowWishlistSizePopUp(true);
    };

    const deleteFromWishlist = (productId) => {
        dispatch(userActions.deleteProductFromUserWishListById({userId, productId}));
    };

    return (
        <div className={'wishlist'}>
            <div className={'container'}>
                <div className={'wishlist__inner'}>

                    {
                        wishlist?.map(product => (
                            <div className={'wishlist__product-wrapper'} key={product._id}>

                                <div className={'wishlist__product-img-wrapper'}>
                                    <img className={'wishlist__product-img'} src={product.photo} alt={'product'}/>
                                </div>
                                <div className={'wishlist__product-content-wrapper'}>
                                    <h3 className={'wishlist__product-title'}>
                                        {product.title}
                                    </h3>
                                    <ProductStarRating starsNumber={product.rating}/>
                                    <span className={'wishlist__product-price-text'}>
                                        Price:
                                    </span>
                                    {
                                        product.isSale
                                        ?
                                            <div className={'wishlist__product-price'}>
                                                <div className={'wishlist__product-price-current'}>
                                                    {`$${product.price.sale}`}
                                                </div>
                                                <div className={'wishlist__product-price-old wishlist__product-price-old--line-throw'}>
                                                    {`$${product.price.current}`}
                                                </div>
                                            </div>
                                        :
                                            <div className={'wishlist__product-price'}>
                                                <div className={'wishlist__product-price-old'}>
                                                    {`$${product.price.current}`}
                                                </div>
                                            </div>
                                    }
                                    <div className={'wishlist__product-color-wrapper'}>
                                        Color:
                                        <div className={'wishlist__product-color'} style={{backgroundColor: productColors[product.color]}}>
                                        </div>
                                    </div>
                                    <div className={'wishlist__product-buttons-wrapper'}>
                                        <button className={'wishlist__product-button'} onClick={() => deleteFromWishlist(product._id)}>
                                            Delete
                                        </button>
                                        <button className={'wishlist__product-button'} onClick={addToCart}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>

                                <WishlistSizePopUp
                                    product={product}
                                    isShowWishlistSizePopUp={isShowWishlistSizePopUp}
                                    setIsShowWishlistSizePopUp={setIsShowWishlistSizePopUp}
                                />

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export {WishlistList}