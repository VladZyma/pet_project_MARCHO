import {useEffect} from "react";

import {Top, RestorePasswordForm} from "../../component";

const RestorePassword = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className={'restore-password'}>
        <Top title={'Password'}/>
        <RestorePasswordForm/>
      </div>
  );
};

export {RestorePassword}
