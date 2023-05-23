import {useState, useEffect} from "react";

import './tagsFilter.scss';

const TagsFilter = ({query, setQuery}) => {

  const [tags, setTags] = useState([]);
  const [checkedJumper, setCheckedJumper] = useState(false);
  const [checkedCoat, setCheckedCoat] = useState(false);
  const [checkedHoodie, setCheckedHoodie] = useState(false);
  const [checkedShirt, setCheckedShirt] = useState(false);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const tagsArr = query.get('tags')?.split(',');

  useEffect(() => {
    if (tagsArr) {
      tagsArr.forEach(tag => {
        switch (tag) {
          case 'jumper':
            setCheckedJumper(!checkedJumper);
            break;
            case 'coat':
            setCheckedCoat(!checkedCoat);
            break;
            case 'hoodie':
            setCheckedHoodie(!checkedHoodie);
            break;
            case 'shirt':
            setCheckedShirt(!checkedShirt);
            break;
        }
      });
      setTags(tagsArr);
    }
  }, []);

  useEffect(() => {
    const tagsString = tags.join(',');
    setQuery({...search, page: '1', tags: tagsString});
  }, [tags]);

  const onChangeHandler = (event) => {
    const target = event.target;

    switch (target.value) {
      case 'jumper':
        setCheckedJumper(!checkedJumper);
        break;
      case 'coat':
        setCheckedCoat(!checkedCoat);
        break;
      case 'hoodie':
        setCheckedHoodie(!checkedHoodie);
        break;
      case 'shirt':
        setCheckedShirt(!checkedShirt);
        break;
    }

    if (target.checked) {
      setTags(prevTags => [...prevTags, target.value]);
    } else {
      const tempTags = [...tags];
      const tagIndex = tags.findIndex(tag => tag === target.value);
      tempTags.splice(tagIndex, 1);

      setTags(tempTags);
    }
  };

  return (
      <div className={'tags'}>
        <h3 className={'tags__header'}>
          Popular Tags
        </h3>
        <form className={'tags__form'}>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'}
                   type={'checkbox'}
                   value={'jumper'}
                   checked={checkedJumper}
                   onChange={onChangeHandler}
            />
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Jumper</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'}
                   type={'checkbox'}
                   value={'coat'}
                   checked={checkedCoat}
                   onChange={onChangeHandler}
            />
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Coat</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'}
                   type={'checkbox'}
                   value={'hoodie'}
                   checked={checkedHoodie}
                   onChange={onChangeHandler}
            />
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Hoodie</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'}
                   type={'checkbox'}
                   value={'shirt'}
                   checked={checkedShirt}
                   onChange={onChangeHandler}
            />
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Shirt</span>
            </div>
          </label>
        </form>
      </div>
  );
};

export {TagsFilter}
