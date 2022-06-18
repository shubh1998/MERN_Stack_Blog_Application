import { createSlice } from '@reduxjs/toolkit'
import { createBlogPost, getBlogByIdOnDashboard, postComment, updateBlogPost } from 'redux-thunk/thunk/BlogPost/BlogPost'
const defaultBlogPostState = {
  updatePostData: null,
  comments: []
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
          updatePostData: action.payload?.postDetail || action.payload,
          comments: action.payload?.comments || []
        }
      })
      .addCase(postComment.fulfilled, (state, action) => {
        return {
            ...state,
            comments: [
              action.payload,
              ...state.comments,
            ]
        }
      })
  }
})

export const { resetUpdatePostData } = blogPostSlice.actions

export default blogPostSlice.reducer
