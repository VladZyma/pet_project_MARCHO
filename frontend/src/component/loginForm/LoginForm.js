import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from "react-router-dom";
import {joiResolver} from '@hookform/resolvers/joi';
import {useState} from 'react';

import './loginForm.scss';

import {LostPasswordPopUp} from "../lostPasswordPopUp/LostPasswordPopUp";
import {userValidator} from "../../validator";
import {oauthService} from "../../service";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);
  const [isLostPassword, setIsLostPassword] = useState(false);

  const {register, handleSubmit, formState: {isValid, errors}} = useForm({
    mode: 'all',
    resolver: joiResolver(userValidator.login),
  });

  const submitHandler = async (user) => {
    try {
      const {data} = await oauthService.login(user);

      oauthService.setAccessTokens({...data, isLoggedIn: true});

      navigate('/home');
    } catch (e) {
      setLoginError(e.response.data?.message);
    }
  };

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

          {isLostPassword && <LostPasswordPopUp setIsLostPassword={setIsLostPassword}/>}

          <form className={'modal__form'} onSubmit={handleSubmit(submitHandler)}>
            <label className={'modal__label'}>
              Email address*
              <input
                  className={'modal__input'}
                  type={'email'}
                  {...register('email')}
                  placeholder={'your E-mail or guest@test.com'}
              />
            </label>
            <label className={'modal__label'}>
              Password*
              <input
                  className={'modal__input'}
                  type={'password'}
                  {...register('password')}
                  placeholder={'your password or Guest1!'}
              />
            </label>

            {
                (errors.email && <span className={'modal__form-error'}>{errors.email.message}</span>)
                ||
                (errors.password && <span className={'modal__form-error'}>{errors.password.message}</span>)
                ||
                (loginError && <span className={'modal__form-error'}>{loginError}</span>)
            }
            <button className={'modal__button modal__button-login'} disabled={!isValid} type={'submit'}>login</button>
            <span className={'modal__lost-password-link'} onClick={() => setIsLostPassword(true)}>
              Lost your password?
            </span>
          </form>
        </div>
      </section>
  );
};

export {LoginForm}