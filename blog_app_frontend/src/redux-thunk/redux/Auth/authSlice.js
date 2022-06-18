import { createSlice } from '@reduxjs/toolkit'
import { fetchProfileDetails, updateProfileDetails, userChangePassword, userLogin, userLogout, userRegister } from 'redux-thunk/thunk/Auth/Auth'
const defaultAuthState = {
  profile: null
}

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
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        return {
          profile: action.payload
        }
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        return {
          profile: action.payload
        }
      })
  }
})

export default authSlice.reducer
