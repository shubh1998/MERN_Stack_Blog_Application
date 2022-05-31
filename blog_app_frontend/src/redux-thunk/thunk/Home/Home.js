import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllBlogsForHome } from 'network/services/home.service'

export const fetchBlogsOnHome = createAsyncThunk('home/blogs', async (data, thunkApi) => {
  try {
    const res = await fetchAllBlogsForHome(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
