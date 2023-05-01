import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import './productDetails.scss';

import {ProductDetailsSlider} from "../productDetailsSlider/ProductDetailsSlider";
import {ProductStarRating} from "../productStarRating/ProductStarRating";
import {productActions, cartActions} from "../../redux";
import {createProductObj} from "../../helper";

const ProductDetails = () => {

  const productColors = {
    blue: '#00aeef',
    red: '#f52574',
    green: '#24d4ac',
    orange: '#ff7e00',
    black: '#000000',
    purple: '#923899',
  };

  const {productId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {product} = useSelector(state => state.productReducer);
  const {isLoggedIn} = useSelector(state => state.oauthReducer);

  let selectedSize = '';

  useEffect(() => {
    dispatch(productActions.getProductById(productId));
  }, [dispatch, productId]);

  const selectSize = (event) => {
    selectedSize = event.target.value;
  };

  const addToCartHandler = () => {

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const productObj = createProductObj(product, selectedSize);

      dispatch(productActions.addProductInCart(productObj));
      dispatch(cartActions.addProductToCart(productId));
    }

  };

  return (
      <section className={'product'}>
        <div className={'container'}>
          <div className={'product__inner'}>
            <div className={'product__slider-wrapper'}>
              <ProductDetailsSlider photo={product.photo}/>
            </div>
            <div className={'product__content'}>
              <h3 className={'product__content-title'}>
                {product.title}
              </h3>
              <div className={'product__content-inner'}>
                <div className={'product__content-price'}>
                  {
                    product.isSale
                        ?
                        <>
                          <div className={'product__content-price-current'}>
                            {`$${product.price?.sale}`}
                          </div>
                          <div className={'product__content-price-old product__content-price-old--line-throw'}>
                            {`$${product.price?.current}`}
                          </div>
                        </>
                        :
                        <div className={'product__content-price-current'}>
                          {`$${product.price?.current}`}
                        </div>
                  }
                </div>
                <div className={'product__content-stars'}>
                  <ProductStarRating starsNumber={product.rating}/>
                  <span className={'product__content-stars-votes'}>
                    {`(${product.votes})`}
                  </span>
                </div>
              </div>
              <p className={'product__content-text'}>
                  <span className={'product__content-subtitle'}>
                    Review:
                  </span>
                {product.review}
              </p>
              <div className={'product__content-color'}>
                  <span className={'product__content-subtitle'}>
                    Color:
                  </span>
                <div className={'product__content-color-item'} style={{backgroundColor: productColors[product.color]}}></div>
              </div>
              <div className={'product__content-size'}>
                 <span className={'product__content-subtitle'}>
                    Size:
                  </span>
                <form className={'product__content-size-form'}>
                  {product.info?.map((info, i) => (
                      <label className={'product__content-size-form-label'} key={i + 1}>
                        <input className={'product__content-size-form-input'} type={'radio'} value={info.size} name={'size'} onChange={selectSize}/>
                        <span className={'product__content-size-form-checkbox'}>
                          {info.size}
                        </span>
                      </label>
                  ))}
                </form>
              </div>
              <ul className={'product__content-info-list'}>
                <li className={'product__content-info-item'}>
                  <span className={'product__content-info-title product__content-subtitle'}>
                    SKU
                  </span>
                  <span className={'product__content-info-text'}>
                    {product.sku}
                  </span>
                </li>
                <li className={'product__content-info-item'}>
                  <span className={'product__content-info-title product__content-subtitle'}>
                    Categories
                  </span>
                  <span className={'product__content-info-text'}>
                    {product.categories && `${product.categories[0]}`}
                  </span>
                </li>
                <li className={'product__content-info-item'}>
                  <span className={'product__content-info-title product__content-subtitle'}>
                    Tags
                  </span>
                  <div className={'product__content-info-text-wrapper'}>
                    {product.tags?.map((tag, i) => (
                      <span className={'product__content-info-text'} key={i + 1}>
                        {`${tag}`}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
              <button className={'product__content-button'} onClick={addToCartHandler}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};

export {ProductDetails}
