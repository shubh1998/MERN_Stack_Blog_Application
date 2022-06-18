const { body } = require('express-validator');

const registerUserRequestPayload = () => ([
  body('name').not().isEmpty().trim().withMessage('name is required !'),
  body('email').not().isEmpty().trim().withMessage('email is required !').isEmail().withMessage('invalid email !'),
  body('password').isLength({min: 5, max: 32}).withMessage('password must contain minimum 5 characters and maximum 32 characters !')
])

const loginUserRequestPayload = () => ([
  body('email').not().isEmpty().trim().withMessage('email is required !').isEmail().withMessage('invalid email !'),
  body('password').isLength({min: 5, max: 32}).withMessage('password must contain minimum 5 characters and maximum 32 characters !')
])

const changePasswordRequestPayload = () => ([
  body('oldPassword').isLength({min: 5, max: 32}).withMessage('Old password must contain minimum 5 characters and maximum 32 characters !'),
  body('newPassword').isLength({min: 5, max: 32}).withMessage('New password must contain minimum 5 characters and maximum 32 characters !'),
  body('confirmPassword').isLength({min: 5, max: 32}).withMessage('Confirm password must contain minimum 5 characters and maximum 32 characters !')
])

const updateProfileRequestPayload = () => ([
  body('email').not().isEmpty().trim().withMessage('email is required !').isEmail().withMessage('invalid email !'),
  body('name').not().isEmpty().trim().withMessage('name is required !').isLength({min: 5, max: 32}).withMessage('name must contain minimum 5 characters and maximum 32 characters !')
])

module.exports = {
  registerUserRequestPayload,
  loginUserRequestPayload,
  changePasswordRequestPayload,
  updateProfileRequestPayload
}