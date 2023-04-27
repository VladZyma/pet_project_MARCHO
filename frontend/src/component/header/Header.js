import {NavLink} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";

import './header.scss';
import logo from '../../image/logo.png';

import {oauthService} from "../../service";
import {oauthActions} from "../../redux";

const Header = ({sticky, setSticky}) => {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');

  const {isLoggedIn} = useSelector(state => state.oauthReducer);
  const {productsInCart} = useSelector(state => state.productReducer);
  const {user} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (isLoggedIn) {
      const name = oauthService.getUserName();
      setUserName(name);
    }
  }, [isLoggedIn]);


  const logoutHandler = async () => {
    try {
      await oauthService.logout();
      oauthService.deleteAccessTokens();
      setUserName('');
      dispatch(oauthActions.logIn(false));
    } catch (e) {
      console.log('logoutHandler:',e);
    }
  };

  //Sticky header============
  const headerRef = useRef(null);

  const handleScroll = (elTopOffset, elHeight) => {
    if(window.scrollY > (elTopOffset + elHeight)) {
      setSticky({isSticky: true, offset: elHeight});
    } else {
      setSticky({isSticky: false, offset: 0});
    }
  };

  useEffect(() => {
    let header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);
  //=========================

  return (
      <header className={`header${sticky.isSticky ? ' sticky' : ''}`} ref={headerRef}>
        <div className={'container'}>
          <div className={'header__inner'}>
            <img className={'logo'} src={logo} alt="logo"/>
            <nav className={'menu'}>
              <ul className={'menu__list'}>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/home">HOME</NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to={isLoggedIn ? '/shop' : '/login'}>SHOP</NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/blog">BLOG</NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/contact">CONTACT</NavLink>
                </li>
                {userName
                    ?
                    <li className={'menu__list-item'}>
                      <NavLink className={'menu__list-link'} to="/login" onClick={logoutHandler}>
                        LOG OUT
                      </NavLink>
                    </li>
                    :
                    <li className={'menu__list-item'}>
                      <NavLink className={'menu__list-link'} to="/login">LOG IN</NavLink>
                    </li>
                }
                {!userName
                    &&
                    <li className={'menu__list-item'}>
                      <NavLink className={'menu__list-link'} to="/register">REGISTER</NavLink>
                    </li>
                }

              </ul>
            </nav>
            <div className={'user-nav'}>
              {userName
                  ?
                  <NavLink className={'user-nav__link user-nav__link-name'} to={'/account'}>
                    {userName}
                  </NavLink>
                  :
                  <NavLink className={'user-nav__link'} to={`${isLoggedIn ? '/account' : '/login'}`}>
                    <svg width={20} height={20}>
                      <path fill="#29282d"
                            d="M1392.07 57.928a9.923 9.923 0 0 0-3.8-2.383 5.78 5.78 0 1 0-6.54 0A10.018 10.018 0 0 0 1375 65h1.56a8.44 8.44 0 0 1 16.88 0h1.56a9.931 9.931 0 0 0-2.93-7.072Zm-11.29-7.148A4.22 4.22 0 1 1 1385 55a4.222 4.222 0 0 1-4.22-4.22Z"
                            transform="translate(-1375 -45)"/>
                    </svg>
                  </NavLink>
              }

              <NavLink className={'user-nav__link'} to={`${isLoggedIn ? '/wishlist' : '/login'}`}>
                <svg width={20} height={20}>
                  <path fill="#29282d"
                        d="M1484.78 49.589a6.683 6.683 0 0 0-4.17-4.371c-1.71-.595-3.75 0-5.58 1.611-1.83-1.569-3.88-2.122-5.58-1.569a6.884 6.884 0 0 0-4.17 4.371c-.47 1.57-.51 4.117 1.95 7.215 1.11 1.4 2.82 3.4 4.22 4.965 2.68 3.014 3.11 3.183 3.49 3.183h.17c.39 0 .77-.168 3.45-3.224a224.86 224.86 0 0 0 4.22-4.966c2.47-3.098 2.47-5.645 2-7.215Zm-3.28 6.2c-1.96 2.462-5.32 6.324-6.47 7.385-1.15-1.061-4.52-4.924-6.48-7.385-1.61-1.994-2.21-3.947-1.7-5.687a4.986 4.986 0 0 1 3.11-3.225c1.23-.467 2.9.169 4.43 1.655a.84.84 0 0 0 1.06.126.447.447 0 0 0 .22-.17c1.53-1.443 3.19-2.079 4.42-1.655a5.168 5.168 0 0 1 3.11 3.268c.51 1.699-.08 3.689-1.7 5.683Z"
                        transform="translate(-1465.03 -45)"/>
                </svg>
                {
                  user.wishlist?.length > 0 && isLoggedIn
                    &&
                  <span className={'user-nav__link-num'}>{user.wishlist?.length}</span>
                }
              </NavLink>
              <NavLink className={'user-nav__link'} to={`${isLoggedIn ? '/cart' : '/login'}`}>
                <svg width={20} height={20}>
                  <path fill="#29282d"
                        d="M1527.44 65a2.724 2.724 0 1 1 2.74-2.724 2.738 2.738 0 0 1-2.74 2.724Zm0-3.814a1.09 1.09 0 1 0 1.09 1.09 1.094 1.094 0 0 0-1.09-1.093Zm1.75-2.806h-12.81a.823.823 0 0 1-.8-.628l-2.68-11.115h-2.06a.817.817 0 1 1 0-1.634h2.71a.824.824 0 0 1 .8.627l.74 3.078h16.1a.818.818 0 0 1 .8 1.014l-2 8.038a.822.822 0 0 1-.8.617Zm-12.16-1.635h11.52l1.59-6.4h-14.65Zm.45 8.255a2.724 2.724 0 1 1 2.74-2.724 2.738 2.738 0 0 1-2.74 2.724Zm0-3.814a1.09 1.09 0 1 0 1.09 1.09 1.094 1.094 0 0 0-1.09-1.093Z"
                        transform="translate(-1510 -45)"/>
                </svg>
                {
                  productsInCart.length > 0 && isLoggedIn
                    &&
                  <span className={'user-nav__link-num'}>{productsInCart.length}</span>
                }
              </NavLink>
            </div>
          </div>
        </div>
      </header>
  );
};

export {Header}
