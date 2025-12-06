import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

import StartQuiz from "./containers/pages/users/StartQuiz";
import UserForm from "./containers/pages/users/UserForm";
import UserQuiz from "./containers/pages/users/UserQuiz";
import UserResult from "./containers/pages/users/UserResult";
import EticCondition from "./containers/pages/users/EticCondition";
import Instructions from "./containers/pages/users/Instructions";
import Congratulations from "./containers/pages/users/Congratulations";
import handleOnChange from "../src/containers/pages/users/StartQuiz";
// if i use export direct into funtion statement (exportación nombrada)
// with {} and the component name equal funtion name
//import {AdminForm} from './containers/AdminForm'

// if i use export default function (exportación por defecto)
// without {} and we could change the name
import AdminPage from "./containers/pages/admin/AdminPage";
import AdminForm from "./containers/pages/admin/AdminForm";
import Questions from "./containers/pages/admin/Questions";
import Users from "./containers/pages/admin/Users";
import Results from "./containers/pages/admin/Results";

import Error404 from "./containers/pages/Error404";
import ErrorTimeoutBadR from "./containers/pages/ErrorTimeoutBadR";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/quiz" replace></Navigate>} />
          <Route path="/quiz" element={<StartQuiz />} />
          <Route path="/quiz/conditions/etic/" element={<EticCondition />} />
          <Route
            path="/quiz/conditions/instructions/"
            element={<Instructions />}
          />
          <Route path="/quiz/form/" element={<UserForm />} />
          <Route path="/quiz/questions/" element={<UserQuiz/>} />
          <Route path="/quiz/results/" element={<UserResult />} />
          <Route path="/quiz/congratulations/" element={<Congratulations />} />       
          <Route path="/quiz/time-out-response/" element={<ErrorTimeoutBadR/>} />   
          {/* <Route path='quiz-admin/' element={<AdminPage/>} /> */}
          <Route path="/quiz/error/" element={<Error404 error={"No existe la url a la que se dirige"}/>} />
          <Route path="*" element={<Error404 error={"No existe la url a la que se dirige"}/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
