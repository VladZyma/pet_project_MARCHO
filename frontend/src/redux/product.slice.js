import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {productService} from "../service";

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (_, {rejectWithValue}) => {
      try {
        const {data} = await productService.getAllProducts()
        console.log('DATA:', data);
        return data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: builder =>
      builder
          .addCase(getAllProducts.fulfilled, (state, action) => {
            console.log('getAllProducts.fulfilled:', action.payload);
            state.products = action.payload;
            state.loading = false;
          })
          .addCase(getAllProducts.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getAllProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })
});

const {reducer: productReducer, actions: {}} = productSlice;

const productActions = {getAllProducts};

export {
  productReducer,
  productActions,
}