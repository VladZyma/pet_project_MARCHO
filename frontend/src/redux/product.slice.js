import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {productService} from "../service";

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async ({page}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getAllProducts(page);
        console.log('DATA:', data);
        return data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
);
const getProductsByParams = createAsyncThunk(
    'productSlice/getProductsByParams',
    async ({page, value}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getProductsByParams(page, value);
        console.log('BYPARAMS:', data);
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

          .addCase(getProductsByParams.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
          })
          .addCase(getProductsByParams.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getProductsByParams.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })
});

const {reducer: productReducer, actions: {}} = productSlice;

const productActions = {
  getAllProducts,
  getProductsByParams,
};

export {
  productReducer,
  productActions,
}