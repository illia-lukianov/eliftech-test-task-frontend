import { createSlice } from '@reduxjs/toolkit';
import {
  addFlowerToFavorite,
  deleteFlowerFromFavorite,
  getAllFlowers,
  getFavoriteFlowers,
} from './operations';
import {
  resetPaginationArray,
  setListPending,
  setListRejected,
  setOperationPending,
  setOperationRejected,
  setPaginationArrayRejected,
} from '../helpers/statusHandlers';
import { logOutUser } from '../auth/operations';

const initialState = {
  all: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
  favorite: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
  operationLoading: false,
  operationError: null,
  listLoading: false,
  listError: null,
};

const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllFlowers.pending, state => {
        setListPending(state);
      })
      .addCase(getAllFlowers.fulfilled, (state, action) => {
        state.listLoading = false;
        state.all.items = action.payload.items;
        state.all.hasPreviousPage = action.payload.hasPreviousPage;
        state.all.hasNextPage = action.payload.hasNextPage;
        state.all.page = action.payload.page;
        state.all.totalPages = action.payload.totalPages;
        state.all.totalItems = action.payload.totalItems;
      })
      .addCase(getAllFlowers.rejected, (state, action) => {
        setPaginationArrayRejected(state.all);
        setListRejected(state, action);
      })
      .addCase(getFavoriteFlowers.pending, state => {
        setListPending(state);
      })
      .addCase(getFavoriteFlowers.fulfilled, (state, action) => {
        state.listLoading = false;
        state.favorite.items = action.payload.items;
        state.favorite.hasPreviousPage = action.payload.hasPreviousPage;
        state.favorite.hasNextPage = action.payload.hasNextPage;
        state.favorite.page = action.payload.page;
        state.favorite.totalPages = action.payload.totalPages;
        state.favorite.totalItems = action.payload.totalItems;
      })
      .addCase(getFavoriteFlowers.rejected, (state, action) => {
        setPaginationArrayRejected(state.favorite);
        setListRejected(state, action);
      })
      .addCase(addFlowerToFavorite.pending, state => {
        setOperationPending(state);
      })
      .addCase(addFlowerToFavorite.fulfilled, state => {
        state.operationLoading = false;
      })
      .addCase(addFlowerToFavorite.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(deleteFlowerFromFavorite.pending, state => {
        setOperationPending(state);
      })
      .addCase(deleteFlowerFromFavorite.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.favorite.items = state.favorite.items.filter(
          ({ _id }) => _id !== action.payload
        );
        if (state.favorite.totalItems > 0) {
          state.favorite.totalItems -= 1;
        }
      })
      .addCase(deleteFlowerFromFavorite.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(logOutUser.fulfilled, state => {
        resetPaginationArray(state.favorite);
      });
  },
});

export default flowersSlice.reducer;
