import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isGrid: false,
};

const shopViewSlice = createSlice({
  name: 'shopViewSlice',
  initialState,
  reducers: {
    setIsGrid: (state, action) => {
      state.isGrid = action.payload;
    },
  },
});

const {reducer: shopViewReducer, actions: {setIsGrid}} = shopViewSlice;
const shopViewActions = {setIsGrid};

export {
  shopViewReducer,
  shopViewActions,
}
