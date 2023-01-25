import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CourseType, ErrorSliceType } from '../../utils/types';

const initialState: ErrorSliceType = {
  hasError: false,
  message: '',
};

export const errorSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateError: (
      state,
      {
        payload: { value, message },
      }: PayloadAction<{ value: boolean; message: string }>
    ) => {
      state.hasError = value;
      state.message = message;
    },
  },
});

export const { updateError } = errorSlice.actions;
export default errorSlice.reducer;
