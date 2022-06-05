import Login from "pages/Auth/Login/Login";
import Profile from "pages/Auth/Profile/Profile";
import Register from "pages/Auth/Register/Register";
import CreatePost from "pages/BlogPost/CreatePost/CreatePost";
import ViewBlog from "pages/BlogPost/ViewBlog/ViewBlog";
import Dashboard from "pages/Dashboard/Dashboard";
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
    label: 'Home',
    path: ROUTE_PATHS.home,
    component: Home,
    hasAuth: true,
    hasNavBar: true
  },
  {
    key: 3,
    label: 'Login',
    path: ROUTE_PATHS.login,
    component: Login,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 4,
    label: 'Register',
    path: ROUTE_PATHS.register,
    component: Register,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 5,
    label: 'Dashboard',
    path: ROUTE_PATHS.dashboard,
    component: Dashboard,
    hasAuth: true,
    hasNavBar: true
  },
  {
    key: 6,
    label: 'Create Post',
    path: ROUTE_PATHS.createPost,
    component: CreatePost,
    hasAuth: true,
    hasNavBar: true
  },
  {
    key: 7,
    label: 'Update Post',
    path: ROUTE_PATHS.updatePost,
    component: CreatePost,
    hasAuth: true,
    hasNavBar: true
  },
  {
    key: 8,
    label: 'View Blog',
    path: ROUTE_PATHS.viewBlog,
    component: ViewBlog,
    hasAuth: false,
    hasNavBar: true
  },
  {
    key: 9,
    label: 'View Blog',
    path: ROUTE_PATHS.viewBlog,
    component: ViewBlog,
    hasAuth: true,
    hasNavBar: true
  },
  {
    key: 9,
    label: 'Profile',
    path: `${ROUTE_PATHS.profile}/*`,
    component: Profile,
    hasAuth: true,
    hasNavBar: true
  }
]
