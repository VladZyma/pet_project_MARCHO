import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import './cart.scss';

import {cartActions, productActions} from "../../redux";

const Cart = (props) => {
  const {productsObj, productsQuantityObj, isProductsInCart} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = Object.keys(productsQuantityObj)
      .map(key => productsObj[key].price * productsQuantityObj[key])
      .reduce((sum, price) => sum += price, 0);


  const productQuantityDecrementor = (id) => {
    dispatch(cartActions.decrementProductQuantity(id));
  };
  const productQuantityIncrementor = (id) => {
    dispatch(cartActions.incrementProductQuantity(id));
  };
  const deleteProduct = (id) => {
    dispatch(cartActions.deleteProductFromCart(id));
    dispatch(productActions.deleteProductInCart(id));

    if (Object.keys(productsObj).length === 1) {
      navigate('/shop');
    }
  };
  const buyButtonHandler = () => {
    dispatch(cartActions.deleteAllProductsFromCart());
    dispatch(productActions.deleteAllProductsInCart());
    navigate('/shop');
  };

  return (
      <div className={'cart'}>
        <div className={'container'}>
          <div className={'cart__inner'}>
            {
              Object.keys(productsQuantityObj).map(key => (
                  <div className={'cart__product-info'} key={key}>
                    <div className={'cart__product-img-wrapper'}>
                      <img className={'cart__product-img'} src={productsObj[key].img} alt={'product'}/>
                    </div>
                    <div className={'cart__product-content'}>
                      <h3 className={'cart__product-title'}>
                        {productsObj[key].title}
                      </h3>
                      <div className={'cart__product-inner'}>
                        <span className={'cart__product-color-text'}>
                          Color:
                        </span>
                        <div className={'cart__product-color'} style={{backgroundColor: productsObj[key].color}}></div>

                        <div className={'cart__product-size'}>
                          Size:
                          <span className={'cart__product-size-text'}>
                            {productsObj[key].size}
                          </span>
                        </div>
                      </div>
                      <div className={'cart__product-inner'}>
                        <div className={'cart__product-sku'}>
                          SKU:
                          <span className={'cart__product-sku-text'}>
                              {productsObj[key].sku}
                            </span>
                        </div>
                        <div className={'cart__product-price'}>
                          Price:
                          <span className={'cart__product-text'}>
                              ${productsObj[key].price}
                            </span>
                        </div>
                      </div>
                      <div className={'cart__product-inner'}>
                        <div className={'cart__product-buttons'}>
                          <button className={'cart__product-button'}
                                  onClick={() => productQuantityDecrementor(productsObj[key].id)}
                                  disabled={productsQuantityObj[key] === 1}
                          >
                            -
                          </button>
                          <span className={'cart__product-quantity'}>
                                {productsQuantityObj[key]}
                          </span>
                          <button className={'cart__product-button'}
                                  onClick={() => productQuantityIncrementor(productsObj[key].id)}
                          >
                            +
                          </button>
                        </div>
                        Total:
                        <span className={'cart__product-text'}>
                          ${productsQuantityObj[key] * productsObj[key].price}
                        </span>
                      </div>
                      <button className={'cart__product-del-btn'} onClick={() => deleteProduct(productsObj[key].id)}>
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
              <div className={'cart__bottom-content'}>
                Total price:
                <span className={'cart__bottom-text'}>${totalPrice}</span>
              </div>
              <button className={'cart__bottom-btn'} onClick={buyButtonHandler}>
                BUY
              </button>
            </div>
          }
        </div>
      </div>
  );
};

export {Cart}