import {Link} from 'react-router-dom';

import './error404.scss';

import error404Img from '../../image/error404.png';

const Error404 = () => {

  return (
      <div className={'error404'}>
        <div className={'container'}>
          <div className={'error404__inner'}>
            <div className={'error404__content'}>
              <h3 className={'error404__title title'}>
                OPPS! Page Not Found!!
              </h3>
              <p className={'error404__text'}>
                We're sorry but we can’t seem to find the pages you request.
                This might be because you have typed the web address not find incorrectly.
              </p>
              <Link className={'error404__link'} to={'/home'}>
                back to home
              </Link>
            </div>
            <div className={'error404__img-wrapper'}>
              <img className={'error404__img'} src={error404Img} alt={'error'}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export  {Error404}
