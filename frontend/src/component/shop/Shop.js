import {useEffect} from 'react';
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
} from '../shopFilters';
import {productActions} from "../../redux";

const Shop = () => {
  const dispatch = useDispatch();

  const {
    products: {
      products,
      prevPage,
      nextPage,
      totalPages,
      loading,
      error
    }
  } = useSelector(state => state.productReducer);

  const [query, setQuery] = useSearchParams({page: '1', limit: '2', title: '', priceMin: '15', priceMax: '75', color: '', size: '', category: '', tags: ''});

  useEffect(() => {
    dispatch(productActions.getProductsByParams({
      page: query.get('page'),
      limit: +query.get('limit'),
      title: query.get('title'),
      priceMin: query.get('priceMin'),
      priceMax: query.get('priceMax'),
      color: query.get('color'),
      size:query.get('size'),
      category: query.get('category'),
      tags: query.get('tags'),
    }));
  }, [dispatch, query]);


  return (
      <section className={'shop'}>
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
              <div className={'shop__items-top-filter'}></div>
              <div className={'shop__items-inner'}>
                {loading && <h1>Loading................</h1>}
                {products?.map(product => <ProductCard product={product} key={product._id}/>)}
              </div>
              <Pagination query={query} setQuery={setQuery} page={query.get('page')} prevPage={prevPage} nextPage={nextPage}
                          totalPages={totalPages}/>
            </div>
          </div>
        </div>
      </section>
  );
};

export {Shop}