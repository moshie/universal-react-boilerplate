import { db } from '../../config'
import { expect } from 'chai'
import getUser from './get-user'
import mongoose from 'mongoose'
import User from './models/User'

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

    describe('#getUser()', () => {

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

    })

})