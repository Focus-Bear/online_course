const Endpoint = {
  USER_DETAILS: 'user/details',
  GET_ADMIN_COURSES: 'course/admin',
  CREATE_COURSE: 'course',
  UPDATE_COURSE: (course_id: string) => `course/${course_id}`,
  DELETE_COURSE: (course_id: string) => `course/${course_id}`,
  HIDE_COURSE: (course_id: string) => `course/${course_id}/hide`,
  GET_ALL_COURSE_LESSONS: (course_id: string) => `lesson/${course_id}`,
  CREATE_COURSE_LESSONS: 'lesson',
  CREATE_COURSE_RATING: 'course/rating',
  USER_NOT_ENROLLED_COURSES: 'course/user-not-enrolled',
  USER_COURSES: 'course/user',
  USER_ENROLLED_COURSES: 'course/enrolled',
  CREATE_COURSE_ENROLLMENT: 'course/enrolled',
  LESSON_COMPLETE: 'lesson/complete',
};

export default Endpoint;
