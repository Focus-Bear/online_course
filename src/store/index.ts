import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { API } from './reducer/api';
import type { PreloadedState } from '@reduxjs/toolkit';
import user from './reducer/user';

const rootReducer = combineReducers({
  [API.reducerPath]: API.reducer,
  user,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
