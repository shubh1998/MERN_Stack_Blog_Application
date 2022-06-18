const router = require("express").Router() 
const { blogManagementController } = require("../../controllers")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const { upload } = require("../../middlewares/multer")

router.post('/blog-post/create', isAuthenticated, upload.single('image'), blogManagementController.createBlogPost)
router.patch('/blog-post/update', isAuthenticated, upload.single('image'), blogManagementController.createBlogPost)
router.get('/blog-post/all', isAuthenticated, blogManagementController.fetchAllPostsOfUser)
router.delete('/blog-post/delete', isAuthenticated, blogManagementController.deletePostById)
router.get('/blog-post/details', blogManagementController.fetchPostById)
router.get('/all-blogs', blogManagementController.fetchAllPosts)
router.post('/blog-post/add-comment', isAuthenticated, blogManagementController.AddCommentOnBlogPost)

module.exports = router