import axiosInstance, { microServices } from "network/apis/index"
import { LOADER_HANDLER_TYPES, METHOD_TYPES } from "utils/constants/index"

export const fetchAllBlogsForDashboardService = (data) => {
  const { page, limit } = data
  return axiosInstance(METHOD_TYPES.get, '/blog-post/all', {}, {
    server: microServices.API_URL_1,
    params: { page, limit },
    loader: LOADER_HANDLER_TYPES.page,
    showApiSuccessMessage: true
  })
}

export const deleteBlogByIdService = (data) => {
  const { blogId } = data
  return axiosInstance(METHOD_TYPES.delete, '/blog-post/delete', {}, {
    server: microServices.API_URL_1,
    params: { blog_id: blogId },
    loader: LOADER_HANDLER_TYPES.page,
    showApiSuccessMessage: true
  })
}
