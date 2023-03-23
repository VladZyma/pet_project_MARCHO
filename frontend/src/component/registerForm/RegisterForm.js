import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';

import './registerForm.scss';

const RegisterForm = () => {
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
                    <p className={'modal__text'}>
                        A password will be sent to your email address.
                    </p>
                    <p className={'modal__text'}>
                        Your personal data will be used to support your experience throughout this website,
                        to manage access to your account, and for other purposes described in our privacy policy.
                    </p>
                    <label className={'modal__terms-label'}>
                        <div className={'modal__terms-box'}>
                            <input className={'modal__terms-input'} type={'checkbox'} {...register('terms')}/>
                            <span className={'modal__terms-checkbox'}></span>
                        </div>
                        <span className={'modal__terms-text'}>
                            Agree with
                            <NavLink className={'modal__terms-link'} to={'/terms'}>
                                Terms & Conditions
                            </NavLink>
                        </span>
                    </label>
                    <button className={'modal__button'} type={'submit'}>register</button>
                </form>
            </div>
        </section>
    );
};

export {RegisterForm}