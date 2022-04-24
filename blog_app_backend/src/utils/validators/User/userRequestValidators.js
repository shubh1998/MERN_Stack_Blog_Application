const { body } = require('express-validator');

const validateRegisterUser = () => ([
  body('name').not().isEmpty().trim().withMessage('name is required !'),
  body('email').not().isEmpty().trim().withMessage('email is required !').isEmail().withMessage('invalid email !'),
  body('password').isLength({min: 5, max: 32}).withMessage('password must contain minimum 5 characters and maximum 32 characters !')
])

module.exports = {
  validateRegisterUser
}