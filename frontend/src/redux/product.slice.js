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
    'productSlice/getProductsByParams2',
    async ({page, values}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getProductsByParams(page, values);
        console.log('BYPARAMS:', data);
        return data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
);

const initialState = {
  products: [],
  productsInCart: [],
  product: {},
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    getProductById: (state, action) => {
      const productId = action.payload;
      const foundProduct = state.products.products.find(product => product._id === productId);
      state.product = foundProduct;
    },
    addProductInCart: (state, action) => {
      state.productsInCart.push(action.payload);
    },
    deleteProductInCart: (state, action) => {
      const productIndex = state.productsInCart.findIndex(product => product.id = action.payload);
      state.productsInCart.splice(productIndex, 1);
    },
  },
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

const {reducer: productReducer, actions: {getProductById, addProductInCart, deleteProductInCart}} = productSlice;

const productActions = {
  getAllProducts,
  getProductsByParams,
  getProductById,
  addProductInCart,
  deleteProductInCart,
};

export {
  productReducer,
  productActions,
}