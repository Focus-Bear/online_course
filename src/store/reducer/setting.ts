import { createSlice } from '@reduxjs/toolkit';
import { USER_TAB } from 'constants/general';
import { SettingSliceType } from 'constants/interface';

const initialState: SettingSliceType = {
  currentTab: USER_TAB.WHAT_TO_LEARN_NEXT.tabIndex,
};

export const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
  },
});

export const { updateCurrentTab } = setting.actions;
export default setting.reducer;
