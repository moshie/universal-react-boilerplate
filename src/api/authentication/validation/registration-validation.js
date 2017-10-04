const { check } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

export default [
    check('email').exists().isEmail()
]