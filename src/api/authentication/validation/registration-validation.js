import { check } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'

import equals from './rules/equals'

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
        .custom((value, { req }) => equals(value, req.body.password))
]