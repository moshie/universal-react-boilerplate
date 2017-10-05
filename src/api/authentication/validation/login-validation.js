import { check } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'

export default [
    check('email')
        .exists()
        .isEmail(),

    check('password')
        .exists()
]