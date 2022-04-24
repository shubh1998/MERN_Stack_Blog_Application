const router = require("express").Router()
const { userManagementController } = require("../../controllers/index")
const { userRequestValidators } = require("../../utils/validators/index")
const requestPayloadValidator = require("../../middlewares/requestPayloadValidator")

router.post('/user/register', userRequestValidators.validateRegisterUser(), requestPayloadValidator, userManagementController.registerUser)

module.exports = router