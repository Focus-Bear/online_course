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
  author_id?: string;
  name: string;
  description: string;
  rate?: number;
  is_hidden?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lessons: Lesson[];
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
  id?: string;
  title: string;
  content: string;
  url: string;
}

export interface CourseSliceType {
  courses: CourseType[];
  showCourseDetail: boolean;
  isEditingCourse: boolean;
  isNewCourseModalOpened: boolean;
  isLoading: boolean;
  error: {
    value: boolean;
    message: string;
  };
  course: CourseType;
  newCourse: {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
  };
}

export interface ErrorSliceType {
  hasError: boolean;
  message: string;
}

export interface CreateCoursePayload {
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
  isNewCourseModalOpened: boolean;
}

export interface SettingSliceType {
  currentTab: string;
}

export interface IconProps {
  style?: string;
  fill?: string;
}

export interface UpdateLessonPayload {
  course_id: string;
  lesson_id: string;
  title: string;
  content: string;
  url: string;
}
