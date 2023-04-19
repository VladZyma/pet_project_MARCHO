import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      if (!state.value[action.payload]) {
        state.value[action.payload] = 0;
      }
      state.value[action.payload]++;
    },
    incrementProductQuantity: (state, action) => {
      state.value[action.payload]++;
    },
    decrementProductQuantity: (state, action) => {
      if (state.value[action.payload] - 1 === 0) {
        delete state.value[action.payload];
      }
      state.value[action.payload]--;
    },
    deleteProductFromCart: (state, action) => {
      delete state.value[action.payload];
    },
  },
});

const {
  reducer: cartReducer,
  actions: {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  deleteProductFromCart,
  }
} = cartSlice;
const cartActions = {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  deleteProductFromCart,
};

export {
  cartReducer,
  cartActions,
}