import { check } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'

export default [
    check('email')
        .exists()
        .isEmail().withMessage('Please provide a valid Email')
        .not().isEmpty().withMessage('Email is required'),

    check('password')
        .exists()
        .not().isEmpty().withMessage('Password is required')
]