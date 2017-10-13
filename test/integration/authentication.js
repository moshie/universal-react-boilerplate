import { db } from '../../src/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import User from '../../src/api/authentication/models/User'

import DB from '../database-helpers'
import fixtures from '../fixtures/model-users'

import checkPassword from '../../src/api/authentication/check-password'
import authenticate from '../../src/api/authentication/authenticate'

mongoose.Promise = Promise;

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

    describe('#checkPassword()', () => {

        it('should reject if no user was found', () => {
            return checkPassword()
                .then((unexpectedResolve) => {
                    throw new Error('Unexpected Resolve')
                }, (error) => {
                    expect(error).instanceof(Error)
                    expect(error.message).to.equal('No user assigned to authenticate')
                })
        })

        it('should reject if passwords do not match', function() {
            this.slow(120)

            return User.findOne({ email: fixtures.user[0].email })
                .then((user) => checkPassword(user, 'myfailedpasswordAttempt'))
                .then((unexpectedResolve) => {
                    throw new Error('Unexpected Resolve')
                }, (error) => {
                    expect(error).instanceof(Error)
                    expect(error.message).to.equal('Authentication failed')
                })
        })

        it('should resolve with the user if authenticated successfully', function() {
            this.slow(120)

            return User.findOne({ email: fixtures.user[0].email })
                .then((user) => checkPassword(user, fixtures.user[0].password))
                .then((user) => {
                    expect(user).to.be.an('object')
                    expect(user.email).to.equal(fixtures.user[0].email)
                }, (error) => {
                    throw new Error('Unexpected Reject')
                })
        })

    })

    describe('#authenticate()', () => {

    })

})