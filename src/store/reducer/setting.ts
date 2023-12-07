import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAB } from 'constants/general';
import { SettingSliceType } from 'constants/interface';

const initialState: SettingSliceType = {
  currentTab: TAB.COURSES,
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
