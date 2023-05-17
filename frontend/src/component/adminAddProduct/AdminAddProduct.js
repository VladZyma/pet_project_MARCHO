import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import './adminAdd.scss';

import {adminActions} from "../../redux";

const AdminAddProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {register, handleSubmit, reset, setValue} = useForm();

  const {updatingProduct} = useSelector(state => state.adminReducer);

  useEffect(() => {
    if (updatingProduct) {
      setValue('title', updatingProduct.title);
      setValue('color', updatingProduct.color);

      for (let info of updatingProduct.info) {
        setValue(info.size, info.quantity);
      }

      setValue('sku', updatingProduct.sku);
      setValue('rating', updatingProduct.rating);
      setValue('votes', updatingProduct.votes);
      setValue('quantity', updatingProduct.quantity);
      setValue('current', updatingProduct.price.current);
      setValue('sale', updatingProduct.price.sale);
      setValue('categories', updatingProduct.categories.join());
      setValue('tags', updatingProduct.tags.join());
      setValue('review', updatingProduct.review);
    }
  }, [setValue]);

  const onSubmit = (product) => {
    let info = [];
    let photo = '';
    let isSale = false;
    let price = {};
    const categories = product.categories.split(',');
    const tags = product.tags.split(',');

    for (let key in product) {
      if (key === 'XS' || key === 'S' || key === 'M' || key === 'L' || key === 'XL') {
        if (product[key]) {
          info.push({size: key, quantity: product[key]});
        }
        delete product[key];
      }
      if (key === 'current') {
        price = {...price, current: product[key]}
        delete product[key];
      }
      if (key === 'sale') {
        if (product[key]) {
          price = {...price, sale: product[key]};
          isSale = true;
          delete product[key];
        } else {
          price = {...price, sale: 0};
          delete product[key];
        }
      }
    }

    delete product.categories;
    delete product.tags;

    if (updatingProduct) {
      console.log('updatingProduct', updatingProduct);
      console.log('updatingProduct.photo', updatingProduct.photo);
      product = {...product, info, photo: updatingProduct.photo, isSale, price, categories, tags};
      dispatch(adminActions.updateProductById({productId: updatingProduct._id, productInfo: product}));
      dispatch(adminActions.deleteUpdatingProduct());
      navigate('/admin/products');
    } else {
      product = {...product, info, photo, isSale, price, categories, tags};
      dispatch(adminActions.addNewProduct({productInfo: product}));
      reset();
    }

  };

  return (
    <div className={'admin-add'}>
      <div className={'container'}>
        <div className={'admin-add__inner'}>
          <form className={'admin-add__form'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'admin-add__form-inner'}>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  Title:
                </span>
                <input
                  className={'admin-add__form-input'}
                  type={'text'}
                  required={true}
                  {...register('title')}
                />
              </label>
              <label className={'admin-add__form-label admin-add__form-label--margin'}>
                <span className={'admin-add__form-text'}>
                  Color:
                </span>
                <input
                  className={'admin-add__form-input'}
                  type={'text'}
                  required={true}
                  placeholder={'blue, red, green, orange, black, purple'}
                  {...register('color')}
                />
              </label>
            </div>
            <div className={'admin-add__form-info-box'}>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  XS:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'tex'}
                  {...register('XS', {valueAsNumber: true})}/>
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  S:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'tex'}
                  {...register('S', {valueAsNumber: true})}/>
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  M:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'tex'}
                  {...register('M', {valueAsNumber: true})}/>
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  L:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'tex'}
                  {...register('L', {valueAsNumber: true})}/>
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  XL:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'tex'}
                  {...register('XL', {valueAsNumber: true})}/>
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  SKU:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--middle'}
                  type={'text'}
                  placeholder={'11FSE7739'}
                  required={true}
                  {...register('sku')}
                />
              </label>
            </div>

            <div className={'admin-add__form-info-box admin-add__form-info-box--padding'}>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  Rating:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'text'}
                  placeholder={'max 5'}
                  required={true}
                  {...register('rating', {valueAsNumber: true})}
                />
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  Votes:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'text'}
                  placeholder={'56'}
                  required={true}
                  {...register('votes', {valueAsNumber: true})}
                />
              </label>
              <label className={'admin-add__form-label'}>
                <span className={'admin-add__form-text'}>
                  Quantity:
                </span>
                <input
                  className={'admin-add__form-input admin-add__form-input--small'}
                  type={'text'}
                  placeholder={'25'}
                  required={true}
                  {...register('quantity', {valueAsNumber: true})}
                />
              </label>
              <div className={'admin-add__form-price-wrapper'}>
                <label className={'admin-add__form-label'}>
                  <span className={'admin-add__form-text'}>
                    Price:
                  </span>
                  <input
                    className={'admin-add__form-input admin-add__form-input--small'}
                    type={'text'}
                    placeholder={'25'}
                    required={true}
                    {...register('current', {valueAsNumber: true})}
                  />
                </label>
                <label className={'admin-add__form-label'}>
                  <span className={'admin-add__form-text'}>
                    Sale price:
                  </span>
                  <input
                    className={'admin-add__form-input admin-add__form-input--small'}
                    type={'text'}
                    placeholder={'25'}
                    {...register('sale', {valueAsNumber: true})}
                  />
                </label>
              </div>
                <label className={'admin-add__form-label'}>
                  <span className={'admin-add__form-text'}>
                    Categories:
                  </span>
                  <input
                    className={'admin-add__form-input admin-add__form-input--middle'}
                    type={'text'}
                    required={true}
                    placeholder={'woman, sale products'}
                    {...register('categories')}
                  />
                </label>
                <label className={'admin-add__form-label'}>
                  <span className={'admin-add__form-text'}>
                    Tags:
                  </span>
                  <input
                    className={'admin-add__form-input admin-add__form-input--middle'}
                    type={'text'}
                    required={true}
                    placeholder={'jumper, coat, hoodie, shirt'}
                    {...register('tags')}
                  />
                </label>
            </div>

            <div className={'admin-add__form-textarea-wrapper'}>
              <span className={'admin-add__form-text'}>
                Review:
              </span>
              <textarea
                className={'admin-add__form-textarea'}
                maxLength={200}
                required={true}
                placeholder={'max length 200'}
                {...register('review')}
              >

              </textarea>
            </div>
            <button className={'admin-add__form-btn'}>save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export {AdminAddProduct}
