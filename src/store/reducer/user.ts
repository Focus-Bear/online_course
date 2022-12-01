import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { initialStateProps } from '../../utils/types';

const initialState: initialStateProps = {
  details: null,
  courses: [],
  newCourse: [
    {
      title: '',
      content: '',
      url: '',
    },
  ],
  newCourseLessons: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, { payload }) => {
      state.details = payload;
    },
    updateNewCourse: (
      state,
      {
        payload: { position, type, data },
      }: PayloadAction<{
        position: number;
        type: string;
        data: string;
      }>
    ) => {
      switch (type) {
        case 'title':
          state.newCourse[position].title = data;
          break;
        case 'content':
          state.newCourse[position].content = data;
          break;
        case 'url':
          state.newCourse[position].url = data;
      }
    },
    addNewLesson: (state) => {
      state.newCourse.push({
        title: '',
        content: '',
        url: '',
      });
      state.newCourseLessons++;
    },
  },
});

export const {
  updateUserDetails,
  addNewLesson,
  updateNewCourse,
} = userSlice.actions;
export default userSlice.reducer;
