import { combineReducers } from '@reduxjs/toolkit'
import loaderSlice from './Loader/loaderSlice'
import authSlice from './Auth/authSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  loader: loaderSlice,
})
