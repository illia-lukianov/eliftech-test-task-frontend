import { createSlice } from '@reduxjs/toolkit';
import { setPending, setRejected } from '../helpers/statusHandlers';
import { getFlowerDetails } from './operations';

const initialState = {
  flower: null,
  isLoading: false,
  error: null,
};

const flowerDetailsSlice = createSlice({
  name: 'flowerDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFlowerDetails.pending, state => {
        setPending(state);
      })
      .addCase(getFlowerDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flower = action.payload;
      })
      .addCase(getFlowerDetails.rejected, (state, action) => {
        state.flower = {};
        setRejected(state, action);
      });
  },
});

export default flowerDetailsSlice.reducer;
