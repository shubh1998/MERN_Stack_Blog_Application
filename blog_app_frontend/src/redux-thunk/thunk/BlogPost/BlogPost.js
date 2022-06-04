import { createAsyncThunk } from '@reduxjs/toolkit'
import { createBlogPostService, updateBlogPostService } from 'network/services/blogPost.service'
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
    const navigate = data.navigate
    navigate(ROUTE_PATHS.dashboard, {
      replace: true
    })
    delete data.navigate
    const res = await updateBlogPostService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
