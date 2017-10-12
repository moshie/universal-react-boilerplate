import mongoose from 'mongoose'
import each from 'async/each'
import { db } from '../src/config'

var state = {
    db: null
}

exports.connect = (done) => {
    if (mongoose.connection.db) {
        return done()
    }

    mongoose.connect(db.testing, { useMongoClient: true }, done)
}

exports.getDB = () => state.db

exports.drop = (done) => {
    if (!mongoose.connection.db) {
        return done()
    }

    mongoose.connection.db.dropDatabase(done)
}

exports.fixtures = (dataset, done) => {
    if (!mongoose.connection.db) {
        return done(
            new Error('Missing database connection.')
        )
    }

    var tables = Object.keys(dataset)
    each(tables, (tableName, cb) => {
        var model = mongoose.model(tableName)

        if (model) {
            model.create(dataset[tableName], function (error) {
                done(error)
            })
        } else {
            done(new Error(`${tableName} does not exist`))
        }
    })
}
