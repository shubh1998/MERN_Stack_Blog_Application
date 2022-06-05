import axiosInstance, { microServices } from "network/apis/index"
import { LOADER_HANDLER_TYPES, METHOD_TYPES } from "utils/constants/index"

export const fetchAllBlogsForHome = (data) => {
  const { page, limit } = data
  return axiosInstance(METHOD_TYPES.get, '/all-blogs', {}, {
    server: microServices.API_URL_1,
    params: { page, limit },
    loader: LOADER_HANDLER_TYPES.page,
  })
}
