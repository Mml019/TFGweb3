import { combineReducers } from "redux";
import  questionReducer  from "../slices/questions";
import  quizReducer  from "../slices/quiz";
import  userReducer  from "../slices/user";
import answerReducer from "../slices/answer"

// all the slices are with the reducer inherit

const rootReducer = combineReducers({
  questions: questionReducer,
  quiz: quizReducer,
  user: userReducer,
  answers : answerReducer,
});

export default rootReducer;
