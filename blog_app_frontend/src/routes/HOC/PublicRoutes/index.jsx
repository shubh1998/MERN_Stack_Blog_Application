import Navbar from 'components/NavBar/Navbar'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from 'utils/constants/index'

const PublicRoutes = ({ Component, hasNavBar, isAuthenticated }) => {
  return (
    isAuthenticated ?
    <Navigate to={ROUTE_PATHS.dashboard} /> :
    (
      hasNavBar ?
      <>
        <Navbar />
        <div className='row mt-80'>
          <Component />
        </div>
      </> :
      <Component />
    )
  )
}

export default PublicRoutes
