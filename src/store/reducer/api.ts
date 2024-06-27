import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  removeCourseLesson,
  updateAdminCourses,
  updateCourseHighlightsLessons,
  updateCourseLessons,
  updateCourses,
  updateEnrolledCourses,
  updateError,
  updateReviews,
  updateWhatToLearnCourses,
} from './course';
import {
  API_TAG,
  COURSE_PER_PAGE,
  TOKEN_NAME,
  USER_TAB,
} from 'constants/general';
import {
  AddCourseReviewPayload,
  AdminCourseMeta,
  CourseType,
  CreateCoursePayload,
  GetAdminCoursesPayload,
  Rating,
  UpsertLessonsPayload,
} from 'constants/interface';
import Endpoint from 'constants/endpoints';
import { updateUserDetails } from './user';
import { toast } from 'react-toastify';
import { updateCurrentTab } from './setting';
import { DEFAULT_ADMIN_COURSE_META } from 'assets/default';
import { COURSE_LESSONS_OPTION, COURSE_ORDER } from 'constants/enum';
import { t } from 'i18next';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem(TOKEN_NAME);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(API_TAG),
  endpoints: (builder) => ({
    getUserDetails: builder.query<any, void>({
      query: () => Endpoint.USER_DETAILS,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserDetails(data));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    getAdminCourses: builder.query<
      { data: CourseType[]; meta: AdminCourseMeta },
      GetAdminCoursesPayload
    >({
      query: ({
        page,
        order = COURSE_ORDER.ASC,
        take = COURSE_PER_PAGE,
      }: GetAdminCoursesPayload) => ({
        url: Endpoint.GET_ADMIN_COURSES,
        params: {
          page,
          order,
          take,
        },
      }),
      providesTags: [API_TAG.ALL_COURSES],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateAdminCourses(
              data ?? { data: [], meta: DEFAULT_ADMIN_COURSE_META },
            ),
          );
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    createCourse: builder.mutation({
      query: (data: CreateCoursePayload) => ({
        url: Endpoint.CREATE_COURSE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [API_TAG.ALL_COURSES, API_TAG.USER_COURSES],
    }),
    updateCourse: builder.mutation({
      query: ({
        course_id,
        data,
      }: {
        course_id: string;
        data: CreateCoursePayload;
      }) => ({
        url: Endpoint.UPDATE_COURSE(course_id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [API_TAG.ALL_COURSES, API_TAG.USER_COURSES],
    }),
    hideCourse: builder.mutation({
      query: ({ course_id, should_hide }) => ({
        url: Endpoint.HIDE_COURSE(course_id),
        method: 'PATCH',
        body: { should_hide },
      }),
      invalidatesTags: [API_TAG.ALL_COURSES],
    }),
    deleteCourse: builder.mutation({
      query: ({ course_id, deleted }) => ({
        url: Endpoint.DELETE_COURSE(course_id),
        method: 'DELETE',
        body: { deleted },
      }),
      invalidatesTags: [API_TAG.ALL_COURSES],
    }),
    getAllCourseLessons: builder.query({
      query: ({
        course_id,
      }: {
        course_id: string;
        where?: COURSE_LESSONS_OPTION;
      }) => Endpoint.GET_ALL_COURSE_LESSONS(course_id),
      providesTags: [API_TAG.ALL_LESSONS],
      onQueryStarted: async (
        { where = COURSE_LESSONS_OPTION.COURSE_DETAILS },
        { dispatch, queryFulfilled },
      ) => {
        try {
          const { data } = await queryFulfilled;
          where === COURSE_LESSONS_OPTION.COURSE_DETAILS
            ? dispatch(updateCourseLessons(data ?? []))
            : dispatch(updateCourseHighlightsLessons(data ?? []));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    upsertCourseLessons: builder.mutation({
      query: (payload: UpsertLessonsPayload) => ({
        url: Endpoint.UPSERT_COURSE_LESSONS,
        method: 'PATCH',
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status === 200
          ? toast.success(t('success.lesson_successfully_updated'))
          : toast.error(t('error.couldnt_process_the_request'));
      },
    }),
    createCourseRating: builder.mutation({
      query: (payload: AddCourseReviewPayload) => ({
        url: Endpoint.CREATE_COURSE_RATING,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        API_TAG.COURSE_REVIEWS,
        API_TAG.USER_ENROLLED_COURSES,
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status === 201
          ? toast.success(t('success.thank_you_for_your_feedback'))
          : toast.error('error.couldnt_process_the_request');
      },
    }),
    getUserNotEnrolledCourses: builder.query<[], void>({
      query: () => Endpoint.USER_NOT_ENROLLED_COURSES,
      providesTags: [API_TAG.USER_NOT_ENROLLED_COURSES],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateWhatToLearnCourses(data ?? []));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    getUserCourses: builder.query<[], void>({
      query: () => Endpoint.USER_COURSES,
      providesTags: [API_TAG.USER_COURSES],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCourses(data ?? []));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    getUserEnrolledCourses: builder.query({
      query: () => Endpoint.USER_ENROLLED_COURSES,
      providesTags: [API_TAG.USER_ENROLLED_COURSES],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateEnrolledCourses(data));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
    createCourseEnrollment: builder.mutation({
      query: (course_id: string) => ({
        url: Endpoint.CREATE_COURSE_ENROLLMENT,
        method: 'POST',
        body: { course_id },
      }),
      invalidatesTags: [
        API_TAG.USER_NOT_ENROLLED_COURSES,
        API_TAG.USER_ENROLLED_COURSES,
      ],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { meta } = await queryFulfilled;
        if (meta?.response?.status === 201) {
          toast.success(
            t('success.you_have_successfully_enrolled_in_the_course'),
          );
          dispatch(updateCurrentTab(USER_TAB.ENROLLED_COURSES.tabIndex));
        } else {
          toast.error(t('error.couldnt_process_the_request'));
        }
      },
    }),
    createLessonCompeted: builder.mutation({
      query: (payload: { course_id: string; lesson_id: string }) => ({
        url: Endpoint.LESSON_COMPLETE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [API_TAG.USER_ENROLLED_COURSES],
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status !== 201 &&
          toast.error(t('error.couldnt_process_the_request'));
      },
    }),
    updateCourseEnrollment: builder.mutation({
      query: (payload: { course_id: string; finished: boolean }) => ({
        url: Endpoint.CREATE_COURSE_ENROLLMENT,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [API_TAG.USER_ENROLLED_COURSES],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status === 200
          ? toast.success(
              t('success.you_have_successfully_completed_the_course'),
            )
          : toast.error(t('error.couldnt_process_the_request'));
      },
    }),
    deleteCourseLesson: builder.mutation({
      query: ({
        course_id,
        lesson_id,
      }: {
        course_id: string;
        lesson_id: string;
        position: number;
      }) => ({
        url: Endpoint.UPSERT_COURSE_LESSONS,
        method: 'DELETE',
        body: { course_id, lesson_id },
      }),
      invalidatesTags: [API_TAG.ALL_LESSONS],
      onQueryStarted: async (
        { position },
        { queryFulfilled, dispatch },
      ) => {
        const { meta } = await queryFulfilled;
        if (meta?.response?.status === 200) {
          dispatch(removeCourseLesson(position));
          toast.success(t('success.lesson_deleted_successfully'));
        } else toast.error(t('error.couldnt_process_the_request'));
      },
    }),
    getCourseReviews: builder.query<Rating[], string>({
      query: (course_id: string) => Endpoint.GET_COURSE_RATINGS(course_id),
      providesTags: [API_TAG.COURSE_REVIEWS],
      onQueryStarted: async (course_id, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateReviews({
              ratings: data ?? [],
              isReviewsModalOpened: true,
              course_id,
            }),
          );
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) }),
          );
        }
      },
    }),
  }),
});

export const {
  useLazyGetUserDetailsQuery,
  useLazyGetAdminCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useLazyGetAllCourseLessonsQuery,
  useUpsertCourseLessonsMutation,
  useDeleteCourseMutation,
  useHideCourseMutation,
  useCreateCourseRatingMutation,
  useLazyGetUserNotEnrolledCoursesQuery,
  useLazyGetUserCoursesQuery,
  useLazyGetUserEnrolledCoursesQuery,
  useCreateCourseEnrollmentMutation,
  useCreateLessonCompetedMutation,
  useUpdateCourseEnrollmentMutation,
  useDeleteCourseLessonMutation,
  useLazyGetCourseReviewsQuery,
} = API;
