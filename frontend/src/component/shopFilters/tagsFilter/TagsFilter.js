import {useState, useEffect} from "react";

import './tagsFilter.scss';

const TagsFilter = ({query, setQuery}) => {

  const [tags, setTags] = useState([]);

  const search = {};
  for (let entry of query.entries()) {
    search[entry[0]] = entry[1];
  }

  const onChangeHandler = (event) => {
    const target = event.target;

    if (target.checked) {
      setTags(prevTags => [...prevTags, target.value]);
    } else {
      const tempTags = [...tags];
      const tagIndex = tags.findIndex(tag => tag === target.value);
      tempTags.splice(tagIndex, 1);

      setTags(tempTags);
    }
  };

  useEffect(() => {
    const tagsString = tags.join(',');
    setQuery({...search, page: '1', tags: tagsString});
  }, [tags]);

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
