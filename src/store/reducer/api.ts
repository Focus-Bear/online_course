import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import {
  updateCourses,
  updateError,
  updateIsCourseFetching,
  updateIsCreatingCourse,
} from './course';
import { updateIsNewCourseModalOpened } from './user';
import { TOKEN_NAME } from '../../constant/general';
import { CourseType, CreateCourseType } from '../../constant/interface';
import Endpoint from '../../constant/endpoints';

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
  endpoints: (builder) => ({
    getAllCourse: builder.query<CourseType[], void>({
      query: () => Endpoint.GET_ALL_COURSES,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(updateIsCourseFetching(true));
          const res = await queryFulfilled;
          console.log(res);
          //dispatch(updateCourses(data));
          dispatch(updateIsCourseFetching(false));
        } catch (error) {
          console.log('error', error);
          dispatch(updateIsCourseFetching(false));
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) })
          );
        }
      },
    }),
    createCourse: builder.mutation({
      query: (data: CreateCourseType) => ({
        url: Endpoint.CREATE_COURSE,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(updateIsCreatingCourse(true));
          const res = await queryFulfilled;
          console.log(res);
          // if (meta?.response?.status === 201) {
          //   toast.success('Course created successfully');
          // } else {
          //   toast.error('Error, unable to create the course.');
          // }
          dispatch(updateIsCreatingCourse(false));
          dispatch(updateIsNewCourseModalOpened(false));
          // dispatch(useLazyGetAllCourseQuery())
        } catch (error) {
          toast.error('Error, unable to create the course.');
          dispatch(updateIsCreatingCourse(false));
          dispatch(
            updateError({ value: true, message: JSON.stringify(error) })
          );
        }
      },
    }),
  }),
});

export const { useLazyGetAllCourseQuery, useCreateCourseMutation } = API;
