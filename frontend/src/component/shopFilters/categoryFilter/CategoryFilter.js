
import './categoryFilter.scss';

const CategoryFilter = () => {

  return (
      <div className={'category'}>
        <h3 className={'category__header'}>
          category
        </h3>
        <form className={'category__form'}>
          <label className={'category__form-label'}>
            <input className={'category__form-input'} type={'checkbox'} value={'woman'}/>
            <div className={'category__form-box'}>
              <span className={'category__form-text'}>Woman</span>
            </div>
          </label>
          <label className={'category__form-label'}>
            <input className={'category__form-input'} type={'checkbox'} value={'sale'}/>
            <div className={'category__form-box'}>
              <span className={'category__form-text'}>Sale Products</span>
            </div>
          </label>
        </form>
      </div>
  );
};

export {CategoryFilter}
