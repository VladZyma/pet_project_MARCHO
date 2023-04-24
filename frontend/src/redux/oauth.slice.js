import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const oauthSlice = createSlice({
  name: 'oauthSlice',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  }
});

const {reducer: oauthReducer, actions: {logIn}} = oauthSlice;
const oauthActions = {
  logIn,
};

export {
  oauthReducer,
  oauthActions,
}