import './assets/styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Navigate, useNavigate} from 'react-router-dom';


import StartQuiz from  './containers/pages/users/StartQuiz'
import UserForm  from './containers/pages/users/UserForm'
import UserQuiz  from './containers/pages/users/UserQuiz'
import UserResult from './containers/pages/users/UserResult'
// if i use export direct into funtion statement (exportación nombrada) 
// with {} and the component name equal funtion name
//import {AdminForm} from './containers/AdminForm'

// if i use export default function (exportación por defecto)
// without {} and we could change the name
import AdminForm from './containers/pages/admin/AdminForm'
import Questions from './containers/pages/admin/Questions'
import Users from './containers/pages/admin/Users'
import Results from './containers/pages/admin/Results' 

export function UseNavigation(destino){
  const navigate = useNavigate()
  navigate({destino})
}


function App() {
  const pathAdmin = 'quizAdmin'
  const pathUser = 'quiz'

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to='quiz/' replace></Navigate>}/>
        <Route path='quiz/' element={<StartQuiz/>} />

        <Route path='quiz-admin/' element={<AdminForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
