import User from './models/User'

function getUser(email) {
    if (typeof email !== 'string') {
        throw new Error('Email must be a string')
    }

    return new Promise((resolve, reject) => {
        User.findOne({ email }, function (error, user) {
            if (error) {
                return reject(error)
            }

            if (user == null) {
                return reject(new Error(`No such user ${email}`))
            }

            resolve(user)
        })
    })
}

export default getUser