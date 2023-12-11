import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateCourseLessons, updateCourses, updateError } from './course';
import { API_TAG, TOKEN_NAME } from 'constants/general';
import {
  CourseType,
  CreateCoursePayload,
  Lesson,
  UpdateLessonPayload,
} from 'constants/interface';
import Endpoint from 'constants/endpoints';
import { updateUserDetails } from './user';
import { toast } from 'react-toastify';

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
    getUserDetails: builder.query({
      query: () => Endpoint.USER_DETAILS,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserDetails(data));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) })
          );
        }
      },
    }),
    getAllCourse: builder.query<CourseType[], void>({
      query: () => Endpoint.GET_ALL_COURSES,
      providesTags: [API_TAG.ALL_COURSES],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCourses(data ?? []));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) })
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
      invalidatesTags: [API_TAG.ALL_COURSES],
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
      invalidatesTags: [API_TAG.ALL_COURSES],
    }),
    hideCourse: builder.mutation({
      query: (course_id) => ({
        url: Endpoint.HIDE_COURSE(course_id),
        method: 'PATCH',
      }),
      invalidatesTags: [API_TAG.ALL_COURSES],
    }),
    deleteCourse: builder.mutation({
      query: (course_id) => ({
        url: Endpoint.DELETE_COURSE(course_id),
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAG.ALL_COURSES],
    }),
    getAllCourseLessons: builder.query({
      query: (course_id: string) =>
        Endpoint.GET_ALL_COURSE_LESSONS(course_id),
      providesTags: [API_TAG.ALL_LESSONS],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCourseLessons(data ?? []));
        } catch (error) {
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) })
          );
        }
      },
    }),
    createCourseLessons: builder.mutation({
      query: (payload: { course_id: string; lessons: Lesson[] }) => ({
        url: Endpoint.CREATE_COURSE_LESSONS,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [API_TAG.ALL_LESSONS],
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status === 201
          ? toast.success('Lessons updated successfully!')
          : toast.error('Could not update lessons');
      },
    }),
    updateCourseLesson: builder.mutation({
      query: (payload: UpdateLessonPayload) => ({
        url: Endpoint.CREATE_COURSE_LESSONS,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [API_TAG.LESSON],
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        //  console.log(meta);
        meta?.response?.status === 201
          ? toast.success('Lesson updated successfully!')
          : toast.error('Could not update lesson');
      },
    }),
    createCourseRating: builder.mutation({
      query: (payload: { course_id: string; rating: number }) => ({
        url: Endpoint.CREATE_COURSE_RATING,
        method: 'POST',
        body: { ...payload, review: '' },
      }),
      invalidatesTags: [API_TAG.ALL_COURSES],
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { meta } = await queryFulfilled;
        meta?.response?.status === 201
          ? toast.success('Thank you for your feedback.')
          : toast.error('Could not process feedback');
      },
    }),
  }),
});

export const {
  useLazyGetUserDetailsQuery,
  useLazyGetAllCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useLazyGetAllCourseLessonsQuery,
  useCreateCourseLessonsMutation,
  useUpdateCourseLessonMutation,
  useDeleteCourseMutation,
  useHideCourseMutation,
  useCreateCourseRatingMutation,
} = API;
