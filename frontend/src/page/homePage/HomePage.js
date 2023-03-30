import {HomeSlider, CategoriesInfo, Video, ProductList, Promo, Partners} from "../../component";

const HomePage = () => {

  return (
      <div className={'home-page'}>
        <HomeSlider/>
        <CategoriesInfo/>
        <Video/>
        <ProductList/>
        <Promo/>
        <Partners/>
      </div>
  );
};

export {HomePage}