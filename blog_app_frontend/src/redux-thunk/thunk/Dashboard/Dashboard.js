import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllBlogsForDashboardService } from 'network/services/dashboard.service'

export const fetchBlogsOnDashboard = createAsyncThunk('dashboard/blogs', async (data, thunkApi) => {
  try {
    const res = await fetchAllBlogsForDashboardService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
