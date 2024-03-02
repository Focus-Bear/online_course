import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_ADMIN_COURSE_META,
  DEFAULT_COURSE,
  DEFAULT_ERROR,
  DEFAULT_NEW_COURSE,
  DEFAULT_NEW_LESSON,
} from 'assets/default';
import { COURSE_FEATURE, ITEM_NOT_FOUND } from 'constants/general';
import {
  AdminCourseMeta,
  CourseSliceType,
  CourseType,
  Lesson,
  Rating,
} from 'constants/interface';

const initialState: CourseSliceType = {
  adminCourses: {
    data: [],
    meta: DEFAULT_ADMIN_COURSE_META,
  },
  courses: [],
  whatToLearnCourses: [],
  enrolledCourses: [],
  showCourseDetail: false,
  isEditingCourse: false,
  isNewCourseModalOpened: false,
  isLoading: false,
  error: DEFAULT_ERROR,
  course: DEFAULT_COURSE,
  newCourse: DEFAULT_NEW_COURSE,
  showEnrolledCourseModal: false,
  reviews: {
    ratings: [],
    isReviewsModalOpened: false,
    course_id: '',
    userRating: {
      course_id: '',
      review: '',
      rating: 0,
    },
  },
};

export const courseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAdminCourses: (
      state,
      {
        payload,
      }: PayloadAction<{ data: CourseType[]; meta: AdminCourseMeta }>
    ) => {
      if (state.adminCourses.data.length) {
        payload.data.forEach((course) => {
          const courseIndex = state.adminCourses.data.findIndex(
            (adminCourse) => adminCourse.id === course.id
          );
          courseIndex === ITEM_NOT_FOUND
            ? state.adminCourses.data.push(course)
            : (state.adminCourses.data[courseIndex] = course);
        });
      } else {
        state.adminCourses.data.push(...payload.data);
      }
      state.adminCourses.meta = payload.meta;
    },
    updateCourses: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = payload;
    },
    updateCourse: (
      state,
      {
        payload,
      }: PayloadAction<{
        course: CourseType;
        showCourseDetail?: boolean;
        showEnrolledCourseModal?: boolean;
        isNewCourseModalOpened?: boolean;
      }>
    ) => {
      state.course = payload.course;
      state.showEnrolledCourseModal = Boolean(
        payload.showEnrolledCourseModal
      );
      state.showCourseDetail = Boolean(payload.showCourseDetail);
      state.isNewCourseModalOpened = Boolean(
        payload.isNewCourseModalOpened
      );
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
    updateNewLesson: (state) => {
      state.course?.lessons?.push(DEFAULT_NEW_LESSON);
    },
    removeCourseLesson: (state, { payload }) => {
      if (state.course) {
        state.course.lessons = state.course?.lessons?.filter(
          (_, index) => payload !== index
        );
      }
    },
    updateCourseLessons: (state, { payload }: PayloadAction<Lesson[]>) => {
      state.course.lessons = payload;
    },
    updateCourseDetails: (
      state,
      {
        payload: { position, value, course_feature },
      }: PayloadAction<{
        position: number;
        value: string;
        course_feature: string;
      }>
    ) => {
      if (state.course.lessons?.length) {
        switch (course_feature) {
          case COURSE_FEATURE.TITLE:
            state.course.lessons[position].title = value;
            break;
          case COURSE_FEATURE.CONTENT:
            state.course.lessons[position].content = value;
            break;
          default:
            state.course.lessons[position].url = value;
        }
      }
    },
    updateNewCourse: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        name: string;
        description: string;
        isNew: boolean;
      }>
    ) => {
      state.newCourse = payload;
      state.isNewCourseModalOpened = true;
    },
    updateWhatToLearnCourses: (
      state,
      { payload }: PayloadAction<CourseType[]>
    ) => {
      state.whatToLearnCourses = payload;
    },
    updateEnrolledCourses: (
      state,
      { payload }: PayloadAction<CourseType[]>
    ) => {
      state.enrolledCourses = payload;
    },
    updateReviews: (
      state,
      {
        payload: { ratings, isReviewsModalOpened, course_id, userRating },
      }: PayloadAction<{
        userRating?: Rating;
        ratings?: Rating[];
        isReviewsModalOpened?: boolean;
        course_id?: string;
      }>
    ) => {
      state.reviews.course_id = course_id ?? '';
      state.reviews.ratings = ratings ?? [];
      state.reviews.isReviewsModalOpened = Boolean(isReviewsModalOpened);
      if (userRating) state.reviews.userRating = userRating;
    },
  },
});

export const {
  updateCourse,
  updateIsEditingCourse,
  updateCourses,
  updateError,
  updateNewLesson,
  removeCourseLesson,
  updateCourseDetails,
  updateCourseLessons,
  updateNewCourse,
  updateWhatToLearnCourses,
  updateEnrolledCourses,
  updateAdminCourses,
  updateReviews,
} = courseSlice.actions;
export default courseSlice.reducer;
