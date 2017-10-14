// Vendor
import { expect } from 'chai'

// Helpers
import fixtures from '../fixtures/model-users'

// Model
import User from '../../src/api/authentication/models/User'

// Testing
import authenticate from '../../src/api/authentication/authenticate'

describe.skip('#authenticate()', () => {

    before(() => {
        return DB.connect()
    })

    beforeEach(() => {
        return DB.drop()
            .then(() => DB.fixtures(fixtures))
            .catch((error) => {throw error})
    })

    it('should fail authentication', function() {
        this.slow(120)

        return authenticate(fixtures.user[0].email, 'FailedPasswordAttempt')
            .then((unexpectedResolve) => {
                throw new Error('Unexpected Resolve')
            }, (reject) => {
                expect(reject).instanceof(Error)
                expect(reject.message).to.equal('Authentication failed')
            })
    })

    it('should pass authentication and return a token', function() {
        this.slow(120)

        return authenticate(fixtures.user[0].email, fixtures.user[0].password)
            .then((token) => {
                expect(token).to.be.a('string')
            }, (unexpectedReject) => {
                throw new Error('Unexpected Reject')
            })
    })

})