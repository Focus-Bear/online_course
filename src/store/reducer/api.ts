import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { ENDPOINT } from '../../utils/constants';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ENDPOINT.GET_ALL_COURSES,
    }),
    getCourse: builder.query({
      query: (course_id) => ENDPOINT.GET_COURSE + course_id,
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

export const { useGetAllCourseQuery, useLazyGetCourseQuery } = API;
