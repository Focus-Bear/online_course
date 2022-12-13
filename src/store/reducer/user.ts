import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateProps } from '../../utils/types';
import _ from 'lodash';
import { initNewCourse } from '../../utils/constants';

const initialState: initialStateProps = {
  details: null,
  courses: [],
  newCourse: initNewCourse,
  isEditingCourse: false,
  isNewCourseOpened: false,
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
        position?: number;
        type: string;
        data: string;
      }>
    ) => {
      let course = _.clone(state.newCourse);
      if (type === 'name') {
        course.name = data;
      } else if (type === 'description') {
        course.description = data;
      } else {
        if (position !== undefined) {
          course.lessons.forEach((lesson, idx) => {
            if (idx === position) {
              switch (type) {
                case 'title':
                  lesson.title = data;
                  break;
                case 'content':
                  lesson.content = data;
                  break;
                case 'url':
                  lesson.url = data;
              }
            }
          });
        }
      }
      state.newCourse = course;
    },
    addNewLesson: (state) => {
      state.newCourse.lessons.push({
        title: '',
        content: '',
        url: '',
      });
    },
    saveCourse: (state, { payload }) => {
      state.courses.push({
        ...payload,
        author: state.details.fullname,
        created_at: new Date().toISOString(),
      });
      state.isNewCourseOpened = false;
      state.newCourse = initNewCourse;
    },
    updateCourse: (state) => {
      const index = state.courses.findIndex(
        (course) => course.id === state.newCourse.id
      );
      state.courses[index] = {
        ...state.newCourse,
        updated_at: new Date(),
      };
      state.isEditingCourse = false;
      state.newCourse = initNewCourse;
    },
    resetNewCourse: (state) => {
      state.isNewCourseOpened = false;
      state.newCourse = initNewCourse;
    },
    editCourseContent: (state, { payload }) => {
      state.newCourse = payload;
      state.isEditingCourse = true;
    },
    updateIsEditingCourse: (state, { payload }) => {
      state.isEditingCourse = payload;
    },
    updateIsNewCourseOpened: (state, { payload }) => {
      state.isNewCourseOpened = payload;
    },
  },
});

export const {
  updateUserDetails,
  addNewLesson,
  updateNewCourse,
  saveCourse,
  resetNewCourse,
  editCourseContent,
  updateIsEditingCourse,
  updateIsNewCourseOpened,
  updateCourse,
} = userSlice.actions;
export default userSlice.reducer;
