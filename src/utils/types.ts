export interface LessonProps {
  title: string;
  content: string;
  url: string;
}

export interface CourseProps {
  id: string;
  name: string;
  description: string;
  rate: number;
  lessons: LessonProps[];
  author?: string;
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

export interface InitialStateProps {
  details: UserDetails | null;
  courses: CourseProps[];
  newCourse: CourseProps;
  isEditingCourse: boolean;
  isNewCourseOpened: boolean;
  isLoading: boolean;
}
