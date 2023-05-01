import {useEffect, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import './shop.scss';

import {ProductCard} from "../productCard/ProductCard";
import {Pagination} from "../pagination/Pagination";
import {
  SearchFilter,
  PriceFilter,
  ColorFilter,
  SizeFilter,
  CategoryFilter,
  TagsFilter,
  SortByFilter,
  ShowFilter,
} from '../shopFilters';
import {productActions, shopViewActions} from "../../redux";

const Shop = () => {

  const dispatch = useDispatch();

  const scrollHere = useRef();

  const {isGrid} = useSelector(state => state.shopViewReducer);

  const {
    products: {
      products,
      prevPage,
      nextPage,
      totalPages,
      loading,
    }
  } = useSelector(state => state.productReducer);

  const [query, setQuery] = useSearchParams({page: '1'});

  const search = useMemo(() => {
    let searchTemp = {};

    for (let entry of query.entries()) {
      searchTemp[entry[0]] = entry[1];
    }

    return searchTemp;
  }, [query]);

  useEffect(() => {
    dispatch(productActions.getProductsByParams({page: query.get('page'), values: search}));
  }, [dispatch, query, search]);

  const setListProductsView = () => {
    dispatch(shopViewActions.setIsGrid(true));
  }
  const setGridProductsView = () => {
    dispatch(shopViewActions.setIsGrid(false));
  }


  return (
      <section className={'shop'} ref={scrollHere}>
        <div className={'container'}>
          <div className={'shop__inner'}>
            <div className={'shop__filters'}>
              <div className={'shop__filters-item'}>
                <SearchFilter query={query} setQuery={setQuery}/>
              </div>
              <div className={'shop__filters-item'}>
                <PriceFilter query={query} setQuery={setQuery}/>
              </div>
              <div className={'shop__filters-item'}>
                <ColorFilter query={query} setQuery={setQuery}/>
              </div>
              <div className={'shop__filters-item'}>
                <SizeFilter query={query} setQuery={setQuery}/>
              </div>
              <div className={'shop__filters-item'}>
                <CategoryFilter query={query} setQuery={setQuery}/>
              </div>
              <div className={'shop__filters-item'}>
                <TagsFilter query={query} setQuery={setQuery}/>
              </div>
            </div>
            <div className={'shop__items'}>
              <div className={'shop__items-filter'}>
                <div className={'shop__items-filter-buttons'}>
                  <span className={'shop__items-filter-text'}>View</span>
                  <button className={isGrid? 'shop__items-filter-button' : 'shop__items-filter-button shop__items-filter-button--active'}
                          onClick={setGridProductsView}>
                    <svg width={15} height={15}>
                      <path fill="#8D8D8D" fillRule="evenodd"
                            d="M0 3.75h3.75V0H0v3.75ZM5.625 14.1h3.75v-2.85h-3.75v2.85ZM0 14.1h3.75v-2.85H0v2.85Zm0-4.725h3.75v-3.75H0v3.75Zm5.625 0h3.75v-3.75h-3.75v3.75ZM11.25 0v3.75h2.85V0h-2.85ZM5.625 3.75h3.75V0h-3.75v3.75Zm5.625 5.625h2.85v-3.75h-2.85v3.75Zm0 4.725h2.85v-2.85h-2.85v2.85Z"/>
                    </svg>
                  </button>
                  <button className={!isGrid? 'shop__items-filter-button' : 'shop__items-filter-button shop__items-filter-button--active'}
                          onClick={setListProductsView}>
                    <svg width={20} height={15}>
                      <path fill="#8D8D8D" fillRule="evenodd"
                            d="M5.835 14.998v-4.171h14.159v4.171H5.835Zm0-9.585h14.159v4.172H5.835V5.413Zm0-5.413h14.159v4.172H5.835V0ZM.007 10.827h4.422v4.171H.007v-4.171Zm0-5.414h4.422v4.172H.007V5.413ZM.007 0h4.422v4.172H.007V0Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className={'shop__items-filter-selects'}>
                  <SortByFilter query={query} setQuery={setQuery} options={[
                    {value: 'default', label: 'Sort By Default'},
                    {value: 'ratingDown', label: 'Sort By Rating A-z'},
                    {value: 'ratingUp', label: 'Sort By Rating z-A'},
                    {value: 'priceDown', label: 'Sort By Price A-z'},
                    {value: 'priceUp', label: 'Sort By Price z-A'},
                  ]}/>
                  <ShowFilter query={query} setQuery={setQuery} options={[
                    {value: 4, label: 'Show 4'},
                    {value: 6, label: 'Show 6'},
                    {value: 8, label: 'Show 8'},
                    {value: 10, label: 'Show 10'},
                  ]}/>
                </div>
              </div>
              <div className={!isGrid? 'shop__items-inner--grid' : 'shop__items-inner'}>
                {loading && <h1>Loading................</h1>}
                {products?.map(product => <ProductCard product={product} isGrid={isGrid} key={product._id}/>)}
              </div>
              { products?.length > 0
                  &&
                <Pagination
                    query={query}
                    setQuery={setQuery}
                    page={query.get('page')}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    totalPages={totalPages}
                    scrollHere={scrollHere}
                />
              }
            </div>
          </div>
        </div>
      </section>
  );
};

export {Shop}