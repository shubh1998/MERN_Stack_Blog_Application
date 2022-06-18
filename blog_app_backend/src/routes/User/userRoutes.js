const router = require("express").Router()
const { userManagementController } = require("../../controllers")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const requestPayloadValidator = require("../../middlewares/requestPayloadValidator")
const { registerUserRequestPayload, loginUserRequestPayload, changePasswordRequestPayload } = require("../../utils/validators/User/userRequestValidators")

router.post('/user/register', registerUserRequestPayload(), requestPayloadValidator, userManagementController.registerUser)
router.post('/user/login', loginUserRequestPayload(), requestPayloadValidator, userManagementController.loginUser)
router.patch('/user/change-password', isAuthenticated, changePasswordRequestPayload(), requestPayloadValidator, userManagementController.changePassword)

module.exports = router