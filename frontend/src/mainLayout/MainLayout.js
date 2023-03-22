import {Outlet} from 'react-router-dom';


const MainLayout = () => {

    return (
        <main className={'main-layout'}>
            <div className={'container'}>
                <Outlet/>
            </div>
        </main>
    );
};

export {MainLayout}
