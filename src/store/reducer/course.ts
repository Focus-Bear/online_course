import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_ADMIN_COURSE_META,
  DEFAULT_COURSE,
  DEFAULT_ERROR,
  DEFAULT_NEW_COURSE,
  DEFAULT_NEW_LESSON,
} from 'assets/default';
import { CoursePlatform } from 'constants/enum';
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
  courseDetail: DEFAULT_COURSE,
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
  showCourseHighlights: false,
  courseHighlights: null,
};

export const courseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAdminCourses: (
      state,
      {
        payload,
      }: PayloadAction<{ data: CourseType[]; meta: AdminCourseMeta }>,
    ) => {
      if (state.adminCourses.data.length) {
        payload.data.forEach((course) => {
          const courseIndex = state.adminCourses.data.findIndex(
            (adminCourse) => adminCourse.id === course.id,
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
      }>,
    ) => {
      state.courseDetail = payload.course;
      state.showEnrolledCourseModal = Boolean(
        payload.showEnrolledCourseModal,
      );
      state.showCourseDetail = Boolean(payload.showCourseDetail);
      state.isNewCourseModalOpened = Boolean(
        payload.isNewCourseModalOpened,
      );
    },
    updateIsEditingCourse: (state, { payload }) => {
      state.isEditingCourse = payload;
    },
    updateError: (
      state,
      { payload }: PayloadAction<{ value: boolean; message: string }>,
    ) => {
      state.error = payload;
    },
    updateNewLesson: (state) => {
      state.courseDetail?.lessons?.push(DEFAULT_NEW_LESSON);
    },
    removeCourseLesson: (state, { payload }) => {
      if (state.courseDetail) {
        state.courseDetail.lessons = state.courseDetail?.lessons?.filter(
          (_, index) => payload !== index,
        );
      }
    },
    updateCourseLessons: (state, { payload }: PayloadAction<Lesson[]>) => {
      state.courseDetail.lessons = payload;
    },
    updateCourseDetails: (
      state,
      {
        payload: { position, value, course_feature },
      }: PayloadAction<{
        position: number;
        value: string;
        course_feature: string;
      }>,
    ) => {
      if (state.courseDetail.lessons?.length) {
        switch (course_feature) {
          case COURSE_FEATURE.TITLE:
            state.courseDetail.lessons[position].title = value;
            break;
          case COURSE_FEATURE.CONTENT:
            state.courseDetail.lessons[position].content = value;
            break;
          default:
            state.courseDetail.lessons[position].url = value;
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
        platform?: CoursePlatform;
      }>,
    ) => {
      state.newCourse = payload;
      state.isNewCourseModalOpened = true;
    },
    updateWhatToLearnCourses: (
      state,
      { payload }: PayloadAction<CourseType[]>,
    ) => {
      state.whatToLearnCourses = payload;
    },
    updateEnrolledCourses: (
      state,
      { payload }: PayloadAction<CourseType[]>,
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
      }>,
    ) => {
      state.reviews.course_id = course_id ?? '';
      state.reviews.ratings = ratings ?? [];
      state.reviews.isReviewsModalOpened = Boolean(isReviewsModalOpened);
      if (userRating) state.reviews.userRating = userRating;
    },
    updateShowCourseHighlights: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.showCourseHighlights = payload;
    },
    updateCourseHighlights: (
      state,
      { payload }: PayloadAction<CourseType | null>,
    ) => {
      state.courseHighlights = payload;
    },
    updateCourseHighlightsLessons: (
      state,
      { payload }: PayloadAction<Lesson[]>,
    ) => {
      if (state.courseHighlights) {
        state.courseHighlights['lessons'] = payload;
      }
    },
    updateCourseDetailLessons: (
      state,
      { payload }: PayloadAction<Lesson[]>,
    ) => {
      state.courseDetail.lessons = payload;
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
  updateShowCourseHighlights,
  updateCourseHighlights,
  updateCourseHighlightsLessons,
  updateCourseDetailLessons,
} = courseSlice.actions;
export default courseSlice.reducer;
