import { createSlice } from '@reduxjs/toolkit'
import { userChangePassword, userLogin, userLogout, userRegister } from 'redux-thunk/thunk/Auth/Auth'
const defaultAuthState = {}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: defaultAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        return {
          ...defaultAuthState
        }
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        return {
          ...defaultAuthState
        }
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        return {
          ...defaultAuthState
        }
      })
      .addCase(userChangePassword.fulfilled, (state, action) => {
        return {
          ...defaultAuthState
        }
      })
  }
})

export default authSlice.reducer
