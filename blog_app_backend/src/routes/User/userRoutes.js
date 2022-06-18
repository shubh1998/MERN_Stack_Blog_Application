const router = require("express").Router()
const { userManagementController } = require("../../controllers")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const requestPayloadValidator = require("../../middlewares/requestPayloadValidator")
const { registerUserRequestPayload, loginUserRequestPayload, changePasswordRequestPayload, updateProfileRequestPayload } = require("../../utils/validators/User/userRequestValidators")

router.post('/user/register', registerUserRequestPayload(), requestPayloadValidator, userManagementController.registerUser)
router.post('/user/login', loginUserRequestPayload(), requestPayloadValidator, userManagementController.loginUser)
router.patch('/user/change-password', isAuthenticated, changePasswordRequestPayload(), requestPayloadValidator, userManagementController.changePassword)
router.get('/user/profile', isAuthenticated, userManagementController.getProfileDetails)
router.patch('/user/profile', isAuthenticated, updateProfileRequestPayload(), requestPayloadValidator, userManagementController.updateProfile)

module.exports = router