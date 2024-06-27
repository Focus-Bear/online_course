export const TOKEN_NAME = 'token';

export const ADMIN_TAB = {
  COURSES: { title: 'tabs.courses', tabIndex: 0 },
  CONFIGURATION: { title: 'tabs.configuration', tabIndex: 2 },
};

export const USER_TAB = {
  WHAT_TO_LEARN_NEXT: { title: 'tabs.what_to_learn_next', tabIndex: 0 },
  ENROLLED_COURSES: { title: 'tabs.enrolled_courses', tabIndex: 1 },
  MY_COURSES: { title: 'tabs.my_courses', tabIndex: 2 },
};

export const API_TAG = {
  USER_DETAILS: 'user-details',
  ALL_COURSES: 'all-courses',
  ALL_LESSONS: 'all-lessons',
  USER_NOT_ENROLLED_COURSES: 'user-not-enrolled-courses',
  USER_COURSES: 'user-courses',
  USER_ENROLLED_COURSES: 'user-enrolled-courses',
  COURSE_REVIEWS: 'course-reviews',
};

export const NUMBER_OF_STARS = 5;

export const EMPTY_TEXT_EDITOR = '<p></p>';
export const COURSE_FEATURE = {
  TITLE: 'title',
  CONTENT: 'content',
  URL: 'url',
};

export const MODAL_TYPE = {
  ENROLLED_COURSE: 'enrolled-course',
  NEW_COURSE: 'new-course',
  COURSE_DETAILS: 'course-details',
  REVIEWS: 'reviews',
  CONFIRM: 'confirm',
  COURSE_HIGHLIGHT: 'course-highlight',
};

export const COURSE_FIRST_LESSON_INDEX = 0;
export const FIRST_LESSON_INDEX = 0;
export const FIRST_LESSON_OFFSET = -1;
export const ITEM_NOT_FOUND = -1;
export const COURSE_PER_PAGE = 10;
export const DEFAULT_COURSE_PAGE = 1;
export const NUMBER_OF_EMPTY_ITEMS = 0;

//@Description: additional info can be found => https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
export const TEXT_EDITOR = {
  TOOLBAR: {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'history',
    ],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'monospace',
        'superscript',
        'subscript',
      ],
    },
    blockType: {
      inDropdown: true,
      options: [
        'Normal',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'Blockquote',
        'Code',
      ],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    fontFamily: {
      options: [
        'Arial',
        'Georgia',
        'Impact',
        'Tahoma',
        'Times New Roman',
        'Verdana',
      ],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    list: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['unordered', 'ordered', 'indent', 'outdent'],
    },
    textAlign: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['left', 'center', 'right', 'justify'],
    },
    colorPicker: {
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      colors: [
        'rgb(97,189,109)',
        'rgb(26,188,156)',
        'rgb(84,172,210)',
        'rgb(44,130,201)',
        'rgb(147,101,184)',
        'rgb(71,85,119)',
        'rgb(204,204,204)',
        'rgb(65,168,95)',
        'rgb(0,168,133)',
        'rgb(61,142,185)',
        'rgb(41,105,176)',
        'rgb(85,57,130)',
        'rgb(40,50,78)',
        'rgb(0,0,0)',
        'rgb(247,218,100)',
        'rgb(251,160,38)',
        'rgb(235,107,86)',
        'rgb(226,80,65)',
        'rgb(163,143,132)',
        'rgb(239,239,239)',
        'rgb(255,255,255)',
        'rgb(250,197,28)',
        'rgb(243,121,52)',
        'rgb(209,72,65)',
        'rgb(184,49,47)',
        'rgb(124,112,107)',
        'rgb(209,213,216)',
      ],
    },
    link: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      dropdownClassName: undefined,
      showOpenOptionOnHover: true,
      defaultTargetOption: '_self',
      options: ['link', 'unlink'],
    },
    history: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['undo', 'redo'],
    },
  },
};

export const DragTypes = {
  LESSON: 'lesson',
};
