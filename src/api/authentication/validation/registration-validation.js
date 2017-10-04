const { check } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
const passwordConfirmation = require('./rules/password-confirmation')

export default [
    check('email')
        .exists()
        .isEmail(),

    check('first_name')
        .exists(),

    check('last_name'),

    check('password')
        .exists(),

    check('password_confirmation')
        .exists()
        .custom(passwordConfirmation)
]