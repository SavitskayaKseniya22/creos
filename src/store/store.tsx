import { configureStore } from "@reduxjs/toolkit";
import { creosApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [creosApi.reducerPath]: creosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(creosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
