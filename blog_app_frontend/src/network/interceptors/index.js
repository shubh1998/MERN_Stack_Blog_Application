import store from 'index'
import { startLoader, stopLoader } from 'redux-thunk/redux/Loader/loaderSlice'
import { getAuthToken, signIn, signOut } from 'utils/services/cookie.services'
import { openErrorToaster, openSuccessToaster } from 'utils/services/toaster.services'

export const requestHandler = (request) => {
  if (request.handlerEnabled) {
    const authToken = getAuthToken()
    if (authToken) {
      request.headers.authorization = `Bearer ${authToken}`
    }
  }
  // Loader Logic to add loader
  if (request.loader) {
    store.dispatch(startLoader(request.loader))
  }
  return request
}

export const responseSuccessHandler = (response) => {
  const { responseType = 'json', loader, successMessage, showApiSuccessMessage } = response.config || {}

  if(response.headers.authtoken){
    signIn({
      token: response.headers.authtoken
    })
  }

  if (responseType === 'blob') {
    return { file: response.data, headers: response.headers }
  }
  // Loader Logic to Stop loader
  if (loader) {
    store.dispatch(stopLoader(loader))
  }
  successMessage && openSuccessToaster(successMessage)
  showApiSuccessMessage && openSuccessToaster(response.data.data.message)
  return response.data.data.result
}

export const errorHandler = (error) => {
  // Loader Logic to Stop loader
  if (error.response.config.loader) {
    store.dispatch(stopLoader(error.response.config.loader))
  }
  if (error.response.status === 401) {
    openErrorToaster('UnAuthorized')
    signOut()
    return Promise.reject(error.response.data.errors)
  } else if (error.response.status === 500) {
    openErrorToaster('Internal Server Error')
    return Promise.reject(error.response.data.errors)
  }
  error.response.data.errors.map((error) => {
    openErrorToaster(error.message)
  })
  return Promise.reject(error.response.data.errors)
}
