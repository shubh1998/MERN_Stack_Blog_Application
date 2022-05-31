import Navbar from 'components/NavBar/Navbar'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from 'utils/constants/index'

const PrivateRoutes = ({ Component, isAuthenticated, hasNavBar }) => {
  return isAuthenticated
    ? (
      hasNavBar ?
        <>
          <Navbar />
          <div className='row mt-80'>
            <Component />
          </div>
        </> :
        <Component />
    )
    : <Navigate to={ROUTE_PATHS.login} />
}

export default PrivateRoutes
