import './partners.scss';

import luxoImg from '../../image/partners/luxo.png';
import brandImg from '../../image/partners/brand.png';
import lImg from '../../image/partners/l.png';
import luxImg from '../../image/partners/lux.png';
import luxo2Img from '../../image/partners/luxo-2.png';
import brand2Img from '../../image/partners/brand-2.png';

const Partners = () => {

  return (
      <div className={'partners'}>
        <div className={'container'}>
          <div className={'partners__inner'}>
            <img className={'partners__img'} src={luxoImg} alt="partner logo"/>
            <img className={'partners__img'} src={brandImg} alt="partner logo"/>
            <img className={'partners__img'} src={lImg} alt="partner logo"/>
            <img className={'partners__img'} src={luxImg} alt="partner logo"/>
            <img className={'partners__img'} src={luxo2Img} alt="partner logo"/>
            <img className={'partners__img'} src={brand2Img} alt="partner logo"/>
          </div>
        </div>
      </div>
  );
};

export {Partners}
