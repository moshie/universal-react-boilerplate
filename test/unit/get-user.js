import { expect } from 'chai'
import mongoose from 'mongoose'
import mochaMongoose from 'mocha-mongoose'

import { db } from '../../src/config'
import getUser from '../../src/api/authentication/get-user'
import User from '../../src/api/authentication/models/User'

const clearDB = mochaMongoose(db.testing)

describe('#getUser()', () => {

    before((done) => {
        if (mongoose.connection.db) {
            return done()
        }

        mongoose.connect(db.testing, { useMongoClient: true }, done)
    })

    before(function(done) {
        clearDB(done)
    });

    it('should throw error if an invalid email provided', () => {
        expect(() => getUser([])).to.throw(Error)
        expect(() => getUser({})).to.throw(Error)
        expect(() => getUser(null)).to.throw(Error)
        expect(() => getUser(undefined)).to.throw(Error)
        expect(() => getUser(true)).to.throw(Error)
    })

    it('should fail attempting to get a user', () => {
        return getUser('example-user@testing-example.com')
            .then((unexpectedResolve) => {
                throw new Error('Unexpected Resolve')
            }, (rejectedError) => {
                expect(rejectedError).instanceof(Error)
                expect(rejectedError.message).to.equal('No such user example-user@testing-example.com')
            })
    })

    // Should Get a user based on their email
    // https://semaphoreci.com/community/tutorials/a-tdd-approach-to-building-a-todo-api-using-node-js-and-mongodb
    // Mock the User model

})