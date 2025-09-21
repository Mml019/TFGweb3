// pointed to our reductor class
import {createStore, applyMiddleare} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    // if you can't permit to see react devtools
    applyMiddleare(...middleware),
    // to see react dev tools recomended only in development
    composeWithDevTools(applyMiddleare(...middleware))

);