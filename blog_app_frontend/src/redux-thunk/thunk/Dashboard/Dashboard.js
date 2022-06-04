import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteBlogByIdService, fetchAllBlogsForDashboardService } from 'network/services/dashboard.service'

export const fetchBlogsOnDashboard = createAsyncThunk('dashboard/blogs', async (data, thunkApi) => {
  try {
    const res = await fetchAllBlogsForDashboardService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const deleteBlogOnDashboard = createAsyncThunk('blog/delete', async (data, thunkApi) => {
  try {
    const res = await deleteBlogByIdService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
