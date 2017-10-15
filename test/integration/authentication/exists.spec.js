// Vendor
import { expect } from 'chai'
import sinon from 'sinon'

// Helpers
import userFixtures from '../../fixtures/model-users'

// Model
import User from '../../../src/api/authentication/models/User'

// Testing
import exists from '../../../src/api/authentication/validation/rules/exists'

describe('#exists()', () => {

    var user;

    beforeEach(() => {
        user = sinon.stub(User, 'findOne')
    })

    afterEach(() => {
        user.restore()
    })

    it('should reject with error if a user was found with the same email', () => {
        user.yields(null, userFixtures[0])

        exists(User, { email: 'test@example.com' })
            .then(() => {
                throw new Error('Unexpected resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal(`${User.collection.name} not found matching your search`)
            })
    })

    it('should resolve if no user exists with the same email')

    it('should resolve with true')

    it('should reject with error if an invalid model was provided')

    it('should reject with error if the search object is invalid')

    it('should reject in the result an error occurs with the error')

})