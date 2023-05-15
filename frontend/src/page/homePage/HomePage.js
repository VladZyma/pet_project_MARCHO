import {useEffect} from "react";

import {HomeSlider, CategoriesInfo, Video, ProductList, Promo, Partners, BlogList} from "../../component";

const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={'home-page'}>
      <HomeSlider/>
      <CategoriesInfo/>
      <Video/>
      <ProductList/>
      <Promo/>
      <Partners/>
      <BlogList/>
    </div>
  );
};

export {HomePage}