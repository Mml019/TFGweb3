import { combineReducers } from "redux";
import  questionReducer  from "../slices/questions";
import  quizReducer  from "../slices/quiz";
import  userReducer  from "../slices/user";

// all the slices are with the reducer inherit

const rootReducer = combineReducers({
  questionReducer: questionReducer,
  quizReducer: quizReducer,
  userReducer: userReducer,
});

export default rootReducer;
