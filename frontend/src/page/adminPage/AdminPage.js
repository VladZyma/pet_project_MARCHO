import {Outlet} from 'react-router-dom';

const AdminPage = () => {

  return (
    <section className={'adminPage'}>
      <Outlet/>
    </section>
  );
};

export {AdminPage}
