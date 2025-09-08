import { createSlice } from '@reduxjs/toolkit';
import { setPending, setRejected } from '../helpers/statusHandlers';
import { getOrders, postOrders } from './operations';

const initialState = {
  items: [],
  totalOrders: 0,
  currentOrder: null,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        setPending(state);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.items = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(postOrders.pending, (state) => {
        setPending(state);
      })
      .addCase(postOrders.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.totalOrders += 1;
        state.currentOrder = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postOrders.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default ordersSlice.reducer;