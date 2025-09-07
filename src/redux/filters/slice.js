import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  area: [],
  categories: [],
  sortBy: '',
  sortOrder: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchQuery(state, action) {
      state.searchQuery = action.payload?.trim();
    },
    changeSearchCategories(state, action) {
      state.categories = action.payload;
    },
    changeSearchAreas(state, action) {
      state.area = action.payload;
    },
    changeSortParams(state, action) {
      state.sortBy = action.payload?.sortBy;
      state.sortOrder = action.payload?.sortOrder;
    },
    clearFilters(state) {
      state.categories = [];
      state.area = [];
    },
    clearSearchQuery(state) {
      state.searchQuery = '';
    },
    clearSortParams(state) {
      state.sortBy = '';
      state.sortOrder = '';
    },
    resetAllSearchParams(state) {
      state.categories = [];
      state.area = [];
      state.searchQuery = '';
      state.sortBy = '';
      state.sortOrder = '';
    },
  },
});

export default filtersSlice.reducer;

export const {
  changeSearchQuery,
  changeSearchCategories,
  changeSearchAreas,
  changeSortParams,
  clearFilters,
  clearSearchQuery,
  clearSortParams,
  resetAllSearchParams,
} = filtersSlice.actions;
