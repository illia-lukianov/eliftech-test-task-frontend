import { createSlice } from "@reduxjs/toolkit";
import { logOutUser } from "../auth/operations";
import { addFlowerToFavorite, deleteFlowerFromFavorite } from "../flowers/operations";
import { setPending, setRejected } from "../helpers/statusHandlers";
import { getUserInfo } from "./operations";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        setPending(state);
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.profile = null;
        setRejected(state, action);
      })
      .addCase(addFlowerToFavorite.fulfilled, (state, action) => {
        if (!state.profile) return;

        const id = action.payload._id;

        if (!state.profile?.favourites.includes(id)) {
          state.profile.favourites?.push(id);
        }
      })
      .addCase(deleteFlowerFromFavorite.fulfilled, (state, action) => {
        if (!state.profile) return;

        state.profile.favourites = state.profile.favourites.filter(
          (fav) => fav !== action.payload
        );
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.profile = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
