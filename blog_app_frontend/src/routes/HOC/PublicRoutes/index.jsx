import Navbar from 'components/NavBar/Navbar'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from 'utils/constants/index'

const PublicRoutes = ({ Component, hasNavBar, isAuthenticated, path }) => {
  const permittedPublicRoutes = [ROUTE_PATHS.viewBlog, ROUTE_PATHS.home]

  const Element = hasNavBar ? (
    <>
      <Navbar />
      <div className='row mt-80'>
        <Component />
      </div>
    </>
  ) : (
  <Component />
  )

  return (
    isAuthenticated ? ( permittedPublicRoutes.includes(path) ? Element : <Navigate to={ROUTE_PATHS.dashboard} />) : Element
  )
}

export default PublicRoutes
