import { createSlice } from '@reduxjs/toolkit'

const defaultLoadersState = {
  pageLoader: false,
  submitButtonLoader: false,
  tableLoader: false,
  dialogLoader: false
}

const loaderSlice = createSlice({
  name: 'loaderSlice',
  initialState: defaultLoadersState,
  reducers: {
    startLoader: (state, action) => {
      return {
        ...state,
        [action.payload]: true
      }
    },
    stopLoader: (state, action) => {
      return {
        ...state,
        [action.payload]: false
      }
    }
  }
})

export const { startLoader, stopLoader } = loaderSlice.actions

export default loaderSlice.reducer
