import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {productService} from "../service";

const getAllAdminProducts = createAsyncThunk(
  'adminSlice/getProductsByParams',
  async ({page, values}, {rejectWithValue}) => {
    try {
      const {data} = await productService.getProductsByParams(page, values);
      return data;
    } catch (e) {
      console.log('getAllAdminProducts', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const addNewProduct = createAsyncThunk(
  'adminSlice/addProduct',
  async ({productInfo}, {rejectWithValue}) => {
    try {
      const {data} = await productService.addProduct(productInfo);
      console.log('addNewProduct', data);
      return data;
    } catch (e) {
      console.log('addNewProduct', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const addNewProductPhotoById = createAsyncThunk(
  'adminSlice/addProductPhotoById',
  async ({productId, formData, file}, {rejectWithValue}) => {
    try {
      const {data} = await productService.addProductPhotoById(productId, formData);
      console.log(data);
      return {data, file};
    } catch (e) {
      console.log('addNewProductPhotoById', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const updateProductById = createAsyncThunk(
  'adminSlice/updateProductById',
  async ({productId, productInfo}, {rejectWithValue}) => {
    try {
      const {data} = await productService.updateProductById(productId, productInfo);
      return data;
    } catch (e) {
      console.log('updateProductById', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const deleteProductById = createAsyncThunk(
  'adminSlice/deleteProductById',
  async ({productId}, {rejectWithValue}) => {
    try {
      await productService.deleteProductById(productId);
    } catch (e) {
      console.log('deleteProductById', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const initialState = {
  products: [],
  updatingProduct: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    setUpdatingProduct: (state, action) => {
      state.updatingProduct = state.products.products.find(product => product._id === action.payload);
    },
    deleteUpdatingProduct: (state, action) => {
      state.updatingProduct = null;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(getAllAdminProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getAllAdminProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllAdminProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(addNewProductPhotoById.fulfilled, (state, action) => {
        console.log('action.payload.file', action.payload.file);
        const productToAddPhoto = state.products.products.find(product => product._id === action.payload.data._id);
        Object.assign(productToAddPhoto, {...action.payload, photo: URL.createObjectURL(action.payload.file)});

        state.loading = false;
      })
      .addCase(addNewProductPhotoById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewProductPhotoById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateProductById.fulfilled, (state, action) => {
        const productToUpdate = state.products.products.find(product => product._id === action.payload._id);
        Object.assign(productToUpdate, action.payload);

        state.loading = false;
      })
      .addCase(updateProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deleteProductById.fulfilled, (state, action) => {
        const productIndex = state.products.products.findIndex(product => product._id === action.payload);
        state.products.products.splice(productIndex, 1);

        state.loading = false;
      })
      .addCase(deleteProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
});

const {reducer: adminReducer, actions: {setUpdatingProduct, deleteUpdatingProduct}} = adminSlice;
const adminActions = {
  setUpdatingProduct,
  deleteUpdatingProduct,
  getAllAdminProducts,
  addNewProduct,
  addNewProductPhotoById,
  updateProductById,
  deleteProductById,
};

export {
  adminReducer,
  adminActions,
}