import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams, useNavigate} from 'react-router-dom';
import {joiResolver} from '@hookform/resolvers/joi';


import './restorePasswordForm.scss';

import {restorePasswordValidator} from "../../validator";
import {oauthService} from "../../service";

const RestorePasswordForm = () => {

  const navigate = useNavigate();

  const [query, _] = useSearchParams();

  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);

  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: 'all',
    resolver: joiResolver(restorePasswordValidator),
  });

  useEffect(() => {
    oauthService.setActionToken(query.get('token'));
  }, [query]);

  const submitHandler = async (info) => {
    const newPass = info.newPassword;
    const confPass = info.confirmedPassword;

    try {
      if (newPass === confPass) {
        await oauthService.setNewPassword(info);

        oauthService.deleteActionToken();
        navigate('/login');
      } else {
        setIsPasswordsEqual(false);
        reset();
      }
    } catch (e) {
      console.log('RestorePasswordForm',e);
    }

  };

  return (
      <section className={'modal'}>
        <div className={'container'}>
          <form className={'modal__form'} onSubmit={handleSubmit(submitHandler)}>
            <label className={'modal__label'}>
              New password*
              <input className={'modal__input'} type={'password'} {...register('newPassword')}/>
              {errors.newPassword && <span className={'modal__form-error'}>{errors.newPassword.message}</span>}
            </label>
            <label className={'modal__label'}>
              Confirm password*
              <input className={'modal__input'} type={'password'} {...register('confirmedPassword')}/>
              {errors.confirmedPassword && <span className={'modal__form-error'}>{errors.confirmedPassword.message}</span>}
            </label>
            {
              !isPasswordsEqual
                &&
              <span className={'modal__form-error'}>Passwords are not equal!!!</span>
            }
            <button className={'modal__button modal__button-login'} type={'submit'}>confirm</button>
          </form>
        </div>
      </section>
  );
};

export {RestorePasswordForm}
