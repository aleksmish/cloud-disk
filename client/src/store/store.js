import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import userReducer from './userSlice'
import fileReducer from './fileSlice'
import uploadReducer from './uploadSlice'

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    file: fileReducer,
    upload: uploadReducer, 
})

export const store = configureStore({
    reducer: rootReducer,
})