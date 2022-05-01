import PropTypes from 'prop-types'
import PulseLoader from 'react-spinners/PulseLoader'
import ScaleLoader from 'react-spinners/ScaleLoader'

const AppLoader = ({ variant, size, height, width, radius, color, speedMultiplier, margin }) => {
  const args = { variant, size, height, width, radius, color, speedMultiplier, margin }

  switch (variant) {
    case 'scale':
      return (
        <ScaleLoader {...args} />
      )

    case 'pulse':
      return (
        <PulseLoader {...args} />
      )

    default:
      break
  }
}

export default AppLoader

AppLoader.defaultProps = {
  variant: 'pulse',
  size: 15,
  height: 40,
  width: 5,
  radius: 2,
  color: 'darkgreen',
  speedMultiplier: 1,
  margin: 2
}

AppLoader.propTypes = {
  variant: PropTypes.oneOf(['pulse', 'scale']),
  size: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  radius: PropTypes.number,
  color: PropTypes.string,
  speedMultiplier: PropTypes.number,
  margin: PropTypes.number
}
