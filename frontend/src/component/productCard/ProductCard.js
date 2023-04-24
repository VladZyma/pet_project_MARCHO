import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import {useSelector} from 'react-redux';

import './productCard.scss';

import {ProductStarRating} from "../productStarRating/ProductStarRating";
import {ProductSizePopUp} from "../productSizePopUp/ProductSizePopUp";

const ProductCard = (props) => {

  const {product: {title, rating, price, isSale, photo, review, _id, info}, product, isGrid} = props;

  const {isLoggedIn} = useSelector(state => state.oauthReducer);

  const [showSizePopUp, setShowSizePopUp] = useState(false);
  const [showSizePopUpGrid, setShowSizePopUpGrid] = useState(false);
  const [showInfoPopUp, setShowInfoPopUp] = useState(false);

  const checkIsUserLoggedIn = () => {

    if (!isGrid && isLoggedIn) {
      setShowSizePopUp(true);
    } else if (isGrid && isLoggedIn) {
      setShowSizePopUpGrid(true);
    } else if (!isLoggedIn) {
      setShowInfoPopUp(true);
    }

  };

  return (
      <div className={!isGrid ? 'card' : 'card card--list'}>
        <div className={'card__img-wrapper'}>
          <img className={'card__img'} src={photo} alt="product"/>
          {isSale &&
              <div className={'card__sale'}>
                sale
              </div>
          }
          {
            !isGrid
                ?
                <div className={'card__links'}>
                  <NavLink className={'card__link'} to={`/shop/product/${_id}`}>
                    <svg width={20.03} height={20}>
                      <path fill="#29282d" fillRule="evenodd"
                            d="m19.89 18.7-5.81-5.81a7.944 7.944 0 1 0-1.18 1.178l5.81 5.81a.417.417 0 0 0 .59 0l.59-.589a.421.421 0 0 0 0-.589ZM7.93 14.167a6.25 6.25 0 1 1 6.25-6.25 6.254 6.254 0 0 1-6.25 6.246Z"/>
                    </svg>
                  </NavLink>
                  <button className={'card__link card__link--btn'} onClick={checkIsUserLoggedIn}>
                    <svg width={16} height={20}>
                      <path fill="#29282d" fillRule="evenodd"
                            d="M16 17.29 14.855 4.4a.553.553 0 0 0-.547-.51h-2.354a3.95 3.95 0 0 0-7.9 0H1.7a.55.55 0 0 0-.547.51L.008 17.29v.05a2.854 2.854 0 0 0 3 2.67h10a2.854 2.854 0 0 0 3-2.67.257.257 0 0 0 0-.05ZM8.006 1.11a2.844 2.844 0 0 1 2.844 2.78H5.162a2.844 2.844 0 0 1 2.844-2.78Zm5 17.79h-10a1.763 1.763 0 0 1-1.9-1.53L2.206 5h1.847v1.68a.552.552 0 0 0 1.1 0V5h5.692v1.68a.552.552 0 0 0 1.1 0V5H13.8l1.1 12.37A1.765 1.765 0 0 1 13 18.9Zm0 0"/>
                    </svg>
                  </button>
                  <button className={'card__link card__link--btn'}>
                    <svg width={23} height={20}>
                      <path fill="#29282d" fillRule="evenodd"
                            d="M16.89 0a5.854 5.854 0 0 0-4.82 2.62 9.549 9.549 0 0 0-.57.91 9.549 9.549 0 0 0-.57-.91 5.853 5.853 0 0 0-9.25-.66A6.77 6.77 0 0 0 0 6.52a8.269 8.269 0 0 0 2.35 5.51 52.123 52.123 0 0 0 5.89 5.42c.89.74 1.81 1.52 2.79 2.36l.03.02a.656.656 0 0 0 .44.17.7.7 0 0 0 .45-.17l.02-.02c.98-.84 1.91-1.62 2.8-2.36a51.927 51.927 0 0 0 5.88-5.42 8.284 8.284 0 0 0 2.36-5.51 6.819 6.819 0 0 0-1.68-4.56A5.906 5.906 0 0 0 16.89 0Zm-3 16.44c-.77.64-1.56 1.3-2.39 2.02-.83-.72-1.62-1.38-2.39-2.02-4.68-3.92-7.77-6.51-7.77-9.92a5.468 5.468 0 0 1 1.35-3.68 4.5 4.5 0 0 1 7.14.55 7.794 7.794 0 0 1 1.03 2.01.675.675 0 0 0 1.28 0 8.145 8.145 0 0 1 1.03-2.01 4.505 4.505 0 0 1 7.15-.55 5.51 5.51 0 0 1 1.34 3.68c0 3.41-3.09 6-7.77 9.92Z"/>
                    </svg>
                  </button>
                </div>
                :
                <div className={'card__links card__links--list'}>
                  <NavLink className={'card__link'} to={`/shop/product/${_id}`}>
                    <svg width={20.03} height={20}>
                      <path fill="#949494" fillRule="evenodd"
                            d="m19.89 18.7-5.81-5.81a7.944 7.944 0 1 0-1.18 1.178l5.81 5.81a.417.417 0 0 0 .59 0l.59-.589a.421.421 0 0 0 0-.589ZM7.93 14.167a6.25 6.25 0 1 1 6.25-6.25 6.254 6.254 0 0 1-6.25 6.246Z"/>
                    </svg>
                  </NavLink>
                  <button className={'card__link card__link--btn'}>
                    <svg width={23} height={20}>
                      <path fill="#949494" fillRule="evenodd"
                            d="M16.89 0a5.854 5.854 0 0 0-4.82 2.62 9.549 9.549 0 0 0-.57.91 9.549 9.549 0 0 0-.57-.91 5.853 5.853 0 0 0-9.25-.66A6.77 6.77 0 0 0 0 6.52a8.269 8.269 0 0 0 2.35 5.51 52.123 52.123 0 0 0 5.89 5.42c.89.74 1.81 1.52 2.79 2.36l.03.02a.656.656 0 0 0 .44.17.7.7 0 0 0 .45-.17l.02-.02c.98-.84 1.91-1.62 2.8-2.36a51.927 51.927 0 0 0 5.88-5.42 8.284 8.284 0 0 0 2.36-5.51 6.819 6.819 0 0 0-1.68-4.56A5.906 5.906 0 0 0 16.89 0Zm-3 16.44c-.77.64-1.56 1.3-2.39 2.02-.83-.72-1.62-1.38-2.39-2.02-4.68-3.92-7.77-6.51-7.77-9.92a5.468 5.468 0 0 1 1.35-3.68 4.5 4.5 0 0 1 7.14.55 7.794 7.794 0 0 1 1.03 2.01.675.675 0 0 0 1.28 0 8.145 8.145 0 0 1 1.03-2.01 4.505 4.505 0 0 1 7.15-.55 5.51 5.51 0 0 1 1.34 3.68c0 3.41-3.09 6-7.77 9.92Z"/>
                    </svg>
                  </button>
                </div>
          }
          {
            showSizePopUp
              &&
              <ProductSizePopUp
                  info={info}
                  product={product}
                  isGrid={isGrid}
                  showSizePopUp={showSizePopUp}
                  setShowSizePopUp={setShowSizePopUp}
              />
          }
        </div>
        {
          !isGrid
              ?
              <div className={'card__content'}>
                <div className={'card__stars'}>
                  <ProductStarRating starsNumber={rating}/>
                </div>
                <h4 className={'card__title'}>
                  {title}
                </h4>
                <div className={'card__price'}>
                  {isSale
                      ?
                      <>
                        <div className={'card__price-current'}>
                          {`$${price.sale}`}
                        </div>
                        <div className={'card__price-old card__price-old--line-throw'}>
                          {`$${price.current}`}
                        </div>
                      </>
                      :
                      <div className={'card__price-old'}>
                        {`$${price.current}`}
                      </div>
                  }
                </div>
              </div>
              :
              <div className={'card__content'}>
                <h4 className={'card__title'}>
                  {title}
                </h4>
                <div className={'card__content-inner'}>
                  <div className={'card__price'}>
                    {isSale
                        ?
                        <>
                          <div className={'card__price-current'}>
                            {`$${price.sale}`}
                          </div>
                          <div className={'card__price-old card__price-old--line-throw'}>
                            {`$${price.current}`}
                          </div>
                        </>
                        :
                        <div className={'card__price-old'}>
                          {`$${price.current}`}
                        </div>
                    }
                  </div>
                  <div className={'card__stars'}>
                    <ProductStarRating starsNumber={rating}/>
                  </div>
                </div>
                <p className={'card__content-text'}>
                  {review}
                </p>
                <button className={'card__content-button'} onClick={checkIsUserLoggedIn}>Add to cart</button>
                {
                  showSizePopUpGrid
                    &&
                    <ProductSizePopUp
                        info={info}
                        product={product}
                        isGrid={isGrid}
                        showSizePopUpGrid={showSizePopUpGrid}
                        setShowSizePopUpGrid={setShowSizePopUpGrid}
                    />
                }
              </div>

        }
      </div>
  );
};

export {ProductCard}