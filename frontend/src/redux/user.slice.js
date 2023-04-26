import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {userService, productService} from "../service";

const getUserById = createAsyncThunk(
    'userSlice/findUserById',
    async ({userId}, {rejectWithValue}) => {
      try {
        const {data} = await userService.findUserById(userId);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const addProductsToWishlist = createAsyncThunk(
    'userSlice/getProductsFromWishlist',
    async ({productsIdArr}, {rejectWithValue}) => {
      try {
        const {data} = await productService.getProductsFromWishlist(productsIdArr);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const updateUserWishList = createAsyncThunk(
    'userSlice/updateUserWishListById',
    async ({userId, productId}, {rejectWithValue}) => {
      try {
        const {data} = await userService.updateUserWishListById(userId, productId);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const deleteProductFromUserWishListById = createAsyncThunk(
    'userSlice/deleteProductFromUserWishListById',
    async ({userId, productId}, {rejectWithValue}) => {
      try {
        await userService.deleteProductFromUserWishListById(userId, productId);
        return productId;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const initialState = {
  user: {},
  wishlist: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: builder =>
      builder
          .addCase(addProductsToWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload;
            state.loading = false;
          })
          .addCase(addProductsToWishlist.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(addProductsToWishlist.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })

          .addCase(updateUserWishList.fulfilled, (state, action) => {
            state.user = {...action.payload};
            state.loading = false;
          })
          .addCase(updateUserWishList.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(updateUserWishList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })

          .addCase(deleteProductFromUserWishListById.fulfilled, (state, action) => {
            const productIndex = state.wishlist.findIndex(product => product._id === action.payload);
            const productIndexInUserState = state.user.wishlist.findIndex(product => product === action.payload);

            state.wishlist.splice(productIndex, 1);
            state.user.wishlist.splice(productIndexInUserState, 1);

            state.loading = false;
          })
          .addCase(deleteProductFromUserWishListById.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(deleteProductFromUserWishListById.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })

          .addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
          })
          .addCase(getUserById.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getUserById.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })
});

const {reducer: userReducer, actions: {}} = userSlice;
const userActions = {
  updateUserWishList,
  getUserById,
  addProductsToWishlist,
  deleteProductFromUserWishListById,
};

export {
  userReducer,
  userActions,
}
