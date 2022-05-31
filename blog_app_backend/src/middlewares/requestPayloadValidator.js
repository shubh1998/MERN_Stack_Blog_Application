const { validationResult } = require("express-validator")

const requestPayloadValidator = (req, res, next) => {
  const hasErrors = validationResult(req)
  if (hasErrors.isEmpty()) {
    return next()
  }
  const extractedErrors = hasErrors.array().map(err => ({ message: err.msg }))

  return badRequestError(res, { errors: extractedErrors })
}

module.exports = requestPayloadValidator