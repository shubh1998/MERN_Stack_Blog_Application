import PropTypes from 'prop-types'
import { getAuthToken } from 'utils/services/cookie.services'
import PrivateRoutes from './HOC/PrivateRoutes/index'
import PublicRoutes from './HOC/PublicRoutes/index'

const RouteValidator = ({ hasAuth, hasNavBar, component: Component, ...props }) => {
  const isAuthenticated = getAuthToken()
  return hasAuth
    ? <PrivateRoutes Component={Component} isAuthenticated={isAuthenticated} hasNavBar={hasNavBar} />
    : <PublicRoutes Component={Component} isAuthenticated={isAuthenticated} hasNavBar={hasNavBar} />
}

RouteValidator.propTypes = {
  component: PropTypes.elementType.isRequired,
  hasAuth: PropTypes.bool,
  hasNavBar: PropTypes.bool,
  path: PropTypes.string
}

export default RouteValidator
