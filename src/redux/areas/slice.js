import { createSlice } from '@reduxjs/toolkit';
import { getAreas } from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAreas.pending, state => {
        setPending(state);
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getAreas.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default areasSlice.reducer;
