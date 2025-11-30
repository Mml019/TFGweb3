import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reduxToolkit/reducers/combinedReducers";
import questionReducer from "./reduxToolkit/slices/questions";
import quizReducer from "./reduxToolkit/slices/quiz";
import userReducer from "./reduxToolkit/slices/user";
import answerReducer from './reduxToolkit/slices/answer'

export const store = configureStore({
  reducer: {question: questionReducer,
    quiz: quizReducer,
    user: userReducer,
  answers: answerReducer},
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //devTools: import.meta.env.VITE_DEVTOOLS !== "production",
});

export default store;
