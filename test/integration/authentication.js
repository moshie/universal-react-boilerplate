import { db } from '../../src/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import User from '../../src/api/authentication/models/User'

import mochaMongoose from 'mocha-mongoose'
const clearDB = mochaMongoose(db.testing)


describe('Authentication', () => {

    before((done) => {
        DB.connect(done)
    })

    beforeEach(function(done) {
        DB.drop((error) => {
            if (error) {
                return done(error)
            }
            DB.fixtures(fixtures, done)
        })
    })

})