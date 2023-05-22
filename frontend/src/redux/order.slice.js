import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {orderService} from "../service";

const addOrder = createAsyncThunk(
  'orderSlice/createOrder',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await orderService.createOrder(data);
      console.log('addOrder', response.data);
      return response.data;
    } catch (e) {
      console.log('addOrder', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const getOrders = createAsyncThunk(
  'orderSlice/getOrders',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await orderService.getOrders();
      return data;
    } catch (e) {
      console.log('getOrders', e);
      return rejectWithValue(e.response.data?.message);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
});

const {reducer: orderReducer, actions} = orderSlice;

const orderActions = {
  ...actions,
  addOrder,
  getOrders,
};

export {
  orderReducer,
  orderActions,
}