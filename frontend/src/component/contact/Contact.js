import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";

import './contact.scss';

import {ContactIcon} from "../contactIcon/ContactIcon";
import {GoogleMap} from "../googleMap/GoogleMap";

const Contact = () => {

  const {register, handleSubmit, reset} = useForm();

  const [isFormPopUp, setIsFormPopUp] = useState(false);

  const {user} = useSelector(state => state.userReducer);

  const onSubmit = (email) => {
      reset();
      setIsFormPopUp(true);
  };

  return (
      <div className={'contact'}>
        <div className={'container'}>
          <div className={'contact__map-wrapper'}>
            <GoogleMap/>
          </div>
          <div className={'contact__inner'}>
            <div className={'contact__content'}>
              <h3 className={'contact__title title'}>
                Feel Free Don’t
                Hesitate To
                Contact With Us
              </h3>
              <p className={'contact__text'}>
                Lorem ipsum dolor sit amet, consectetur adingn elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                Risus commodo maecnaacnrao cumsan lacus vel facilisis.
              </p>
              <div className={'contact__items'}>
                <div className={'contact__item'}>
                  <ContactIcon iconImg={
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19.97}>
                      <path fill="#fe3e57" fillRule="evenodd" d="m19.477 14.73-2.485-2.49a1.807 1.807 0 0 0-2.485 0l-.414.42 4.969 4.97.415-.41a1.763 1.763 0 0 0 0-2.49Zm-7.982-1.35L6.583 8.46a1.323 1.323 0 0 1-.09-1.75L1.535 1.74a6.341 6.341 0 0 0 .3 8.6l7.774 7.78a6.291 6.291 0 0 0 8.587.31l-4.958-4.96a1.334 1.334 0 0 1-1.738-.09ZM7.713 5.44a1.764 1.764 0 0 0 0-2.49L5.228.47a1.787 1.787 0 0 0-2.485 0l-.414.41 4.969 4.98Z"/>
                    </svg>
                  }/>
                  <div className={'contact__item-text-wrapper'}>
                    <Link className={'contact__item-text'} to={'tel:+01234567896'}>
                      +0-123-456-7896
                    </Link>
                    <Link className={'contact__item-text'} to={'tel:+01234567896'}>
                      +0-123-456-7896
                    </Link>
                  </div>
                </div>
                <div className={'contact__item'}>
                  <ContactIcon iconImg={
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={20}>
                      <path fill="#fe3e57" fillRule="evenodd" d="M7 0a7.131 7.131 0 0 0-7 7.24c0 4.96 6.262 12.23 6.529 12.53a.613.613 0 0 0 .937 0c.267-.3 6.529-7.57 6.529-12.53A7.131 7.131 0 0 0 7 0Zm0 10.88a3.642 3.642 0 1 1 3.521-3.64A3.584 3.584 0 0 1 7 10.88Z"/>
                    </svg>
                  }/>
                  <div className={'contact__item-text-wrapper'}>
                    <address className={'contact__item-text'}>
                      Ranlon Market 789 Road,
                      Market Street, New York
                    </address>
                  </div>
                </div>
                <div className={'contact__item'}>
                  <ContactIcon iconImg={
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={20}>
                      <path fill="#fe3e57" fillRule="evenodd" d="M0 7.94v10.31a1.7 1.7 0 0 0 .18.75l5.571-5.44C3.617 11.47 2.22 10.11 0 7.94Zm12.248 5.62 5.57 5.44a1.686 1.686 0 0 0 .181-.75V7.94c-2.13 2.08-3.593 3.51-5.751 5.62ZM9 5.94a.585.585 0 1 0 .591.54A.591.591 0 0 0 9 5.94Zm2.151 8.2h-4.3l-5.819 5.69a1.805 1.805 0 0 0 .771.17h14.4a1.805 1.805 0 0 0 .771-.17ZM2.4 8.62V5.11L.6 6.87Zm15-1.75-1.8-1.76v3.51Zm-6.248 6.1L14.4 9.8V.75a.756.756 0 0 0-.769-.75H4.257a.644.644 0 0 0-.656.64V9.8l3.248 3.17h4.3ZM4.801 6.52a4.2 4.2 0 0 1 8.4 0 1.8 1.8 0 0 1-3 1.3 1.744 1.744 0 1 1 .6-1.3.6.6 0 0 0 1.2 0 3 3 0 0 0-6 0 2.894 2.894 0 0 0 1.386 2.47 3.177 3.177 0 0 0 3.028.15.586.586 0 1 1 .5 1.06 4.362 4.362 0 0 1-4.176-.22A4.067 4.067 0 0 1 4.8 6.52Z"/>
                    </svg>
                  }/>
                  <div className={'contact__item-text-wrapper'}>
                    <Link className={'contact__item-text'} to={'mailto:yourmailaddress@gmail.com'}>
                      yourmailaddress@gmail.com
                    </Link>
                    <Link className={'contact__item-text'} to={'mailto:companymail@gmail.com'}>
                      companymail@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className={'contact__form-wrapper'}>*/}
            {/*  <h5 className={'contact__form-title title'}>*/}
            {/*    Contact Form*/}
            {/*  </h5>*/}
            {/*  <form className={'contact__form'} onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <div className={'contact__form-inner'}>*/}
            {/*      <input*/}
            {/*        className={'contact__form-input'}*/}
            {/*        type={'text'}*/}
            {/*        placeholder={'Your Name'}*/}
            {/*        required={true}*/}
            {/*        {...register('name')}*/}
            {/*      />*/}
            {/*      <input*/}
            {/*        className={'contact__form-input'}*/}
            {/*        type={'text'}*/}
            {/*        defaultValue={user.email}*/}
            {/*        {...register('email')}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <input*/}
            {/*      className={'contact__form-input'}*/}
            {/*      type={'text'}*/}
            {/*      placeholder={'Subject'}*/}
            {/*      required={true}*/}
            {/*      {...register('subject')}*/}
            {/*    />*/}
            {/*    <textarea*/}
            {/*      className={'contact__form-textarea'}*/}
            {/*      placeholder={'Message here'}*/}
            {/*      required={true}*/}
            {/*      {...register('message')}*/}
            {/*    >*/}
            {/*    </textarea>*/}
            {/*    <button className={'contact__form-button'} type={'submit'}>send message</button>*/}
            {/*    <div className={isFormPopUp ? 'contact__form-popup active' : 'contact__form-popup'}>*/}
            {/*      <span className={'contact__form-popup-text'}>*/}
            {/*        Thank You for your letter! We will answer as soon as possible!*/}
            {/*      </span>*/}
            {/*      <button className={'contact__form-popup-btn'} type={'button'} onClick={() => setIsFormPopUp(false)}>*/}
            {/*        ok*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </form>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
  );
};

export {Contact}