import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null,
  },
  reducers: {
    updateUserDetails: (state, { payload }) => {
      state.details = payload;
    },
  },
});

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
