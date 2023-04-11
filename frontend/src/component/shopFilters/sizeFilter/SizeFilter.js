import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

import './sizeFilter.scss';

import {productActions} from "../../../redux";

const SizeFilter = ({query}) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('all');

  const onValueChange = (event) => {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    if (selectedOption !== 'all') {
      dispatch(productActions.getProductsByParams({page: query.get('page'), value: `size=${selectedOption}`}));
    }
  }, [selectedOption])

  return (
      <div className={'size'}>
        <h3 className={'size__header'}>
          size filter
        </h3>
        <form className={'size__form'}>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'all'} checked={selectedOption === 'all'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>All</span>
          </label>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'XS'} checked={selectedOption === 'XS'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>X-small</span>
          </label>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'S'}  checked={selectedOption === 'S'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>Small</span>
          </label>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'M'}  checked={selectedOption === 'M'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>Medium</span>
          </label>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'L'}  checked={selectedOption === 'L'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>Large</span>
          </label>
          <label className={'size__form-label'}>
            <input className={'size__form-input'} type={'radio'} value={'XL'}  checked={selectedOption === 'XL'} onChange={onValueChange}></input>
            <span className={'size__form-radio'}></span>
            <span className={'size__form-text'}>X-large</span>
          </label>
        </form>
      </div>
  );
};

export {SizeFilter}
