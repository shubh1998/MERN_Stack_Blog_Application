import { createAsyncThunk } from '@reduxjs/toolkit'
import { createBlogPostService, fetchBlogByIdService, updateBlogPostService } from 'network/services/blogPost.service'
import { ROUTE_PATHS } from 'utils/constants/index'

export const createBlogPost = createAsyncThunk('blog/create', async (data, thunkApi) => {
  try {
    const { navigate, formData } = data
    const res = await createBlogPostService(formData)
    if (res) {
      navigate(ROUTE_PATHS.dashboard, {
        replace: true
      })
    }
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})


export const updateBlogPost = createAsyncThunk('blog/update', async (data, thunkApi) => {
  try {
    const { navigate, formData, blogId } = data
    console.log(formData)
    const res = await updateBlogPostService({
      blogId,
      formData
    })
    if (res) {
      navigate(ROUTE_PATHS.dashboard, {
        replace: true
      })
    }
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
