import {Outlet} from 'react-router-dom';

import './shopPage.scss';

import {Top} from "../../component";

const ShopPage = () => {

  return (
      <div className={'shop-page'}>
        <Top title={'Shop'}/>
        <Outlet/>
      </div>
  );
};

export {ShopPage}