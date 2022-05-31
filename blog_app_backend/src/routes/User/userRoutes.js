const router = require("express").Router()
const { userManagementController } = require("../../controllers")
const requestPayloadValidator = require("../../middlewares/requestPayloadValidator")
const { registerUserRequestPayload, loginUserRequestPayload } = require("../../utils/validators/User/userRequestValidators")

router.post('/user/register', registerUserRequestPayload(), requestPayloadValidator, userManagementController.registerUser)
router.post('/user/login', loginUserRequestPayload(), requestPayloadValidator, userManagementController.loginUser)

module.exports = router