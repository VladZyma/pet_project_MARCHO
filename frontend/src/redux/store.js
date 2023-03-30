import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {oauthReducer} from "./oauth.slice";

const rootReducer = combineReducers({
  oauthReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export {store}
