export interface lessonProps {
  title: string;
  content: string;
  url: string;
}

export interface courseProps {
  id: string;
  name: string;
  description: string;
  rate: number;
  lessons: lessonProps[];
  author?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface initialStateProps {
  details: any;
  courses: courseProps[];
  newCourse: courseProps;
  isEditingCourse: boolean;
  isNewCourseOpened: boolean;
}
