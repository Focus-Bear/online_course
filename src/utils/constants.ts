import { v4 as uuid } from 'uuid';

export const initNewCourse = {
  id: uuid(),
  name: '',
  description: '',
  rate: 0,
  lessons: [
    {
      title: '',
      content: '',
      url: '',
    },
  ],
};

export const ENDPOINT = {
  GET_ALL_COURSES: 'course/get-all-course',
  GET_COURSE: 'course/get-course/',
  CREATE_COURSE: 'course/create-course',
};
