import NotFound from 'pages/NotFound/NotFound'
import { Route, Routes } from 'react-router-dom'
import { routeList } from './routeList'
import RouteValidator from './RouteValidator'

const CustomRoutes = () => (
  <>
    <Routes>
      {routeList.map(({ path, key, ...props }) => {
        return (
          <Route
            path={path}
            key={key}
            exact
            element={<RouteValidator path={path} {...props} />}
          />
        )
      })}
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  </>
)

export default CustomRoutes
