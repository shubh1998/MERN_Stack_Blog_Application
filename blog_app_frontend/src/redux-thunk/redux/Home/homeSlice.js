import { createSlice } from '@reduxjs/toolkit'
import { fetchBlogsOnHome } from 'redux-thunk/thunk/Home/Home'
const defaultHomeState = {
  allPosts: null
}

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: defaultHomeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsOnHome.fulfilled, (state, action) => {
        return {
          ...state,
          allPosts: action.payload
        }
      })
  }
})

export default homeSlice.reducer
