import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {oauthReducer} from "./oauth.slice";
import {productReducer} from "./product.slice";
import {cartReducer} from "./cart.slice";
import {userReducer} from "./user.slice";

const rootReducer = combineReducers({
  oauthReducer,
  productReducer,
  cartReducer,
  userReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export {store}
