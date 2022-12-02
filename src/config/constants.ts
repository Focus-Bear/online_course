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
