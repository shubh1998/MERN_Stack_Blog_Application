import { createAsyncThunk } from '@reduxjs/toolkit'
import { changePasswordService, fetchProfileDetailsService, loginService, logoutService, registerService, updateProfileDetailsService } from 'network/services/auth.service'
import { ROUTE_PATHS } from 'utils/constants/index'
import { signOut } from 'utils/services/cookie.services'

export const userLogin = createAsyncThunk('user/login', async ({ email, password, navigate }, thunkApi) => {
  try {
    const res = await loginService({ email, password })
    navigate(ROUTE_PATHS.dashboard, {
      replace: true
    })
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const userRegister = createAsyncThunk('user/register', async ({ name, email, password }, thunkApi) => {
  try {
    const res = await registerService({ name, email, password })
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const userLogout = createAsyncThunk('user/logout', async ({ navigate }, thunkApi) => {
  try {
    const res = await logoutService()
    signOut()
    navigate(ROUTE_PATHS.home, {
      replace: true
    })
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const userChangePassword = createAsyncThunk('user/change/password', async (data, thunkApi) => {
  try {
    const res = await changePasswordService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const fetchProfileDetails = createAsyncThunk('user/profile-details', async (data, thunkApi) => {
  try {
    const res = await fetchProfileDetailsService()
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})

export const updateProfileDetails = createAsyncThunk('user/update-profile-details', async (data, thunkApi) => {
  try {
    const res = await updateProfileDetailsService(data)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error[0].message)
  }
})
