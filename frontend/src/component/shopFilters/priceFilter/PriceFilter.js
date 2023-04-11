import RangeSlider from 'react-range-slider-input';
import {useState} from 'react';

import 'react-range-slider-input/dist/style.css';
import './priceFilter.scss';

const PriceFilter = ({query, setQuery}) => {

  const [minPrice, setMinPrice] = useState(15);
  const [maxPrice, setMaxPrice] = useState(75);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const onInput = (values) => {
   setMinPrice(price => values[0]);
   setMaxPrice(price => values[1]);
  }

  const submitHandler = () => {
    setQuery({...search, page: '1', priceMin: minPrice, priceMax: maxPrice});
  };

  return (
      <div className={'price'}>
        <h3 className={'price__header'}>
          price filter
        </h3>
        <RangeSlider
          min={0}
          max={100}
          defaultValue={[15, 75]}
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
