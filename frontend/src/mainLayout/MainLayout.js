import {Outlet} from 'react-router-dom';

import {Header, Main, Footer} from "../component";

const MainLayout = () => {

    return (
        <div className={'main-layout'}>
            <Header/>
            <Main>
                <Outlet/>
            </Main>
            <Footer/>
        </div>
    );
};

export {MainLayout}
