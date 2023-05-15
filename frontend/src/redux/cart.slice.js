import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const productsIdArr = Object.keys(state.value);
      const isProductExists = productsIdArr.some(productId => productId === action.payload);
      if (!isProductExists) {
        if (!state.value[action.payload]) {
          state.value[action.payload] = 0;
        }
        state.value[action.payload]++;
      } else {
        return;
      }
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
    deleteAllProductsFromCart: (state, action) => {
      Object.keys(state.value).forEach(key => delete state.value[key]);
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
    deleteAllProductsFromCart,
  }
} = cartSlice;
const cartActions = {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  deleteProductFromCart,
  deleteAllProductsFromCart
};

export {
  cartReducer,
  cartActions,
}