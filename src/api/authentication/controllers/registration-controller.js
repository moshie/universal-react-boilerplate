import { validationResult } from 'express-validator/check'
import User from '../models/User'
import { sign } from 'jsonwebtoken'

export default (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        return response.status(422).json({
            errors: errors.mapped()
        })
    }

    var user = new User(request.body)

    user.save()
        .then((user) => sign({
            data: { email: user.email },
            exp: 1440 // expires in 24 hours
        }, 'secret'))
        .then((token) => {
            response.status(200).json({
                data: {
                    message: 'user saved successfully!',
                    token: token
                }
            })
        })
        .catch((error) => {
            response.status(500).json({
                errors: error.message
            })
        })

}