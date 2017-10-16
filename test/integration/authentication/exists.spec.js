// Vendor
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const { expect } = chai

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

        return expect(
            exists(User, { email: 'test@example.com' })
        ).to.be.rejectedWith(Error, `${User.collection.name} not found matching your search`)
    })

    it('should resolve true if no user exists with the same email', () => {
        user.yields(null, null)

        return expect(
            exists(User, { email: 'test@example.com' })
        ).to.eventually.be.true
    })

    it('should reject with error if an invalid model was provided', () => {
        return expect(
            exists()
        ).to.be.rejectedWith(Error, 'Invalid Model')
    })

    it('should reject with error if the search object is invalid')

    it('should reject in the result an error occurs with the error')

})