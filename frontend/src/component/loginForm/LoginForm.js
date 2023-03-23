import {useForm} from 'react-hook-form';
import {NavLink} from "react-router-dom";

import './loginForm.scss';

const LoginForm = () => {
    const {register, handleSubmit} = useForm();

    const submitHandler = () => {};

    return (
        <section className={'modal'}>
            <div className={'container'}>
                <div className={'modal__links'}>
                    <NavLink className={'modal__link'} to={'/register'}>
                        register
                    </NavLink>
                    <NavLink className={'modal__link'} to={'/login'}>
                        login
                    </NavLink>
                </div>
                <form className={'modal__form'} onSubmit={handleSubmit(submitHandler)}>
                    <label className={'modal__label'}>
                        Email address*
                        <input className={'modal__input'} type={'text'} {...register('name')}></input>
                    </label>
                    <label className={'modal__label'}>
                        Password*
                        <input className={'modal__input'} type={'password'} {...register('password')}/>
                    </label>

                    <label className={'modal__terms-label'}>
                        <div className={'modal__terms-box'}>
                            <input className={'modal__terms-input'} type={'checkbox'} {...register('terms')}/>
                            <span className={'modal__terms-checkbox'}></span>
                        </div>
                        <span className={'modal__terms-text'}>
                            Remember me
                        </span>
                    </label>
                    <button className={'modal__button'} type={'submit'}>login</button>
                    <NavLink className={'modal__lost-password-link'} to={'#'}>
                        Lost your password?
                    </NavLink>
                </form>
            </div>
        </section>
    );
};

export {LoginForm}