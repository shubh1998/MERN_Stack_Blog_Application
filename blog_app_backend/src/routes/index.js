const userManagementRoutes = require('./User/userRoutes')
const blogPostManagementRoutes = require('./BlogPost/blogPostRoutes')

module.exports = [
    userManagementRoutes,
    blogPostManagementRoutes
]