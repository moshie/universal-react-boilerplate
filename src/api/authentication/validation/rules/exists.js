
function exists(Model, search = {}) {
    return new Promise((resolve, reject) => {

        if (typeof Model !== 'function') {
            return reject(
                new Error('Invalid Model')
            )
        }

        if (Array.isArray(search) || typeof search !== 'object' || !Object.keys(search).length) {
            return reject(
                new Error('Invalid search object')
            )
        }

        Model.findOne(search, function (error, doc) {
            if (error) {
                return reject(error)
            }

            if (doc !== null) {
                return reject(
                    new Error(`${Model.collection.name} not found matching your search`)
                )
            }
            
            resolve(true) // https://github.com/ctavan/express-validator/issues/444
        })

    })
}

export default exists