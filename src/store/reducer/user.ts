import { createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from 'constants/interface';

const initialState: UserSliceType = {
  details: null,
  isNewCourseModalOpened: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, { payload }) => {
      state.details = payload;
    },
    updateIsNewCourseModalOpened: (state, { payload }) => {
      state.isNewCourseModalOpened = payload;
    },
  },
});

export const { updateUserDetails, updateIsNewCourseModalOpened } =
  userSlice.actions;
export default userSlice.reducer;
