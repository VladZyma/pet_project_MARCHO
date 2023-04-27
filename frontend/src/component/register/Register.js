import {useEffect} from "react";

import {Top, RegisterForm} from "../../component";

const Register = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className={'register'}>
        <Top title={'Register'}/>
        <RegisterForm/>
      </div>
  );
};

export {Register}