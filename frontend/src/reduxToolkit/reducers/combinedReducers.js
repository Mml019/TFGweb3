import { combineReducers } from "redux";
import { questionSlice } from "../slices/questions";
import {quizSlice} from "../slices/quiz";

export const combinedReducers = combineReducers({
  questionReducer: questionSlice.reducer,
  quizReducer: quizSlice.reducer
});

export default combineReducers;
