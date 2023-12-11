const Endpoint = {
  USER_DETAILS: 'user/details',
  GET_ALL_COURSES: 'course',
  CREATE_COURSE: 'course',
  UPDATE_COURSE: (course_id: string) => `course/${course_id}`,
  DELETE_COURSE: (course_id: string) => `course/${course_id}`,
  HIDE_COURSE: (course_id: string) => `course/${course_id}/hide`,
  GET_ALL_COURSE_LESSONS: (course_id: string) => `lesson/${course_id}`,
  CREATE_COURSE_LESSONS: 'lesson',
  CREATE_COURSE_RATING: 'course/rating',
};

export default Endpoint;
