export interface createCourse {
  name: string;
  description: string;
}

export interface LessonType {
  title: string;
  content: string;
  url: string;
}

export interface CourseType {
  id: string;
  author_id: string;
  name: string;
  description: string;
  rate: number;
  is_hidden: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  lessons?: Lesson[];
}

interface UserDetails {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  'https://api.focusbear.io/roles': [];
}

export interface Lesson {
  title: '';
  content: '';
  url: '';
}

export interface CourseSliceType {
  courses: CourseType[];
  isEditingCourse: boolean;
  isNewCourseModalOpened: boolean;
  isLoading: boolean;
  isCourseFetching: boolean;
  isCreatingCourse: boolean;
  error: {
    value: boolean;
    message: string;
  };
}

export interface ErrorSliceType {
  hasError: boolean;
  message: string;
}

export interface CreateCourseType {
  name: string;
  description: string;
}

export interface AccountType {
  auth0_id: string;
  email: string;
  name: string;
}

export interface UserSliceType {
  details: any;
  isLoading: boolean;
  isNewCourseModalOpened: boolean;
}
