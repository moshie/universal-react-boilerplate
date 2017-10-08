import { sign } from 'jsonwebtoken'

import getUser from './get-user'
import checkPassword from './check-password'

function authenticate(email, password) {
    return getUser(email)
        .then((user) => checkPassword(user, password))
        .then((user) => sign({
            data: { 
                email: user.email
            },
            exp: 1440 // expires in 24 hours
        }, 'secret'))
}

export default authenticate