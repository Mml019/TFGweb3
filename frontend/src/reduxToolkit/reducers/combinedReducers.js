import { combineReducers } from "redux";
import { questionSlice } from "../slices/questions";
import { quizSlice } from "../slices/quiz";
import { userSlice } from "../slices/user";

const combinedReducers = combineReducers({
  questionReducer: questionSlice.reducer,
  quizReducer: quizSlice.reducer,
  userReducer: userSlice.reducer,
});

export default combinedReducers;
