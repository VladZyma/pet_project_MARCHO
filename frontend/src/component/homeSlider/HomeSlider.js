import {NavLink} from 'react-router-dom';
import Slider from 'react-slick';

import './homeSlider.scss';
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

import sliderImg from '../../image/home-slider-model.png';

const HomeSlider = () => {
  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
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
                  <NavLink className={'home-slider__link'}>
                    buy now
                  </NavLink>
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
                  <NavLink className={'home-slider__link'}>
                    buy now
                  </NavLink>
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
                  <NavLink className={'home-slider__link'}>
                    buy now
                  </NavLink>
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
                  <NavLink className={'home-slider__link'}>
                    buy now
                  </NavLink>
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
