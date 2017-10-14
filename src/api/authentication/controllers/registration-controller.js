import { validationResult } from 'express-validator/check'
import User from '../models/User'

export default (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        // TODO: Create a response class to handle validation errors
        return response.status(422).json({
            errors: errors.mapped() 
        })
    }

    var user = new User(request.body)

    user.save()
        .then((doc) => {
            response.status(200).json({
                message: `${doc.fullname()} has been Saved successfully!`
            })
        })
        .catch((error) => {
            response.status(500).json({
                message: error.message
            })
        })

}