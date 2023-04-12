import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Select from 'react-select';

import './sortByFilter.scss';

import {productActions} from "../../../redux";

const SortByFilter = ({options}) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {

    }
  }, [selectedOption]);

  return (
      <div className={'sort'}>
        <Select
            placeholder={'Sort By Default'}
            options={options}
            onChange={setSelectedOption}
            theme={(theme) => ({
              ...theme,
              colors: {
                primary25: '#fe3e57',
                primary: '#fe3e57',
                neutral0: '#fff'
              },
            })}
        />
      </div>
  );
};

export {SortByFilter}
