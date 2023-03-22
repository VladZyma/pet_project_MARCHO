import {Routes, Route, Navigate} from 'react-router-dom';

import './App.scss';

import {MainLayout} from "./mainLayout";
import {HomePage, ShopPage, BlogPage, ContactPage, LoginPage, RegisterPage, CartPage, WishlistPage, AccountPage} from "./page";
import {Header, Footer} from "./component";

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
              <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'/home'}/>}/>
                <Route path={'/home'} element={<HomePage/>}/>
                <Route path={'/shop'} element={<ShopPage/>}/>
                <Route path={'/blog'} element={<BlogPage/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/wishlist'} element={<WishlistPage/>}/>
                <Route path={'/cart'} element={<CartPage/>}/>
              </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
