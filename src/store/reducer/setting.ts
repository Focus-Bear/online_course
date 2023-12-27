import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_COURSE_PAGE, USER_TAB } from 'constants/general';
import { SettingSliceType } from 'constants/interface';

const initialState: SettingSliceType = {
  currentTab: USER_TAB.WHAT_TO_LEARN_NEXT.tabIndex,
  currentPage: DEFAULT_COURSE_PAGE,
};

export const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    updateCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
  },
});

export const { updateCurrentTab, updateCurrentPage } = setting.actions;
export default setting.reducer;
