import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {oauthReducer} from "./oauth.slice";
import {productReducer} from "./product.slice";
import {cartReducer} from "./cart.slice";
import {userReducer} from "./user.slice";
import {shopViewReducer} from "./shopView.slice";
import {adminReducer} from "./admin.slice";
import {orderReducer} from "./order.slice";

const rootReducer = combineReducers({
  oauthReducer,
  productReducer,
  cartReducer,
  userReducer,
  shopViewReducer,
  adminReducer,
  orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export {store}
