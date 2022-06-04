import { createSlice } from '@reduxjs/toolkit'
import { createBlogPost, getBlogByIdOnDashboard, updateBlogPost } from 'redux-thunk/thunk/BlogPost/BlogPost'
const defaultBlogPostState = {
  updatePostData: null
}

const blogPostSlice = createSlice({
  name: 'blogPostSlice',
  initialState: defaultBlogPostState,
  reducers: {
    resetUpdatePostData: (state) => {
      return {
        updatePostData: null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogPost.fulfilled, (state, action) => {
        return { ...state }
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        return { ...state }
      })
      .addCase(getBlogByIdOnDashboard.fulfilled, (state, action) => {
        return {
          updatePostData: action.payload
        }
      })
  }
})

export const { resetUpdatePostData } = blogPostSlice.actions

export default blogPostSlice.reducer
