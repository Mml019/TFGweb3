import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import combinedReducers from './reduxToolkit/reducers/combinedReducers'

const store = configureStore(
    {
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk), 
    devTools: process.env.devTools !== 'production',
});

export default store
