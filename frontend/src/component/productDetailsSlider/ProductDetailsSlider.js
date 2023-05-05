import Slider from "react-slick";
import {useState} from "react";

import './productDetailsSlider.scss';

const ProductDetailsSlider = ({photo}) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);


  return (
      <div className={'product-slider'}>
        <div className={'product-slider__small'}>
          <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              slidesToShow={4}
              slidesToScroll={1}
              focusOnSelect={true}
              vertical={true}
          >
            <div className={'product-slider__small-img-box'}>
              <img className={'product-slider__small-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__small-img-box'}>
              <img className={'product-slider__small-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__small-img-box'}>
              <img className={'product-slider__small-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__small-img-box'}>
              <img className={'product-slider__small-img'} src={photo} alt={'product'}/>
            </div>
          </Slider>
        </div>
        <div className={'product-slider__big'}>
          <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              arrows={false}
              // draggable={true}
          >
            <div className={'product-slider__big-img-box'}>
              <img className={'product-slider__big-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__big-img-box'}>
              <img className={'product-slider__big-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__big-img-box'}>
              <img className={'product-slider__big-img'} src={photo} alt={'product'}/>
            </div>
            <div className={'product-slider__big-img-box'}>
              <img className={'product-slider__big-img'} src={photo} alt={'product'}/>
            </div>
          </Slider>
        </div>
      </div>
  );
};

export {ProductDetailsSlider}
