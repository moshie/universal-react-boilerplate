import bcrypt from 'bcrypt'

function checkPassword(user = null, plainTextPassword) {
    return new Promise((resolve, reject) => {
        if (user === null) {
            return reject(
                new Error('No user assigned to authenticate')
            )
        }

        bcrypt.compare(plainTextPassword, user.password, function (error, authenticated) {
            if (error) {
                return reject(error)
            }

            if (!authenticated) {
                return reject(
                    new Error('Authentication failed')
                )
            }

            resolve(user)
        })
    })
}

export default checkPassword