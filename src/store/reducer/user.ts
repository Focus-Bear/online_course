import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceType } from '../../constant/interface';

const initialState: UserSliceType = {
  details: null,
  isLoading: false,
  isNewCourseModalOpened: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, { payload }) => {
      state.details = payload;
      state.isLoading = true;
    },
    updateIsNewCourseModalOpened: (state, { payload }) => {
      state.isNewCourseModalOpened = payload;
    },
    updateIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const {
  updateUserDetails,
  updateIsNewCourseModalOpened,
  updateIsLoading,
} = userSlice.actions;
export default userSlice.reducer;
