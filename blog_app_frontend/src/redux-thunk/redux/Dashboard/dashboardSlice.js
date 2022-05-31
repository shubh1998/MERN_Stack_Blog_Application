import { createSlice } from '@reduxjs/toolkit'
import { fetchBlogsOnDashboard } from 'redux-thunk/thunk/Dashboard/Dashboard'
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
  }
})

export default dashboardSlice.reducer
