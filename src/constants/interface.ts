import {
  COURSE_ORDER,
  CoursePlatform,
  Language,
  LessonCompletionStatus,
  UserTypes,
} from './enum';

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
  is_hidden?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lessons: Lesson[];
  ratings?: Rating[];
  lessonCompletions?: LessonCompletion[];
  enrollments?: Enrollment[];
  author?: {
    username?: string;
  };
}

export interface Rating {
  id?: string;
  user_id?: string;
  course_id: string;
  rating: number;
  review: string;
  created_at?: Date;
  updated_at?: Date;
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
  adminCourses: { data: CourseType[]; meta: AdminCourseMeta };
  courses: CourseType[];
  whatToLearnCourses: CourseType[];
  enrolledCourses: CourseType[];
  showCourseDetail: boolean;
  isEditingCourse: boolean;
  isNewCourseModalOpened: boolean;
  isLoading: boolean;
  error: {
    value: boolean;
    message: string;
  };
  courseDetail: CourseType;
  newCourse: {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
    platform?: CoursePlatform;
  };
  showEnrolledCourseModal: boolean;
  reviews: {
    ratings: Rating[];
    isReviewsModalOpened: boolean;
    course_id: string;
    userRating: Rating;
  };
  showCourseHighlights: boolean;
  courseHighlights: CourseType | null;
}

export interface ErrorSliceType {
  hasError: boolean;
  message: string;
}

export interface CreateCoursePayload {
  name: string;
  description: string;
  platform?: string;
}

export interface AccountType {
  auth0_id: string;
  email: string;
  name: string;
}

export interface UserSliceType {
  details: UserInfo | null;
  isAdmin: boolean;
}

export interface SettingSliceType {
  currentTab: number;
  currentPage: number;
  confirmModal: {
    isOpen: boolean;
    content: string;
    onConfirm?: () => void;
  };
  currentLanguage: Language;
}

export interface IconProps {
  style?: string;
  fill?: string;
}

export interface UpsertLessonsPayload {
  course_id: string;
  lessons: Lesson[];
}

export interface LessonCompletion {
  id: string;
  lesson_id: string;
  course_id: string;
  created_at: string;
  updated_at: string;
  status: LessonCompletionStatus;
}

export interface Enrollment {
  user_id: string;
  course_id: string;
  finished: boolean;
}

export interface AdminCourseMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetAdminCoursesPayload {
  page: number;
  order?: COURSE_ORDER;
  take?: number;
}

export interface AddCourseReviewPayload {
  id?: string;
  rating: number;
  course_id: string;
  review: string;
}

export interface UserInfo {
  id: string;
  stripe_customer_id?: string;
  profitwell_id?: string;
  profitwell_registration_date?: string;
  auth0_id?: string;
  user_type?: UserTypes;
}
