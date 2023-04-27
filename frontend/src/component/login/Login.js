import {useDispatch} from 'react-redux';
import {useEffect} from "react";

import {Top, LoginForm} from "../../component";
import {oauthActions} from "../../redux";

const Login = () => {

  const dispatch = useDispatch();
  dispatch(oauthActions.logIn(false));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div>
        <Top title={'Login'}/>
        <LoginForm/>
      </div>
  );
};

export {Login}