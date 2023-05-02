import {useState} from 'react';

import './headerMobileMenuBtn.scss';

const HeaderMobileMenuBtn = ({isMobileMenu, setIsMobileMenu}) => {

  const [isButtonActive, setIsButtonActive] = useState(false);

  const onButtonClick = () => {
    setIsMobileMenu(!isMobileMenu);
    setIsButtonActive(!isButtonActive);
  };

  return (
      <button className={!isButtonActive ? 'mobile-menu-button' : 'mobile-menu-button mobile-menu-button--active'} onClick={onButtonClick}>
        <span></span>
      </button>
  );
};

export {HeaderMobileMenuBtn}
