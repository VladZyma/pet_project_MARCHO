import {useState, useEffect} from 'react';

import './colorFilter.scss';

const ColorFilter = ({query, setQuery}) => {

  const [colors, setColors] = useState([]);
  const [checkedBlue, setCheckedBlue] = useState(false);
  const [checkedRed, setCheckedRed] = useState(false);
  const [checkedGreen, setCheckedGreen] = useState(false);
  const [checkedOrange, setCheckedOrange] = useState(false);
  const [checkedBlack, setCheckedBlack] = useState(false);
  const [checkedPurple, setCheckedPurple] = useState(false);

  const colorsArr = query.get('color')?.split(',');
  useEffect(() => {
    console.log('MyUseEffect');


    console.log('COLORS', colorsArr);

    if (colorsArr) {
      colorsArr.forEach(color => {
        switch (color) {
          case 'blue':
            setCheckedBlue(!checkedBlue);
            break;
          case 'red':
            setCheckedRed(!checkedRed);
            break;
          case 'green':
            setCheckedGreen(!checkedGreen);
            break;
          case 'orange':
            setCheckedOrange(!checkedOrange);
            break;
          case 'black':
            setCheckedBlack(!checkedBlack);
            break;
          case 'purple':
            setCheckedPurple(!checkedPurple);
            break;
        }
      });
      setColors(colorsArr);
    }
  }, []);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const submitHandler = (event) => {
    const target = event.target;

    switch (target.value) {
      case 'blue':
        setCheckedBlue(!checkedBlue);
        break;
      case 'red':
        setCheckedRed(!checkedRed);
        break;
      case 'green':
        setCheckedGreen(!checkedGreen);
        break;
      case 'orange':
        setCheckedOrange(!checkedOrange);
        break;
      case 'black':
        setCheckedBlack(!checkedBlack);
        break;
      case 'purple':
        setCheckedPurple(!checkedPurple);
        break;
    }

    if (target.checked) {
      setColors(colors => [...colors, target.value]);
    } else {
      const colorIndex = colors.findIndex(color => color === target.value);
      const tempColorsArr = [...colors];
      tempColorsArr.splice(colorIndex, 1);

      setColors(tempColorsArr);
    }

  };

  useEffect(() => {
    console.log('useEffectColors');
    const colorsString = colors.join(',');
    setQuery({...search, page: '1', color: colorsString});
  }, [colors])

  return (
    <div className={'color'}>
      <h3 className={'color__header'}>
        color filter
      </h3>
      <form className={'color__form'}>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Blue</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedBlue} value={'blue'}
                   onChange={submitHandler}/>
            <span className={'color__form-checkbox color__form-checkbox--blue'}></span>
          </div>
        </label>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Red</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedRed} value={'red'}
                   onChange={submitHandler}></input>
            <span className={'color__form-checkbox color__form-checkbox--red'}></span>
          </div>
        </label>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Green</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedGreen} value={'green'}
                   onChange={submitHandler}></input>
            <span className={'color__form-checkbox color__form-checkbox--green'}></span>
          </div>
        </label>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Orange</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedOrange} value={'orange'}
                   onChange={submitHandler}></input>
            <span className={'color__form-checkbox color__form-checkbox--orange'}></span>
          </div>
        </label>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Black</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedBlack} value={'black'}
                   onChange={submitHandler}></input>
            <span className={'color__form-checkbox color__form-checkbox--black'}></span>
          </div>
        </label>
        <label className={'color__form-label'}>
          <span className={'color__form-text'}>Purple</span>
          <div className={'color__form-box'}>
            <input className={'color__form-input'} type={'checkbox'} checked={checkedPurple} value={'purple'}
                   onChange={submitHandler}></input>
            <span className={'color__form-checkbox color__form-checkbox--purple'}></span>
          </div>
        </label>
      </form>
    </div>
  );
};

export {ColorFilter}
