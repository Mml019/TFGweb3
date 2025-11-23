import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reduxToolkit/reducers/combinedReducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.VITE_DEVTOOLS !== "production",
});

export default store;
