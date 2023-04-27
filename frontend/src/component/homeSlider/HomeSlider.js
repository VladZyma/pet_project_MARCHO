import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import Slider from 'react-slick';

import './homeSlider.scss';

import sliderImg from '../../image/home-slider-model.png';

const HomeSlider = () => {

  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const {isLoggedIn} = useSelector(state => state.oauthReducer);

  return (
      <section className={'home-slider'}>
        <div className={'home-slider__container'}>
            <Slider {...settings}>
              <div className={'home-slider__item'}>
                <div className={'home-slider__content'}>
                  <h3 className={'home-slider__title'}>
                    New Season<br/>
                    New Brand Collection
                  </h3>
                  <p className={'home-slider__text'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    et dolore magna aliqua. Ipsum.
                  </p>
                  <Link className={'home-slider__link'} to={isLoggedIn ? '/shop' : '/login'}>
                    buy now
                  </Link>
                </div>
                <div className={'home-slider__img-wrapper'}>
                  <img className={'home-slider__img'} src={sliderImg} alt="slider model"/>
                </div>
              </div>
              <div className={'home-slider__item'}>
                <div className={'home-slider__content'}>
                  <h3 className={'home-slider__title'}>
                    New Season<br/>
                    New Brand Collection
                  </h3>
                  <p className={'home-slider__text'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    et dolore magna aliqua. Ipsum.
                  </p>
                  <Link className={'home-slider__link'} to={isLoggedIn ? '/shop' : '/login'}>
                    buy now
                  </Link>
                </div>
                <div className={'home-slider__img-wrapper'}>
                  <img className={'home-slider__img'} src={sliderImg} alt="slider model"/>
                </div>
              </div>
              <div className={'home-slider__item'}>
                <div className={'home-slider__content'}>
                  <h3 className={'home-slider__title'}>
                    New Season<br/>
                    New Brand Collection
                  </h3>
                  <p className={'home-slider__text'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    et dolore magna aliqua. Ipsum.
                  </p>
                  <Link className={'home-slider__link'} to={isLoggedIn ? '/shop' : '/login'}>
                    buy now
                  </Link>
                </div>
                <div className={'home-slider__img-wrapper'}>
                  <img className={'home-slider__img'} src={sliderImg} alt="slider model"/>
                </div>
              </div>
              <div className={'home-slider__item'}>
                <div className={'home-slider__content'}>
                  <h3 className={'home-slider__title'}>
                    New Season<br/>
                    New Brand Collection
                  </h3>
                  <p className={'home-slider__text'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    et dolore magna aliqua. Ipsum.
                  </p>
                  <Link className={'home-slider__link'} to={isLoggedIn ? '/shop' : '/login'}>
                    buy now
                  </Link>
                </div>
                <div className={'home-slider__img-wrapper'}>
                  <img className={'home-slider__img'} src={sliderImg} alt="slider model"/>
                </div>
              </div>
            </Slider>
        </div>
      </section>
  );
};

export {HomeSlider}
