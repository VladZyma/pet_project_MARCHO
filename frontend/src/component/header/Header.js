import {NavLink} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";

import './header.scss';
import logo from '../../image/logo.png';

import {HeaderMobileMenuBtn} from "../headerMobileMenuBtn/HeaderMobileMenuBtn";
import {oauthService} from "../../service";
import {userActions, cartActions} from "../../redux";

const Header = ({sticky, setSticky, userName, setUserName}) => {

  const dispatch = useDispatch();

  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const isLoggedIn = oauthService.getIsLoggedIn();
  const userId = oauthService.getUserId();

  const {user} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (isLoggedIn) {
      const name = oauthService.getUserName();
      setUserName(name);
      dispatch(userActions.getUserById({userId}));

    } else {
      setUserName('');
    }

  }, [dispatch, isLoggedIn]);


  useEffect(() => {
    if (user) {
      user.cart?.products.forEach(productId => dispatch(cartActions.addProductToCart(productId)));
    }
  }, [user._id]);


  const logoutHandler = async () => {
    try {
      await oauthService.logout();
      oauthService.deleteAccessTokens();
      dispatch(userActions.clearUserInfoOnLogOut());
      dispatch(cartActions.deleteAllProductsFromCart());
      setUserName('');
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
              <HeaderMobileMenuBtn isMobileMenu={isMobileMenu} setIsMobileMenu={setIsMobileMenu}/>
              <ul className={!isMobileMenu ? 'menu__list' : 'menu__list menu__list--mobile'}>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/home">HOME</NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={isLoggedIn ? 'menu__list-link' : 'menu__list-link login'} to={isLoggedIn ? '/shop' : '/login'}>
                    SHOP
                  </NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/blog">
                    BLOG
                  </NavLink>
                </li>
                <li className={'menu__list-item'}>
                  <NavLink className={'menu__list-link'} to="/contact">
                    CONTACT
                  </NavLink>
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
                      <NavLink className={'menu__list-link'} to="/login">
                        LOG IN
                      </NavLink>
                    </li>
                }
                {!userName
                    &&
                    <li className={'menu__list-item'}>
                      <NavLink className={'menu__list-link'} to="/register">
                        REGISTER
                      </NavLink>
                    </li>
                }

              </ul>
            </nav>
            <div className={!isMobileMenu ? 'user-nav' : 'user-nav user-nav--mobile'}>
              {
                user.isAdmin &&
                <NavLink className={'user-nav__link-admin'} to={'/admin'}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="#8d8d8d"
                      d="M78.6 5c-9.5-7.4-23-6.5-31.6 2L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4H158l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3L192 158v-54c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1 0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9l117.8-117.8c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16v-57.5c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0c-79.5 0-144 64.5-144 144v.8l85.3 85.3c36-9.1 75.8.5 104 28.7l15.7 15.7c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1-48 0z"
                    />
                  </svg>
                </NavLink>
              }
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
                  user.cart?.products.length > 0 && isLoggedIn
                    &&
                  <span className={'user-nav__link-num'}>{user.cart?.products.length}</span>
                }
              </NavLink>
            </div>
          </div>
        </div>
      </header>
  );
};

export {Header}
