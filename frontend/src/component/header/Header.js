import {NavLink} from "react-router-dom";

import './header.scss';
import logo from '../../image/logo.png';
import userIcon from '../../image/icons/user-icon.svg';
import heartIcon from '../../image/icons/heart-icon.svg';
import cartIcon from '../../image/icons/cart-icon.svg';

const Header = () => {

    return (
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header__inner'}>
                    <img className={'header__logo'} src={logo} alt="logo"/>
                    <nav className={'menu'}>
                        <ul className={'menu__list'}>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/home">HOME</NavLink>
                            </li>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/shop">SHOP</NavLink>
                            </li>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/blog">BLOG</NavLink>
                            </li>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/contact">CONTACT</NavLink>
                            </li>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/login">LOG IN</NavLink>
                            </li>
                            <li className={'menu__list-item'}>
                                <NavLink className={'menu__list-link'} to="/register">REGISTER</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={'user-nav'}>
                        <NavLink className={'user-nav__link'}>
                            <img className={'user-nav__link-img'} src={userIcon} alt="user icon"/>
                        </NavLink>
                        <NavLink className={'user-nav__link'}>
                            <img className={'user-nav__link-img'} src={heartIcon} alt="heart icon"/>
                            <span className={'user-nav__link-num'}>0</span>
                        </NavLink>
                        <NavLink className={'user-nav__link'}>
                            <img className={'user-nav__link-img'} src={cartIcon} alt="cart icon"/>
                            <span className={'user-nav__link-num'}>4</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export {Header}