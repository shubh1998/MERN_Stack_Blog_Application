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
  const { blogId, formData } = data
  return axiosInstance(METHOD_TYPES.patch, '/blog-post/update', formData, {
    server: microServices.API_URL_1,
    params: {
      blog_id: blogId
    },
    loader: LOADER_HANDLER_TYPES.submit,
    showApiSuccessMessage: true
  })
}

export const fetchBlogByIdService = (data) => {
  const { blogId, slug } = data
  return axiosInstance(METHOD_TYPES.get, '/blog-post/details', {}, {
    server: microServices.API_URL_1,
    params: { blog_id: blogId, slug: slug },
    loader: LOADER_HANDLER_TYPES.page,
  })
}
