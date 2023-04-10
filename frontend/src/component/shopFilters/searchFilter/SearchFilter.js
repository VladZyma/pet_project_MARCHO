import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import './search.scss';

import {productActions} from "../../../redux";

const SearchFilter = ({query}) => {
  const dispatch = useDispatch();

  const {register, handleSubmit, reset} = useForm();

  const submitHandler = (title) => {
    dispatch(productActions.getProductsByParams({page: query.get('page'), value: `title=${title.title}`}));
    reset();
  };

  return (
      <div className={'search'}>
        <h3 className={'search__header'}>
          search
        </h3>
        <form className={'search__form'} onSubmit={handleSubmit(submitHandler)}>
          <input
              className={'search__form-input'}
              type={'text'}
              placeholder={'Search your keyword...'}
              {...register('title')}
          />
          <button className={'search__form-button'}></button>
        </form>
      </div>
  );
};

export {SearchFilter}