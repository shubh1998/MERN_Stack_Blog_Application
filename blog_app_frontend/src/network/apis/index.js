import axios from 'axios'
import config from 'config'
import { METHOD_TYPES } from 'utils/constants'
import { requestHandler, responseSuccessHandler, errorHandler } from 'network/interceptors/index'

const clients = {}
const microServices = {}

const microServicesURLs = {
  // Add Multiple end-points here
  API_URL_1: `${config.apiGateways.BASE_URL_1}`
}

const axiosClient = (baseUrl, config) => axios.create({
  baseURL: baseUrl,
  ...config
})

for (const key in microServicesURLs) {
  const axiosInstance = axiosClient(microServicesURLs[key], {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  microServices[key] = key
  clients[key] = axiosInstance

  // Handle request process
  axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  )
  // Handle response process
  axiosInstance.interceptors.response.use(
    (response) => responseSuccessHandler(response),
    (error) => errorHandler(error)
  )
}

const axiosInstanceService = (method, uri, data = {}, configs = {}) => {
  const {
    showApiSuccessMessage = false,
    successMessage = null,
    server = microServices.BASE_URL1,
    headers = {},
    params = {},
    responseType = 'json',
    handlerEnabled = true, // Check: Interceptors required or not
    loader = null
  } = configs

  const axiosConfig = {
    headers,
    params,
    handlerEnabled,
    loader,
    showApiSuccessMessage
  }

  if (responseType) {
    axiosConfig.responseType = responseType
  }

  if (successMessage) {
    axiosConfig.successMessage = successMessage
  }

  return clients[server][method](
    uri,
    method === METHOD_TYPES.get || method === METHOD_TYPES.delete ? axiosConfig : data,
    axiosConfig
  )
}

export default axiosInstanceService
export { microServices }
