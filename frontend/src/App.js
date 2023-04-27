import {Routes, Route, Navigate} from 'react-router-dom';
import {useState} from "react";


import './App.scss';

import {MainLayout} from "./mainLayout";
import {
  HomePage,
  ShopPage,
  BlogPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  CartPage,
  WishlistPage,
  AccountPage
} from "./page";
import {Header, Footer, Shop, ProductDetails} from "./component";

function App() {

  const [userName, setUserName] = useState('');
  const [sticky, setSticky] = useState({isSticky: false, offset: 0});

  return (
      <div className="App" style={{marginTop: sticky.offset}}>
        <Header sticky={sticky} setSticky={setSticky} userName={userName} setUserName={setUserName}/>
        <Routes>
          <Route path={'/'} element={<MainLayout/>}>
            <Route index element={<Navigate to={'/home'}/>}/>
            <Route path={'/home'} element={<HomePage/>}/>

            <Route path={'/shop'} element={<ShopPage/>}>
              <Route index element={<Navigate to={'/shop/products'}/>}/>
              <Route path={'/shop/products'} element={<Shop/>}/>
              <Route path={'/shop/product/:productId'} element={<ProductDetails/>}/>
            </Route>

            <Route path={'/blog'} element={<BlogPage/>}/>
            <Route path={'/contact'} element={<ContactPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/account'} element={<AccountPage/>}/>
            <Route path={'/wishlist'} element={<WishlistPage/>}/>
            <Route path={'/cart'} element={<CartPage/>}/>
          </Route>
        </Routes>
        <Footer  setUserName={setUserName}/>
      </div>
  );
}

export default App;
