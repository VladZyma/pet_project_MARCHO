import {useState, useEffect} from 'react';
import Select from 'react-select';

import './sortByFilter.scss';

const SortByFilter = ({query, setQuery, options}) => {

  const [selectedOption, setSelectedOption] = useState(null);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  useEffect(() => {
    if (selectedOption) {
      setQuery({...search, page: '1', sort: selectedOption.value});
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
