function exists(Model, value, key) {
    return new Promise((reject, resolve) => {
        if (typeof key !== 'string' || !key.length) {
            return reject('Key not defined!')
        }

        Model.find({ [key]: value }, function (error, docs) {
            if (error) {
                reject(error)
            }

            if (docs.length) {
                return reject()
            }
            
            resolve()
        })

    })
}

export default exists