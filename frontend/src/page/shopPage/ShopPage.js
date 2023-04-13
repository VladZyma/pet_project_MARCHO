import './shopPage.scss';

import {Shop, Top} from "../../component";

const ShopPage = () => {

  return (
      <div className={'shop-page'}>
        <Top title={'Shop'}/>
        <Shop/>
      </div>
  );
};

export {ShopPage}