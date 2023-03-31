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
    // logOut: (state, action) => {
    //   state.isLoggedIn = false;
    // },
  }
});

const {reducer: oauthReducer, actions: {logIn, logOut}} = oauthSlice;
const oauthActions = {
  logIn,
  logOut,
};

export {
  oauthReducer,
  oauthActions,
}