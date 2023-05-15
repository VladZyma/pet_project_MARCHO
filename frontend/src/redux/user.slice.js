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

const deleteUserById = createAsyncThunk(
  'userSlice/deleteUserById',
  async ({userId}, {rejectWithValue}) => {
    try {
      await userService.deleteUserById(userId);
    } catch (e) {
      console.log('deleteUserById', e);
      return rejectWithValue(e.response.data?.message);
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

const addProductToUserCart = createAsyncThunk(
  'userSlice/updateUserCartById',
  async ({userId, productId, selectedSize}, {rejectWithValue}) => {
    try {
      const {data} = await userService.updateUserCartById(userId, productId, selectedSize);
      console.log('updateUserCartDATA', data);
      return data;
    } catch (e) {
      console.log('updateUserCart', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const getProductsFromUserCart = createAsyncThunk(
  'userSlice/getProductsFromCart',
  async ({productsIdArr}, {rejectWithValue}) => {
    if (productsIdArr) {
      try {
        const {data} = await productService.getProductsFromCart(productsIdArr);
        console.log('getProductsFromUserCart', data);
        return data;
      } catch (e) {
        console.log('getProductsFromUserCart', e);
        return rejectWithValue(e.response.data?.message);
      }
    }
  }
);

const deleteProductFromUserCartById = createAsyncThunk(
  'userSlice/deleteProductFromUserCartById',
  async ({userId, productId}, {rejectWithValue}) => {
    try {
      await userService.deleteProductFromUserCartById(userId, productId);
      return productId;
    } catch (e) {
      console.log('deleteProductFromUserCartById', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const initialState = {
  user: {},
  wishlist: [],
  cart: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    clearUserInfoOnLogOut: (state, action) => {
      Object.assign(state.user, {});
    },
  },
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

      .addCase(addProductToUserCart.fulfilled, (state, action) => {
        state.user = {...action.payload};
        state.loading = false;
      })
      .addCase(addProductToUserCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProductToUserCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getProductsFromUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(getProductsFromUserCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductsFromUserCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deleteProductFromUserCartById.fulfilled, (state, action) => {
        const productIndex = state.user.cart.products.findIndex(productId => productId === action.payload);
        state.user.cart.products.splice(productIndex, 1);
        state.loading = false;
      })
      .addCase(deleteProductFromUserCartById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProductFromUserCartById.rejected, (state, action) => {
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

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.user = {};
        state.wishlist = [];
        state.loading = false;
      })
      .addCase(deleteUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
});

const {reducer: userReducer, actions: {clearUserInfoOnLogOut}} = userSlice;
const userActions = {
  clearUserInfoOnLogOut,
  updateUserWishList,
  getUserById,
  deleteUserById,
  addProductsToWishlist,
  deleteProductFromUserWishListById,
  addProductToUserCart,
  getProductsFromUserCart,
  deleteProductFromUserCartById,
};

export {
  userReducer,
  userActions,
}
