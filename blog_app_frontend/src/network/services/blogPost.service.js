import axiosInstance, { microServices } from "network/apis/index"
import { LOADER_HANDLER_TYPES, METHOD_TYPES } from "utils/constants/index"

export const createBlogPostService = (data) => {
  return axiosInstance(METHOD_TYPES.post, '/blog-post/create', data, {
    server: microServices.API_URL_1,
    params: {},
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}

export const updateBlogPostService = (data) => {
  return axiosInstance(METHOD_TYPES.patch, '/blog-post/update', data, {
    server: microServices.API_URL_1,
    params: {},
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}
