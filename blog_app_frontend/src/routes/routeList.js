import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Home from "pages/Home/Home";

export const routeList = [
  {
    key: 1,
    label: 'Home',
    path: '/',
    component: Home,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 2,
    label: 'Login',
    path: '/login',
    component: Login,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 3,
    label: 'Register',
    path: '/register',
    component: Register,
    hasAuth: false,
    hasNavBar: true
  }
]
