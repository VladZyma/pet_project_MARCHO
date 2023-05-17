import {useState} from "react";
import {useForm} from "react-hook-form";

import './lostPasswordPopUp.scss';

import {oauthService} from "../../service";

const LostPasswordPopUp = ({domain, setIsLostPassword}) => {

  const {register, handleSubmit} = useForm();

  const [isEnterEmail, setIsEnterEmail] = useState(true);

  const submitHandler = async (info) => {
    const data = {email: info.email, domain: domain};
    try {
      setIsEnterEmail(false)
      await oauthService.forgotPassword(data);
    } catch (e) {
      console.log('LostPasswordPopUp',e);
    }
  };

  return (
      <div className={'lostPasswordPopUp'}>
        <div className={'container'}>
          <div className={'lostPasswordPopUp__inner'}>
            {
              isEnterEmail
                ?
                  <form className={'lostPasswordPopUp__form'} onSubmit={handleSubmit(submitHandler)}>
                    <input
                        className={'lostPasswordPopUp__form-input'}
                        type={'text'} placeholder={'enter your E-mail'}
                        {...register('email')}
                    />
                    <button
                        className={'lostPasswordPopUp__form-btn send'}
                        type={'submit'}
                    >
                      send
                    </button>
                    <button
                        className={'lostPasswordPopUp__form-btn close'}
                        type={'button'}
                        onClick={() => setIsLostPassword(false)}
                    >
                      close
                    </button>
                  </form>
                :
                  <div className={'lostPasswordPopUp__info'}>
                    <p className={'lostPasswordPopUp__text'}>
                      Letter with next instructions was send to your E-mail.
                    </p>
                    <button
                        className={'lostPasswordPopUp__close-btn'}
                        onClick={() => setIsLostPassword(false)}
                    >
                      close
                    </button>
                  </div>
            }
          </div>
        </div>
      </div>
  );
};

export {LostPasswordPopUp}
