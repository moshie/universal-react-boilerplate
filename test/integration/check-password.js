// Vendor
import { expect } from 'chai'

// Helpers
import DB from '../database-helpers'
import fixtures from '../fixtures/model-users'

// Model
import User from '../../src/api/authentication/models/User'

// Testing
import checkPassword from '../../src/api/authentication/check-password'

describe('#checkPassword()', () => {

    before(() => {
        return DB.connect()
    })

    beforeEach(() => {
        return DB.drop()
            .then(() => DB.fixtures(fixtures))
            .catch((error) => {throw error})
    })

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