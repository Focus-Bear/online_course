import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseSliceType, CourseType } from 'constants/interface';

const initialState: CourseSliceType = {
  courses: [],
  showCourseDetail: false,
  isEditingCourse: false,
  isNewCourseModalOpened: false,
  isLoading: false,
  error: {
    value: false,
    message: '',
  },
};

export const courseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCourses: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = payload;
    },
    updateCourse: (
      state,
      {
        payload,
      }: PayloadAction<{ course: CourseType; showCourseDetail: boolean }>
    ) => {
      state.course = payload.course;
      state.showCourseDetail = payload.showCourseDetail;
    },
    updateShowCourseDetail: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.showCourseDetail = payload;
    },
    updateIsEditingCourse: (state, { payload }) => {
      state.isEditingCourse = payload;
    },
    updateError: (
      state,
      { payload }: PayloadAction<{ value: boolean; message: string }>
    ) => {
      state.error = payload;
    },
    localAddLesson: (state, { payload }: PayloadAction<number>) => {
      state.courses[payload].lessons?.push({
        title: '',
        content: '',
        url: '',
      });
    },
  },
});

export const {
  updateCourse,
  updateIsEditingCourse,
  updateCourses,
  updateError,
  localAddLesson,
  updateShowCourseDetail,
} = courseSlice.actions;
export default courseSlice.reducer;
