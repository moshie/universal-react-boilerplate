function exists(Model, value, key) {
    console.log(Promise);
    return new Promise((reject, resolve) => {
        if (typeof key !== 'string' || !key.length) {
            return reject('Key not defined!')
        }

        var search = {}
        search[key] = value;

        Model.find(search, function (error, docs) {
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