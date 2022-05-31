import { combineReducers } from '@reduxjs/toolkit'
import loaderSlice from './Loader/loaderSlice'
import authSlice from './Auth/authSlice'
import dashboardSlice from './Dashboard/dashboardSlice'
import homeSlice from './Home/homeSlice'
import blogPostSlice from './BlogPost/blogPostSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  loader: loaderSlice,
  dashboard: dashboardSlice,
  home: homeSlice,
  blogPost: blogPostSlice
})
