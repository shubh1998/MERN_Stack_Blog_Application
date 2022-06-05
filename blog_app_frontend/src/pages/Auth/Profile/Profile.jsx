import NotFound from 'components/NotFound/NotFound'
import Sidebar from 'components/Sidebar/Sidebar'
import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from 'utils/constants/index'
import ChangePassword from '../ChangePassword/ChangePassword'
import UpdateProfile from '../UpdateProfile/UpdateProfile'

const sideBarOptions = [
  {
    label: "Profile Details",
    url: ROUTE_PATHS.profile
  },
  {
    label: "Change Password",
    url: `${ROUTE_PATHS.profile}${ROUTE_PATHS.changePassword}`
  }
]

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleRedirection = (url) => {
    navigate(url)
  }

  return (
    <div className='container'>
      <div className='row ml-minus-15 mr-minus-15'>
        <div className='col-3 p-15'>
          <Sidebar sideBarOptions={sideBarOptions} handleRedirection={handleRedirection} routePath={location.pathname}/>
        </div>
        <div className='col-9 p-15'>
          <div className='card'>
            <Routes>
              <Route index element={<UpdateProfile />} />
              <Route exact path={ROUTE_PATHS.changePassword} element={<ChangePassword />} />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
