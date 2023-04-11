import './tagsFilter.scss';

const TagsFilter = ({query}) => {

  return (
      <div className={'tags'}>
        <h3 className={'tags__header'}>
          Popular Tags
        </h3>
        <form className={'tags__form'}>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'} type={'checkbox'} value={'jumper'}/>
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Jumper</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'} type={'checkbox'} value={'coat'}/>
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Coat</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'} type={'checkbox'} value={'hoodie'}/>
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Hoodie</span>
            </div>
          </label>
          <label className={'tags__form-label'}>
            <input className={'tags__form-input'} type={'checkbox'} value={'shirt'}/>
            <div className={'tags__form-box'}>
              <span className={'tags__form-text'}>Shirt</span>
            </div>
          </label>
        </form>
      </div>
  );
};

export {TagsFilter}
