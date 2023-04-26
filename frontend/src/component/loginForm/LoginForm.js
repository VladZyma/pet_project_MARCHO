import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from "react-router-dom";
import {joiResolver} from '@hookform/resolvers/joi';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

import './loginForm.scss';

import {userValidator} from "../../validator";
import {oauthService} from "../../service";
import {oauthActions, userActions} from "../../redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(null);

  const {register, handleSubmit, formState: {isValid, errors}} = useForm({
    mode: 'all',
    resolver: joiResolver(userValidator.login),
  });

  const submitHandler = async (user) => {
    try {
      const {data} = await oauthService.login(user);

      oauthService.setAccessTokens(data);

      dispatch(oauthActions.logIn(true));

      dispatch(userActions.getUserById({userId: data.userId}));

      navigate('/home');
    } catch (e) {
      console.log(e);
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
          <form className={'modal__form'} onSubmit={handleSubmit(submitHandler)}>
            <label className={'modal__label'}>
              Email address*
              <input className={'modal__input'} type={'email'} {...register('email')}></input>
            </label>
            <label className={'modal__label'}>
              Password*
              <input className={'modal__input'} type={'password'} {...register('password')}/>
            </label>

            <label className={'modal__terms-label'}>
              <div className={'modal__terms-box'}>
                <input className={'modal__terms-input'} type={'checkbox'}/>
                <span className={'modal__terms-checkbox'}></span>
              </div>
              <span className={'modal__terms-text'}>Remember me</span>
            </label>
            {
                (errors.email && <span className={'modal__form-error'}>{errors.email.message}</span>)
                ||
                (errors.password && <span className={'modal__form-error'}>{errors.password.message}</span>)
                ||
                (loginError && <span className={'modal__form-error'}>{loginError}</span>)
            }
            <button className={'modal__button modal__button-login'} disabled={!isValid} type={'submit'}>login</button>
            <NavLink className={'modal__lost-password-link'} to={'#'}>
              Lost your password?
            </NavLink>
          </form>
        </div>
      </section>
  );
};

export {LoginForm}