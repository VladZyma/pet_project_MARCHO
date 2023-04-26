import {useDispatch} from 'react-redux';

import {Top, LoginForm} from "../../component";
import {oauthActions} from "../../redux";

const Login = () => {

  const dispatch = useDispatch();
  dispatch(oauthActions.logIn(false));

  return (
      <div>
        <Top title={'Login'}/>
        <LoginForm/>
      </div>
  );
};

export {Login}