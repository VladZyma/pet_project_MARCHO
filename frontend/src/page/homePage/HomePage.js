import {HomeSlider, CategoriesInfo, Video, ProductList, Promo, Partners, BlogList} from "../../component";

const HomePage = () => {

  return (
      <div className={'home-page'}>
        <HomeSlider/>
        <CategoriesInfo/>
        <Video/>
        <ProductList/>
        <Promo/>
        <Partners/>
        {/*<BlogList/>*/}
      </div>
  );
};

export {HomePage}