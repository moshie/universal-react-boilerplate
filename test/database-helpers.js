import mongoose from 'mongoose'
import each from 'async/each'
import { db } from '../src/config'

var state = {
    db: null
}

exports.connect = () => {
    if (mongoose.connection.db) {
        return Promise.resolve()
    }

    mongoose.Promise = Promise
    return mongoose.connect(db.testing, { useMongoClient: true })
}

exports.getDB = () => state.db

exports.drop = () => {
    if (!mongoose.connection.db) {
        return Promise.resolve()
    }

    return mongoose.connection.db.dropDatabase()
}

exports.fixtures = (dataset) => {
    if (!mongoose.connection.db) {
        return Promise.reject(
            new Error('Missing database connection.')
        )
    }

    return new Promise((resolve, reject) => {
        var tables = Object.keys(dataset)
        each(tables, (tableName, cb) => {
            var model = mongoose.model(tableName)

            if (model) {
                model.create(dataset[tableName], (error) => {
                    if (error) {
                        reject(error)
                    }

                    resolve()
                })
            } else {
                reject(
                    new Error(`${tableName} does not exist`)
                )
            }
        })
    })
}
