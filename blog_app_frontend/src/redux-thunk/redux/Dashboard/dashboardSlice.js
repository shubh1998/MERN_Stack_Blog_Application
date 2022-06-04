import { createSlice } from '@reduxjs/toolkit'
import { deleteBlogOnDashboard, fetchBlogsOnDashboard } from 'redux-thunk/thunk/Dashboard/Dashboard'
const defaultDashboardState = {
  dashboardPostsData: null
}

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: defaultDashboardState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsOnDashboard.fulfilled, (state, action) => {
        return {
          ...state,
          dashboardPostsData: action.payload
        }
      })
      .addCase(deleteBlogOnDashboard.fulfilled, (state, action) => {
        return {
          dashboardPostsData: {
            result: state.dashboardPostsData.result.filter(blogs => blogs._id !== action.payload._id),
            total_documents: state.dashboardPostsData.total_documents - 1
          }
        }
      })
  }
})

export default dashboardSlice.reducer
