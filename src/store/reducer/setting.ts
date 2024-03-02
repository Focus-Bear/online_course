import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CONFIRM_MODEL } from 'assets/default';
import { Language } from 'constants/enum';
import { DEFAULT_COURSE_PAGE, USER_TAB } from 'constants/general';
import { SettingSliceType } from 'constants/interface';

const initialState: SettingSliceType = {
  currentTab: USER_TAB.WHAT_TO_LEARN_NEXT.tabIndex,
  currentPage: DEFAULT_COURSE_PAGE,
  confirmModal: DEFAULT_CONFIRM_MODEL,
  currentLanguage: Language.EN,
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
    updateConfirmModal: (state, { payload }) => {
      state.confirmModal = payload;
    },
    updateCurrentLanguage: (
      state,
      { payload }: PayloadAction<Language>,
    ) => {
      state.currentLanguage = payload;
    },
  },
});

export const {
  updateCurrentTab,
  updateCurrentPage,
  updateConfirmModal,
  updateCurrentLanguage,
} = setting.actions;
export default setting.reducer;
