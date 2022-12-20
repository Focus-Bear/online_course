import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINT } from '../../utils/constants';
import { CourseProps } from '../../utils/types';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCourse: builder.query<CourseProps[], void>({
      query: () => ENDPOINT.GET_ALL_COURSES,
    }),
    getCourse: builder.query<CourseProps, string>({
      query: (course_id: string) => ENDPOINT.GET_COURSE + course_id,
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: ENDPOINT.GET_COURSE,
        method: 'POST',
        body: course,
      }),
    }),
  }),
});

export const { useGetAllCourseQuery, useGetCourseQuery } = API;
