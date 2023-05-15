import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

import './cart.scss';

import {cartActions, userActions} from "../../redux";

const Cart = (props) => {

  const {productsQuantityObj, isProductsInCart, cart, user} = props;

  const productColors = {
    blue: '#00aeef',
    red: '#f52574',
    green: '#24d4ac',
    orange: '#ff7e00',
    black: '#000000',
    purple: '#923899',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSuccessInfo, setIsSuccessInfo] = useState(false);

  const sizesObj = user.cart?.sizes.reduce((accum, size) => {
    accum[size.productId] = size;
    return accum;
  }, {});

  const cartObj = cart?.reduce((accum, product) => {
    accum[product._id] = product;
    return accum;
  }, {});

  let totalPrice = Object.keys(productsQuantityObj).map(key => {
    if (cartObj) {
      if (cartObj[key]?.isSale) {
        return productsQuantityObj[key] * cartObj[key].price.sale;
      } else {
        return productsQuantityObj[key] * cartObj[key]?.price.current;
      }
    }
  }).reduce((sum, price) => sum += price, 0);

  const productQuantityDecrementor = (id) => {
    dispatch(cartActions.decrementProductQuantity(id));
  };
  const productQuantityIncrementor = (id) => {
    dispatch(cartActions.incrementProductQuantity(id));
  };
  const deleteProduct = (id) => {
    dispatch(cartActions.deleteProductFromCart(id));
    dispatch(userActions.deleteProductFromUserCartById({userId: user._id, productId: id}))

    if (cart.length === 1) {
      navigate('/shop');
    }
  };

  return (
    <div className={'cart'}>
      <div className={'container'}>

        <div className={'cart__inner'}>
          {
            cart?.map(product => (
              <div className={'cart__product-info'} key={product._id}>
                <div className={'cart__product-img-wrapper'}>
                  <img className={'cart__product-img'} src={product.photo} alt={'product'}/>
                </div>
                <div className={'cart__product-content'}>
                  <h3 className={'cart__product-title'}>
                    {product.title}
                  </h3>
                  <div className={'cart__product-inner'}>
                        <span className={'cart__product-color-text'}>
                          Color:
                        </span>
                    <div className={'cart__product-color'} style={{backgroundColor: productColors[product.color]}}></div>

                    <div className={'cart__product-size'}>
                      Size:
                      <span className={'cart__product-size-text'}>
                            {sizesObj[product._id].size}
                          </span>
                    </div>
                  </div>
                  <div className={'cart__product-inner'}>
                    <div className={'cart__product-sku'}>
                      SKU:
                      <span className={'cart__product-sku-text'}>
                              {product.sku}
                            </span>
                    </div>
                    <div className={'cart__product-price'}>
                      Price:
                      {product.isSale
                        ?
                        <span className={'cart__product-text'}>
                            ${product.price.sale}
                          </span>
                        :
                        <span className={'cart__product-text'}>
                            ${product.price.current}
                          </span>
                      }
                    </div>
                  </div>
                  <div className={'cart__product-inner'}>
                    <div className={'cart__product-buttons'}>
                      <button className={'cart__product-button'}
                              onClick={() => productQuantityDecrementor(product._id)}
                              disabled={productsQuantityObj[product._id] === 1}
                      >
                        -
                      </button>
                      <span className={'cart__product-quantity'}>
                                {productsQuantityObj[product._id]}
                          </span>
                      <button className={'cart__product-button'}
                              onClick={() => productQuantityIncrementor(product._id)}
                      >
                        +
                      </button>
                    </div>
                    Total:
                    {product.isSale
                      ?
                      <span className={'cart__product-text'}>
                        ${productsQuantityObj[product._id] * product.price.sale}
                      </span>
                      :
                      <span className={'cart__product-text'}>
                        ${productsQuantityObj[product._id] * product.price.current}
                      </span>
                    }
                  </div>
                  <button className={'cart__product-del-btn'} onClick={() => deleteProduct(product._id)}>
                    DELETE
                  </button>
                </div>
              </div>
            ))
          }

        </div>

        {
          isProductsInCart > 0
          &&
          <div className={'cart__bottom-info'}>
            <div className={isSuccessInfo ? 'cart__bottom-info-success active' : 'cart__bottom-info-success'}>
              <span className={'cart__bottom-info-success-text'}>
                Success!!!
              </span>
              <button className={'cart__bottom-info-success-btn'} onClick={() => setIsSuccessInfo(false)}>
                ok
              </button>
            </div>
            <div className={'cart__bottom-content'}>
              Total price:
              <span className={'cart__bottom-text'}>${totalPrice}</span>
            </div>
            <button className={'cart__bottom-btn'} onClick={() => setIsSuccessInfo(true)}>
              BUY
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export {Cart}