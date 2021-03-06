import axiosInstance, { microServices } from "network/apis/index"
import { LOADER_HANDLER_TYPES, METHOD_TYPES } from "utils/constants/index"

export const registerService = (data) => {
  return axiosInstance(METHOD_TYPES.post, '/user/register', data, {
    server: microServices.API_URL_1,
    handlerEnabled: false,
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}

export const loginService = (data) => {
  return axiosInstance(METHOD_TYPES.post, '/user/login', data, {
    server: microServices.API_URL_1,
    handlerEnabled: false,
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}

export const logoutService = () => {
  return axiosInstance(METHOD_TYPES.get, '/user/logout', {}, {
    server: microServices.ADMIN_URL,
    loader: LOADER_HANDLER_TYPES.page,
    successMessage: 'Logout Successfully'
  })
}

export const changePasswordService = (data) => {
  return axiosInstance(METHOD_TYPES.patch, '/user/change-password', data, {
    server: microServices.API_URL_1,
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}

export const fetchProfileDetailsService = () => {
  return axiosInstance(METHOD_TYPES.get, '/user/profile', {}, {
    server: microServices.API_URL_1,
    loader: LOADER_HANDLER_TYPES.page,
    showApiSuccessMessage: false
  })
}

export const updateProfileDetailsService = (data) => {
  return axiosInstance(METHOD_TYPES.patch, '/user/profile', data, {
    server: microServices.API_URL_1,
    loader: LOADER_HANDLER_TYPES.page,
    showApiSuccessMessage: true
  })
}
