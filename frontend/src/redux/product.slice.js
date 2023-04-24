import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {productService} from "../service";

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async ({page}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getAllProducts(page);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);
const getPromoProducts = createAsyncThunk(
    'productSlice/getPromoProducts',
    async ({page}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getPromoProducts(page);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const getProductsByParams = createAsyncThunk(
    'productSlice/getProductsByParams2',
    async ({page, values}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getProductsByParams(page, values);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const initialState = {
  products: [],
  promoProducts: [],
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

      if (state.products.products?.length > 0) {
        const foundProduct = state.products.products?.find(product => product._id === productId);
        state.product = foundProduct;
      } else {
        const foundProduct = state.promoProducts.products?.find(product => product._id === productId);
        state.product = foundProduct;
      }
    },
    addProductInCart: (state, action) => {
      state.productsInCart.push(action.payload);
    },
    deleteProductInCart: (state, action) => {
      const productIndex = state.productsInCart.findIndex(product => product.id === action.payload);
      state.productsInCart.splice(productIndex, 1);
    },
    deleteAllProductsInCart: (state, action) => {
      state.productsInCart.splice(0, state.productsInCart.length);
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

          .addCase(getPromoProducts.fulfilled, (state, action) => {
            state.promoProducts = action.payload;
            state.loading = false;
          })
          .addCase(getPromoProducts.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getPromoProducts.rejected, (state, action) => {
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

const {
  reducer: productReducer,
  actions: {
    getProductById,
    addProductInCart,
    deleteProductInCart,
    deleteAllProductsInCart
  }
} = productSlice;

const productActions = {
  getAllProducts,
  getPromoProducts,
  getProductsByParams,
  getProductById,
  addProductInCart,
  deleteProductInCart,
  deleteAllProductsInCart,
};

export {
  productReducer,
  productActions,
}