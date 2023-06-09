import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import './account.scss';

import {oauthService} from "../../service";
import {userActions} from "../../redux";

const Account = () => {

  const {user} = useSelector(state => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteAccountHandler = () => {
    try {
      dispatch(userActions.deleteUserById({userId: user._id}));
      oauthService.deleteAccessTokens();
      navigate('/home');
    } catch (e) {
      console.log('deleteAccountHandler', e);
    }
  };

  return (
    <div className={'account'}>
      <div className={'container'}>
        <div className={'account__inner'}>
          <p className={'account__text'}>
            Dear {user.name}, on this page you can delete your account
            and <span>ALL</span> information about you!
          </p>
          <p className={'account__text'}>
            If you would like to do it click the button below!
          </p>
          <button
            className={'account__form-btn'}
            onClick={deleteAccountHandler}
          >
            delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export {Account}