import {HomeSlider, CategoriesInfo, Video, ProductList, Promo} from "../../component";

const HomePage = () => {

  return (
      <div className={'home-page'}>
        <HomeSlider/>
        <CategoriesInfo/>
        <Video/>
        <ProductList/>
        <Promo/>
      </div>
  );
};

export {HomePage}