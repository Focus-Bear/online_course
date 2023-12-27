import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // console.warn(action);
    return next(action);
  };
