import { sign } from 'jsonwebtoken'

import User from './models/User'
import checkPassword from './check-password'

function authenticate(email, password) {
    return User.findOne({ email })
        .then((user) => checkPassword(user, password))
        .then((user) => sign({
            data: { 
                email: user.email
            },
            exp: 1440 // expires in 24 hours
        }, 'secret'))
}

export default authenticate