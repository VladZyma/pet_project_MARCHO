import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import './colorFilter.scss';

import {productActions} from "../../../redux";

const ColorFilter = ({query}) => {
  const dispatch = useDispatch();

  const [colors, setColors] = useState([]);

  const submitHandler = (event) => {
    const target = event.target;

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
    if (colors.length > 0) {
      const colorsString = colors.join(',');
      dispatch(productActions.getProductsByParams({page: query.get('page'), value: `color=${colorsString}`}));
    }
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
              <input className={'color__form-input'} type={'checkbox'} value={'blue'} onClick={submitHandler}/>
              <span className={'color__form-checkbox color__form-checkbox--blue'}></span>
            </div>
          </label>
          <label className={'color__form-label'}>
            <span className={'color__form-text'}>Red</span>
            <div className={'color__form-box'}>
              <input className={'color__form-input'} type={'checkbox'} value={'red'} onClick={submitHandler}></input>
              <span className={'color__form-checkbox color__form-checkbox--red'}></span>
            </div>
          </label>
          <label className={'color__form-label'}>
            <span className={'color__form-text'}>Green</span>
            <div className={'color__form-box'}>
              <input className={'color__form-input'} type={'checkbox'} value={'green'} onClick={submitHandler}></input>
              <span className={'color__form-checkbox color__form-checkbox--green'}></span>
            </div>
          </label>
          <label className={'color__form-label'}>
            <span className={'color__form-text'}>Orange</span>
            <div className={'color__form-box'}>
              <input className={'color__form-input'} type={'checkbox'} value={'orange'} onClick={submitHandler}></input>
              <span className={'color__form-checkbox color__form-checkbox--orange'}></span>
            </div>
          </label>
          <label className={'color__form-label'}>
            <span className={'color__form-text'}>Black</span>
            <div className={'color__form-box'}>
              <input className={'color__form-input'} type={'checkbox'} value={'black'} onClick={submitHandler}></input>
              <span className={'color__form-checkbox color__form-checkbox--black'}></span>
            </div>
          </label>
          <label className={'color__form-label'}>
            <span className={'color__form-text'}>Purple</span>
            <div className={'color__form-box'}>
              <input className={'color__form-input'} type={'checkbox'} value={'purple'} onClick={submitHandler}></input>
              <span className={'color__form-checkbox color__form-checkbox--purple'}></span>
            </div>
          </label>
        </form>
      </div>
  );
};

export {ColorFilter}
