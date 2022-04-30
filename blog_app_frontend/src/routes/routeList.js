import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Home from "pages/Home/Home";
import { ROUTE_PATHS } from "utils/constants/index";

export const routeList = [
  {
    key: 1,
    label: 'Home',
    path: ROUTE_PATHS.home,
    component: Home,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 2,
    label: 'Login',
    path: ROUTE_PATHS.login,
    component: Login,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 3,
    label: 'Register',
    path: ROUTE_PATHS.register,
    component: Register,
    hasAuth: false,
    hasNavBar: true
  }
]
