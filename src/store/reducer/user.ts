import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from 'constants/interface';

const initialState: UserSliceType = {
  details: null,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, { payload }) => {
      state.details = payload;
    },
    updateIsAdmin: (state, { payload }: PayloadAction<boolean>) => {
      state.isAdmin = payload;
    },
  },
});

export const { updateUserDetails, updateIsAdmin } = userSlice.actions;
export default userSlice.reducer;
