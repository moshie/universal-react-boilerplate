import { check } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import User from '../models/User'

import equals from './rules/equals'
import exists from './rules/exists'

export default [
    check('email')
        .exists()
        .isEmail().withMessage('Please provide a valid Email')
        .not().isEmpty().withMessage('Email is required')
        .custom((value, { req }) => exists(User, value, 'email')).withMessage('Email is already in use'),

    check('first_name')
        .exists()
        .not().isEmpty().withMessage('First name is required'),

    check('last_name'),

    check('password')
        .exists()
        .not().isEmpty().withMessage('Password is required'),

    check('password_confirmation')
        .exists()
        .not().isEmpty().withMessage('Password confirmation is required')
        .custom((value, { req }) => equals(value, req.body.password)).withMessage('Passwords must match')
]