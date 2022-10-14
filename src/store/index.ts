import { configureStore } from "@reduxjs/toolkit";
import content from "./reducer/content";

export const store = configureStore({
  reducer: {
    content,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
