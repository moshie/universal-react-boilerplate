const { validationResult } = require('express-validator/check')

export default (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        return response.status(422).json({
            errors: errors.mapped() 
        })
    }

    response.json({ 
        status: 200 
    })
}