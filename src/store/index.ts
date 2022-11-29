import { configureStore } from '@reduxjs/toolkit';
import content from './reducer/teach';
import user from './reducer/user';

export const store = configureStore({
  reducer: {
    content,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
