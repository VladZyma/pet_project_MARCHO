import {useState, useEffect} from "react";

import './categoryFilter.scss';

const CategoryFilter = ({query, setQuery}) => {
  const [selectedOption, setSelectedOption] = useState('all');

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const onValueChange = (event) => {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    if (selectedOption !== 'all') {
      setQuery({...search, page: '1', category: selectedOption});
    } else {
      setQuery({...search, page: '1', category: ''});
    }
  }, [selectedOption]);

  return (
      <div className={'category'}>
        <h3 className={'category__header'}>
          category
        </h3>
        <form className={'category__form'}>
          <label className={'category__form-label'}>
            <input className={'category__form-input'}
                   type={'radio'} value={'all'}
                   checked={selectedOption === 'all'}
                   onChange={onValueChange}
            />
            <div className={'category__form-box'}>
              <span className={'category__form-text'}>All Products</span>
            </div>
          </label>
          <label className={'category__form-label'}>
            <input className={'category__form-input'}
                   type={'radio'} value={'woman'}
                   checked={selectedOption === 'woman'}
                   onChange={onValueChange}
            />
            <div className={'category__form-box'}>
              <span className={'category__form-text'}>Woman</span>
            </div>
          </label>
          <label className={'category__form-label'}>
            <input className={'category__form-input'}
                   type={'radio'} value={'sale'}
                   checked={selectedOption === 'sale'}
                   onChange={onValueChange}
            />
            <div className={'category__form-box'}>
              <span className={'category__form-text'}>Sale Products</span>
            </div>
          </label>
        </form>
      </div>
  );
};

export {CategoryFilter}
