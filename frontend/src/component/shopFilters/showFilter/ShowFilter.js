import {useState, useEffect} from 'react';
import Select from 'react-select';

import './showFilter.scss';

const ShowFilter = ({options}) => {
  const [showValue, setShowValue] = useState(null);

  useEffect(() => {
    if (showValue) {
      console.log(showValue);
    }
  }, [showValue]);

  return (
      <div className={'show'}>
        <Select
            defaultMenuIsOpen={options[0]}
            placeholder={'Show 4'}
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
