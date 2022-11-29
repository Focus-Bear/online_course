import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialStateProps } from '../../utils/types';

const initialState: initialStateProps[] = [
  {
    title: '',
    content: '',
    author: '',
    url: '',
  },
];

export const teachSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addNewContent: (state) => {
      state.push({
        title: '',
        content: '',
        author: '',
        url: '',
      });
    },
    updateContent: (
      state,
      {
        payload: { position, type, data },
      }: PayloadAction<{
        position: number;
        type: string;
        data: string;
      }>
    ) => {
      switch (type) {
        case 'title':
          state[position].title = data;
          break;
        case 'content':
          state[position].content = data;
          break;
        case 'url':
          state[position].url = data;
          break;
        case 'author':
          state[position].author = data;
      }
    },
  },
});

export const { addNewContent, updateContent } =
  teachSlice.actions;
export default teachSlice.reducer;
