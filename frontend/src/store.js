import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reduxToolkit/reducers/combinedReducers";

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.VITE_DEVTOOLS !== "production",
});

export default store;
