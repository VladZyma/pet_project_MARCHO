import './cart.scss';

const Cart = (props) => {
  const {productsObj, productsQuantityObj, isProductsInCart} = props;

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
                          <button className={'cart__product-button'}>-</button>
                          <span className={'cart__product-quantity'}>
                                {productsQuantityObj[key]}
                              </span>
                          <button className={'cart__product-button'}>+</button>
                        </div>
                        Total:
                        <span className={'cart__product-text'}>
                          ${productsQuantityObj[key] * productsObj[key].price}
                        </span>
                      </div>
                      <button className={'cart__product-del-btn'}>
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
                <span className={'cart__bottom-text'}>$</span>
              </div>
              <button className={'cart__bottom-btn'}>BUY</button>
            </div>
          }
        </div>
      </div>
  );
};

export {Cart}