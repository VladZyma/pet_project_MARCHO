import RangeSlider from 'react-range-slider-input';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

import 'react-range-slider-input/dist/style.css';
import './priceFilter.scss';

import {productActions} from "../../../redux";

const PriceFilter = ({query}) => {
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(15)
  const [maxPrice, setMaxPrice] = useState(30)

  const onInput = (values) => {
   setMinPrice(price => values[0]);
   setMaxPrice(price => values[1]);
  }

  const submitHandler = () => {
    dispatch(productActions.getProductsByParams({page: query.get('page'), value: `priceMin=${minPrice}&priceMax=${maxPrice}`}))
  };

  return (
      <div className={'price'}>
        <h3 className={'price__header'}>
          price filter
        </h3>
        <RangeSlider
          min={0}
          max={70}
          defaultValue={[15, 30]}
          onInput={onInput}
        />
        <div className={'price__inner'}>
          <div className={'price__info'}>
            <span>Price:</span>
            <span className={'price__info-number'}>${minPrice}</span>
            <span> - </span>
            <span className={'price__info-number'}>${maxPrice}</span>
          </div>
          <button className={'price__button'} onClick={submitHandler}>filter</button>
        </div>
      </div>
  );
};

export {PriceFilter}
