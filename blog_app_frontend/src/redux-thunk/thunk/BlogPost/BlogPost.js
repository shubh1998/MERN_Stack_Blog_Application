import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCommentService, createBlogPostService, fetchBlogByIdService, updateBlogPostService } from 'network/services/blogPost.service'

export const createBlogPost = createAsyncThunk('blog/create', async (data, thunkApi) => {
  try {
    const { formData } = data
    const res = await createBlogPostService(formData)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})


export const updateBlogPost = createAsyncThunk('blog/update', async (data, thunkApi) => {
  try {
    const { formData, blogId } = data
    const res = await updateBlogPostService({
      blogId,
      formData
    })
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const getBlogByIdOnDashboard = createAsyncThunk('blog/details', async (data, thunkApi) => {
  try {
    const res = await fetchBlogByIdService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})


export const postComment = createAsyncThunk('post/comment', async (data, thunkApi) => {
  try {
    const res = await addCommentService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
