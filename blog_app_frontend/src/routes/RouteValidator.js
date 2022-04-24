import Navbar from 'components/NavBar/Navbar'
import PropTypes from 'prop-types'

const RouteValidator = ({ hasAuth, hasNavBar, component: Component, ...props }) => {
  return (
      hasNavBar ?
        <>
          <Navbar />
          <Component />
        </>
      :
      <Component />
  )
}

RouteValidator.propTypes = {
  component: PropTypes.elementType.isRequired,
  hasAuth: PropTypes.bool,
  hasNavBar: PropTypes.bool,
  path: PropTypes.string
}

export default RouteValidator
