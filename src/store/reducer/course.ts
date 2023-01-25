import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CourseType, CourseSliceType } from '../../utils/types';

const initialState: CourseSliceType = {
  courses: [],
  isEditingCourse: false,
  isNewCourseModalOpened: false,
  isLoading: false,
  isCourseFetching: false,
  isCreatingCourse: false,
  error: {
    value: false,
    message: '',
  },
};

export const courseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCourse: (state, { payload }) => {
      // state.courses = [...payload];
      //state.isNewCourseOpened = false;
      // state.newCourse = initNewCourse;
    },
    updateCourses: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = [...state.courses, ...payload];
      state.isCourseFetching = false;
    },
    editCourseContent: (state, { payload }) => {
      // state.newCourse = payload;
      state.isEditingCourse = true;
    },
    updateIsEditingCourse: (state, { payload }) => {
      state.isEditingCourse = payload;
    },
    updateIsCourseFetching: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isCourseFetching = payload;
    },
    updateIsCreatingCourse: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isCreatingCourse = payload;
    },
    updateError: (
      state,
      { payload }: PayloadAction<{ value: boolean; message: string }>
    ) => {
      state.error = payload;
    },
    localCreateCourse: (state, { payload }) => {
      state.courses.push(payload);
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
  saveCourse,
  editCourseContent,
  updateIsEditingCourse,
  updateCourses,
  updateIsCourseFetching,
  updateIsCreatingCourse,
  updateError,
  localCreateCourse,
  localAddLesson,
} = courseSlice.actions;
export default courseSlice.reducer;
