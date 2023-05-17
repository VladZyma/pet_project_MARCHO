import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {NavLink, useSearchParams, useNavigate} from "react-router-dom";

import './adminProduct.scss';

import {Pagination} from "../pagination/Pagination";
import {adminActions} from "../../redux";

const AdminProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrollHere = useRef();

  const [query, setQuery] = useSearchParams({page: '1'});

  const {products} = useSelector(state => state.adminReducer);

  useEffect(() => {
    dispatch(adminActions.getAllAdminProducts({page: query.get('page'), values: {limit: 12}}));
  }, [dispatch, query]);

  const deleteProduct = (productId) => {
    dispatch(adminActions.deleteProductById({productId}));
  };
  const updateProduct = (productId) => {
    dispatch(adminActions.setUpdatingProduct(productId));
    navigate('/admin/product/add');
  };

  return (
    <div className={'admin-product'} ref={scrollHere}>
      <div className={'container'}>

        <div className={'admin-product__top'}>
          <div className={'admin-product__top-total'}>
              <span className={'admin-product__top-total-text'}>
                Total products: {products.count}
              </span>
          </div>
          <NavLink className={'admin-product__top-btn'} to={'/admin/product/add'}>
            add new product
          </NavLink>
        </div>

        {products.products?.map(product =>
          <div className={'admin-product__inner'} key={product._id}>

            <div className={'admin-product__img-box'}>
              {product.photo
                ?
                <div className={'admin-product__img-wrapper'}>
                  <img className={'admin-product__img'} src={product.photo} alt={'product'}/>
                </div>
                :
                <label className={'admin-product__img-label'}>
                  <input
                    className={'admin-product__img-input'}
                    type={'file'}
                    onChange={(event) => {
                           const file = event.target.files[0];
                           const formData = new FormData();

                           formData.append('photo', file);

                           dispatch(adminActions.addNewProductPhotoById({productId: product._id, formData, file}));
                         }}
                  />
                  <span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        fill="#8d8d8d"
                        d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v242.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                      />
                    </svg>
                  </span>
                </label>
              }
              <button className={'admin-product__btn'} onClick={() => updateProduct(product._id)}>update</button>
              <button className={'admin-product__btn'} onClick={() => deleteProduct(product._id)}>delete</button>
            </div>

            <div className={'admin-product__content'}>
              <h4 className={'admin-product__title'}>
                {product.title}
              </h4>
              <div className={'admin-product__content-box'}>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    SKU:
                  </span>
                  {product.sku}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Color:
                  </span>
                  {product.color}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Quantity:
                  </span>
                  {product.quantity}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Rating:
                  </span>
                  {product.rating}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Votes:
                  </span>
                  {product.votes}
                </div>
              </div>
              <div className={'admin-product__content-box'}>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Categories:
                  </span>
                  {product.categories?.map(category => category + ',' + ' ')}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Tags:
                  </span>
                  {product.tags?.map(tag => tag + ',' + ' ')}
                </div>
              </div>
              <div className={'admin-product__content-box'}>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Sale:
                  </span>
                  {product.isSale?.toString()}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Price current:
                  </span>
                  {product.price?.current}
                </div>
                <div className={'admin-product__content-box-inner'}>
                  <span className={'admin-product__text'}>
                    Price Sale:
                  </span>
                  {product.price?.sale}
                </div>
              </div>
              <div className={'admin-product__content-box'}>
                 <span className={'admin-product__text'}>
                    Info:
                 </span>
                {product.info.map(item =>
                  `${item.size}: ${item.quantity}, `
                )}
              </div>
              <div className={'admin-product__content-box'}>
                <div className={'admin-product__content-box-inner'}>
                   <span className={'admin-product__text'}>
                    Review:
                  </span>
                  {product.review}
                </div>
              </div>
            </div>

          </div>

        )}
        {
          products.products?.length > 0
          &&
          <Pagination
            query={query}
            setQuery={setQuery}
            page={products.page}
            prevPage={products.prevPage}
            nextPage={products.nextPage}
            totalPages={products.totalPages}
            scrollHere={scrollHere}
          />
        }
      </div>
    </div>
  );
};

export {AdminProduct}
