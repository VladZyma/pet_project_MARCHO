import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {oauthReducer} from "./oauth.slice";
import {productReducer} from "./product.slice";

const rootReducer = combineReducers({
  oauthReducer,
  productReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export {store}
