import {useDispatch} from "react-redux";

import {productActions, cartActions} from "../../redux";
import {createProductObj} from "../../helper";

import './sizePopUp.scss';

const ProductSizePopUp = (props) => {

  const {
    info,
    product,
    isGrid,
    setShowSizePopUp,
    showSizePopUp,
    showSizePopUpGrid,
    setShowSizePopUpGrid
  } = props;

  const dispatch = useDispatch();

  let selectedSize = '';

  const selectSize = (event) => {
    selectedSize = event.target.value;

    if (showSizePopUp) {
      setShowSizePopUp(false);
    }
    if (showSizePopUpGrid) {
      setShowSizePopUpGrid(false);
    }

    addToCartHandler();
  };

  const productObj = createProductObj(product, selectedSize);

  const addToCartHandler = () => {
    dispatch(productActions.addProductInCart(productObj));
    dispatch(cartActions.addProductToCart(product._id));
  };

  return (
      <>
        {
          !isGrid
              ?
              <div className={showSizePopUp ? 'size-pop-up size-pop-up--show' : 'size-pop-up'}>
                <form className={'size-pop-up__form'}>
                  {info?.map((info, i) => (
                      <label className={'size-pop-up__form-label'} key={i + 1}>
                        <input className={'size-pop-up__form-input'}
                               type={'radio'}
                               value={info.size}
                               name={'size'}
                               onChange={selectSize}
                        />
                        <span className={'size-pop-up__form-checkbox'}>
                      {info.size}
                    </span>
                      </label>
                  ))}
                </form>
              </div>
              :
              <div className={showSizePopUpGrid ? 'size-pop-up-grid size-pop-up-grid--show' : 'size-pop-up-grid'}>
                <form className={'size-pop-up-grid__form'}>
                  {info?.map((info, i) => (
                      <label className={'size-pop-up-grid__form-label'} key={i + 1}>
                        <input className={'size-pop-up-grid__form-input'}
                               type={'radio'}
                               value={info.size}
                               name={'size'}
                               onChange={selectSize}
                        />
                        <span className={'size-pop-up-grid__form-checkbox'}>
                          {info.size}
                        </span>
                      </label>
                  ))}
                </form>
              </div>
        }
      </>
  );
};

export {ProductSizePopUp}
