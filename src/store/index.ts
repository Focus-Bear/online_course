import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { API } from './reducer/api';
import type { PreloadedState } from '@reduxjs/toolkit';
import { errorLogger } from './middleware/errorLogger';
import user from './reducer/user';
import course from './reducer/course';
import error from './reducer/error';

const rootReducer = combineReducers({
  [API.reducerPath]: API.reducer,
  user,
  course,
  error,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware).concat(errorLogger),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
