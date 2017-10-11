import { db } from '../../src/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import User from '../../src/api/authentication/models/User'

import mochaMongoose from 'mocha-mongoose'
const clearDB = mochaMongoose(db.testing)


describe('Authentication', () => {

    before((done) => {
        if (mongoose.connection.db) {
            return done()
        }

        mongoose.connect(db.testing, { useMongoClient: true }, done)
    })

    before(function(done) {
        clearDB(done)
    });


})