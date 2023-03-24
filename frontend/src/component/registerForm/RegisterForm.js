import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';
import {joiResolver} from '@hookform/resolvers/joi';
import {useState} from 'react';

import './registerForm.scss';

import {oauthService} from "../../service";
import {userValidator} from "../../validator";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [isTerms, setIsTerms] = useState(false);
  const [apiEmailError, setApiEmailError] = useState(null);

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    mode: 'all',
    resolver: joiResolver(userValidator.register),
  });


  const submitHandler = async (user) => {
    try {
      const newUser = await oauthService.register(user);
      navigate('/login');
    } catch (e) {
      setApiEmailError(e.response.data?.message);
      console.log(e);
    }
  };

  const checkTerms = () => {
    setIsTerms(true);
  }

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
              Name*
              <input className={'modal__input'} type={'text'} {...register('name')}></input>
              {errors.name && <span className={'modal__form-error'}>{errors.name.message}</span>}
            </label>
            <label className={'modal__label'}>
              Email address*
              <input className={'modal__input'} type={'email'} {...register('email')}></input>
              {
                  (errors.email && <span className={'modal__form-error'}>{errors.email.message}</span>)
                  ||
                  (apiEmailError && <span className={'modal__form-error'}>{apiEmailError}</span>)
              }

            </label>
            <label className={'modal__label'}>
              Password*
              <input className={'modal__input'} type={'password'} {...register('password')}/>
              {errors.password && <span className={'modal__form-error'}>{errors.password.message}</span>}
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
                <span onClick={checkTerms} className={'modal__terms-checkbox'}></span>
              </div>
              <span className={'modal__terms-text'}>
                Agree with
                <NavLink className={'modal__terms-link'} to={'/terms'}>
                  Terms & Conditions*
                </NavLink>
              </span>
              {errors.terms && <span className={'modal__form-error'}>{errors.terms.message}</span>}
            </label>
            <button disabled={!isValid || !isTerms} className={'modal__button modal__button-register'} type={'submit'}>register</button>
          </form>
        </div>
      </section>
  );
};

export {RegisterForm}