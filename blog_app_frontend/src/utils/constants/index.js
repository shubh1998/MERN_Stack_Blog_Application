export const TOKEN = 'authToken'

export const ROUTE_PATHS = {
  home: '/',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  createPost: '/create-post',
  updatePost: '/update-post',
  viewBlog: '/blog/:slug',
  profile: '/profile',
  changePassword: '/change-password',
}

/* ==========================================================================
  HTTP Method Types
========================================================================== */
export const METHOD_TYPES = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch'
}


/* ==========================================================================
  Types of Loader
========================================================================== */
export const LOADER_TYPE = {
  SCALE: 'scale',
  PULSE: 'pulse'
}

/* ==========================================================================
  Loader Handler Types
========================================================================== */
export const LOADER_HANDLER_TYPES = {
  page: 'pageLoader',
  submit: 'submitButtonLoader',
  table: 'tableLoader',
  dialog: 'dialogLoader'
}
