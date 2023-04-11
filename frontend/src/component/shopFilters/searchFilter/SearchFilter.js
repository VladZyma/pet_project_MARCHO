import {useForm} from 'react-hook-form';

import './search.scss';

const SearchFilter = ({query, setQuery}) => {
  const {register, handleSubmit, reset} = useForm();

  const search = {}
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1]
  }

  const submitHandler = (title) => {
    setQuery(prevQuery => ({...search, page: '1', title: `${title.title}`}));
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