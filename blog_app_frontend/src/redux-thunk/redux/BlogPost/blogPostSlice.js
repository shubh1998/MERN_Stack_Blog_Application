import { createSlice } from '@reduxjs/toolkit'
import { createBlogPost, updateBlogPost } from 'redux-thunk/thunk/BlogPost/BlogPost'
const defaultBlogPostState = {}

const blogPostSlice = createSlice({
  name: 'blogPostSlice',
  initialState: defaultBlogPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogPost.fulfilled, (state, action) => {
        return { ...state }
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        return { ...state }
      })
  }
})

export default blogPostSlice.reducer
