import {useNavigate} from 'react-router-dom';

export function UseNavigation(destino){
  const navigate = useNavigate()
  navigate({destino})
}