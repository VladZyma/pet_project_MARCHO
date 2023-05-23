import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from "react-redux";

import './footer.scss';
import logo from '../../image/logo.png';
import masterCard from '../../image/icons/master-card.png';
import visa from '../../image/icons/visa.png';
import payPal from '../../image/icons/pay-pal.png';
import {oauthService} from "../../service";
import {cartActions, userActions} from "../../redux";

const Footer = ({setUserName}) => {

    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();


    const {isLoggedIn} = useSelector(state => state.oauthReducer);

    const submitHandler = () => {};

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

    return (
        <footer className={'footer'}>
            <div className={'container'}>
                <div className={'footer__top'}>
                    <div className={'footer__top-item footer__top-item--contacts'}>
                        <Link to={'#'}>
                            <img className={'logo'} src={logo} alt="logo"/>
                        </Link>
                        <address className={'footer__top-address'}>
                            No. 342 - London Oxford Street,
                            012 United States
                        </address>
                        <Link className={'footer__top-email'} to="mailto:Youremail@gmail.com">
                            Youremail@gmail.com
                        </Link>
                        <Link className={'footer__top-phone'} to="tel:+02838388393">
                            +0283 838 8393
                        </Link>
                        <ul className={'footer__top-social-list'}>
                            <li className={'footer__top-social-item'}>
                                <Link className={'footer__top-social-link'} to="#">
                                    <svg width={10} height={16}>
                                        <path fill="#8d8d8d" d="m8.723 9 .445-2.895H6.391V4.227c0-.793.386-1.567 1.632-1.567h1.262V.195S8.137 0 7.043 0c-2.29 0-3.785 1.387-3.785 3.898v2.207H.715V9h2.543v7H6.39V9Zm0 0"/>
                                    </svg>
                                </Link>
                            </li>
                            <li className={'footer__top-social-item'}>
                                <Link className={'footer__top-social-link'} to="#">
                                    <svg width={17} height={14}>
                                        <path fill="#8d8d8d" d="M15.254 4.148c.008.125.008.25.008.375 0 3.793-3.504 8.16-9.91 8.16-1.977 0-3.809-.468-5.352-1.285.281.028.55.036.84.036 1.629 0 3.129-.454 4.328-1.227-1.531-.027-2.816-.852-3.258-1.988.215.023.43.043.656.043.313 0 .625-.035.918-.098C1.887 7.898.691 6.742.691 5.348v-.035c.461.214 1.004.347 1.575.363C1.328 5.16.71 4.28.71 3.286c0-.532.172-1.02.477-1.446 1.714 1.738 4.292 2.879 7.183 3a2.63 2.63 0 0 1-.086-.656c0-1.582 1.55-2.868 3.485-2.868 1.003 0 1.906.344 2.543.907a7.823 7.823 0 0 0 2.21-.696c-.257.668-.808 1.227-1.53 1.582A8.167 8.167 0 0 0 17 2.664a6.882 6.882 0 0 1-1.746 1.484Zm0 0"/>
                                    </svg>
                                </Link>
                            </li>
                            <li className={'footer__top-social-item'}>
                                <Link className={'footer__top-social-link'} to="#">
                                    <svg width={15} height={16}>
                                        <path fill="#8d8d8d" d="M3.36 14H.245V4.652H3.36ZM1.8 3.379c-.995 0-1.8-.77-1.8-1.7C0 .755.805 0 1.8 0c.997 0 1.802.754 1.802 1.68 0 .93-.805 1.699-1.801 1.699ZM14.997 14h-3.101V9.45c0-1.083-.024-2.473-1.618-2.473-1.617 0-1.867 1.175-1.867 2.394V14H5.305V4.652h2.984V5.93h.043c.414-.735 1.43-1.512 2.941-1.512 3.149 0 3.727 1.934 3.727 4.45V14Zm0 0"/>
                                    </svg>
                                </Link>
                            </li>
                            <li className={'footer__top-social-item'}>
                                <Link className={'footer__top-social-link'} to="#">
                                    <svg width={17} height={16}>
                                        <path fill="#8d8d8d" d="M17 8.18c0 4.422-3.375 7.57-8.36 7.57C3.86 15.75 0 12.29 0 8S3.86.25 8.64.25c2.325 0 4.286.766 5.794 2.027l-2.352 2.028C9.004 1.645 3.285 3.645 3.285 8c0 2.703 2.406 4.895 5.356 4.895 3.418 0 4.703-2.2 4.902-3.34H8.641V6.887h8.222c.082.398.137.777.137 1.293Zm0 0"/>
                                    </svg>
                                </Link>
                            </li>
                            <li className={'footer__top-social-item'}>
                                <Link className={'footer__top-social-link'} to="#">
                                    <svg width={13} height={16}>
                                        <path fill="#8d8d8d" d="M6.906.203C3.434.203 0 2.34 0 5.801 0 8 1.34 9.25 2.152 9.25c.336 0 .528-.863.528-1.105 0-.293-.801-.91-.801-2.122 0-2.511 2.07-4.293 4.754-4.293 2.304 0 4.012 1.211 4.012 3.434 0 1.656-.723 4.77-3.06 4.77-.843 0-1.562-.563-1.562-1.368 0-1.183.895-2.324.895-3.543 0-2.07-3.18-1.695-3.18.805 0 .524.07 1.106.325 1.586-.47 1.856-1.422 4.621-1.422 6.531 0 .594.09 1.172.152 1.766.113.117.059.105.234.047 1.707-2.156 1.645-2.578 2.418-5.403.414.73 1.492 1.125 2.344 1.125C11.387 11.48 13 8.246 13 5.332 13 2.227 10.094.203 6.906.203Zm0 0"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'footer__top-item footer__top-item--links'}>
                        <h5 className={'footer__top-item-title'}>
                            Useful Links
                        </h5>
                        <ul className={'footer__top-info-list'}>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link footer__top-link--inactive'} to={'#'}>
                                    About Us
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link footer__top-link--inactive'} to={'#'}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link footer__top-link--inactive'} to={'#'}>
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link footer__top-link--inactive'} to={'#'}>
                                    Contact Us
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link footer__top-link--inactive'} to={'#'}>
                                    Help & Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'footer__top-item footer__top-item--account'}>
                        <h5 className={'footer__top-item-title'}>
                            My Account
                        </h5>
                        <ul className={'footer__top-info-list'}>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link'} to={'/account'}>
                                    My Account
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link'} to={isLoggedIn ? '/cart' : '/login'}>
                                    My Cart
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link'} to={isLoggedIn ? '/wishlist' : '/login'}>
                                    My Wishlist
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link'} to={'register'}>
                                    Registration
                                </Link>
                            </li>
                            <li className={'footer__top-info-item'}>
                                <Link className={'footer__top-link'} to={'login'} onClick={logoutHandler}>
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'footer__top-item footer__top-item-form'}>
                        <h5 className={'footer__top-item-title'}>
                            {/*Subscribe Our Newsletter*/}
                            Our News
                        </h5>
                        <p className={'footer__top-item-text'}>
                            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor*/}
                            {/*incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.*/}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                        </p>
                        {/*<form className={'footer__form'} onSubmit={handleSubmit(submitHandler)}>*/}
                        {/*    <input*/}
                        {/*        className={'footer__form-input'}*/}
                        {/*        type='text' placeholder={'Your email address'}*/}
                        {/*        {...register('email')}*/}
                        {/*    />*/}
                        {/*    <button*/}
                        {/*        className={'footer__form-btn'}*/}
                        {/*        type={'submit'}>*/}
                        {/*        SUBSCRIBE*/}
                        {/*    </button>*/}
                        {/*</form>*/}
                    </div>
                </div>
                <div className={'footer__bottom'}>
                    <p className={'footer__bottom-copyright'}>
                        © 2019 CodeAstrology. All Rights Reserved.
                    </p>
                    <div className={'footer__bottom-accept'}>
                        <span className={'footer__bottom-accept-text'}>
                            We Accept
                        </span>
                        <img className={'footer__bottom-accept-img'} src={masterCard} alt="master card"/>
                        <img className={'footer__bottom-accept-img'} src={visa} alt="visa"/>
                        <img className={'footer__bottom-accept-img'} src={payPal} alt="pay pal"/>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export {Footer}