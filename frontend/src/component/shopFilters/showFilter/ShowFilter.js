import {useState, useEffect} from 'react';
import Select from 'react-select';

import './showFilter.scss';

const ShowFilter = ({query, setQuery, options}) => {
  const [showValue, setShowValue] = useState(null);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  useEffect(() => {
    if (showValue) {
      setQuery({...search, page: '1', limit: showValue.value});
    }
  }, [showValue]);

  return (
      <div className={'show'}>
        <Select
            placeholder={'Show 6'}
            options={options}
            onChange={setShowValue}
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

export {ShowFilter}
