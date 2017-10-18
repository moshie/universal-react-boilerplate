import { validationResult } from 'express-validator/check'
import authenticate from '../authenticate'

export default (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        return response.status(422).json({
            errors: errors.mapped() 
        })
    }

    authenticate(request.body.email, request.body.password)
        .then((token) => {
            response.json({
                data: { token }
            })
        })
        .catch((error) => {
            response.status(400).json({
                errors: error.message
            })
        })

}