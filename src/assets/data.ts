export const DEFAULT_NEW_LESSON = {
  title: '',
  content: '',
  url: '',
};

export const DEFAULT_COURSE = {
  id: '',
  name: '',
  description: '',
  lessons: [],
};

export const DEFAULT_NEW_COURSE = {
  id: '',
  name: '',
  description: '',
  isNew: true,
};

export const DEFAULT_ADMIN_COURSE_META = {
  page: 1,
  take: 10,
  itemCount: 11,
  pageCount: 2,
  hasPreviousPage: false,
  hasNextPage: false,
};

export const DEFAULT_ERROR = {
  value: false,
  message: '',
};

export const DEFAULT_CONFIRM_MODAL = {
  isOpen: false,
  content: '',
  onConfirm: undefined,
};

export const DEFAULT_VIDEO_DURATION = {
  playedSeconds: 0,
  totalSeconds: 0,
};
