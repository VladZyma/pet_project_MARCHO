import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import './orderForm.scss';

import {orderActions} from "../../redux";

const OrderForm = (props) => {

  const dispatch = useDispatch();

  const {setShowOrderForm, setIsSuccessInfo, user, cart, productsQuantityObj, sizesObj} = props;

  const {register, handleSubmit, reset} = useForm();


  const onSubmit = (info) => {

    const productsInfo = cart.map(product => {

      let price = product.price.current;

      if (product.isSale) {
        price = product.price.sale;
      }

      return {
        title: product.title,
        color: product.color,
        sku: product.sku,
        price,
        quantity: productsQuantityObj[product._id],
        size: sizesObj[product._id].size,
        totalCost: productsQuantityObj[product._id] * price,
      }
    });

    const data = {...info, productsInfo, status: 'processing'};

    dispatch(orderActions.addOrder({data}));
    reset();
    setShowOrderForm(false);
    setIsSuccessInfo(true);
  };

  return (
    <form className={'order-form'} onSubmit={handleSubmit(onSubmit)}>
      <input className={'order-form__input'}
             type={'text'}
             placeholder={'name'}
             required={true}
             {...register('name')}
      />
      <input className={'order-form__input'}
             type={'text'}
             placeholder={'email'}
             defaultValue={user.email}
             required={true}
             {...register('email')}
      />
      <input className={'order-form__input'}
             type={'text'}
             placeholder={'country'}
             required={true}
             {...register('country')}
      />
      <div className={'order-form__inner'}>
        <input className={'order-form__input'}
               type={'text'}
               placeholder={'city'}
               required={true}
               {...register('city')}
        />
        <input className={'order-form__input'}
               type={'text'}
               placeholder={'postal code'}
               required={true}
               {...register('postalCode')}
        />
      </div>
      <input className={'order-form__input'}
             type={'text'}
             placeholder={'street address'}
             required={true}
             {...register('address')}
      />
      <button className={'order-form__btn'} type={'submit'}>order</button>
    </form>
  );
};

export {OrderForm}