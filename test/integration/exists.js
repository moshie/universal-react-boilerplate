// Vendor
import { expect } from 'chai'

// Helpers
import DB from '../database-helpers'
import fixtures from '../fixtures/model-users'

// Model
import User from '../../src/api/authentication/models/User'

// Testing
import exists from '../../src/api/authentication/validation/rules/exists'

describe('#exists()', () => {

    before(() => {
        return DB.connect()
    })

    beforeEach(() => {
        return DB.drop()
            .then(() => DB.fixtures(fixtures))
            .catch((error) => {throw error})
    })

    it('should reject if no model was passed', () => {
        return exists()
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid Model')
            })
    })

    it('should reject if the model passed is invalid', () => {
        return exists({})
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid Model')
            })
    })

    it('should reject if no search object was passed', () => {
        return exists(User)
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid search object')
            })
    })

    it('should reject if array is passed as the search object', () => {
        return exists(User, [])
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid search object')
            })
    })

    it('should reject if string is passed as the search object', () => {
        return exists(User, '')
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid search object')
            })
    })

    it('should reject if int is passed as the search object', () => {
        return exists(User, 12)
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid search object')
            })
    })

    it('should reject if empty object is passed as the search object', () => {
        return exists(User, {})
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('Invalid search object')
            })
    })

    it('should resolve if a model was not found', () => {
        return exists(User, { email: 'Example@test.com' })
            .then((exists) => {
                expect(exists).to.be.true
            }, (error) => {
                throw new Error('Unexpected Error')
            })
    })

    it('should reject if the model exists', () => {
        return exists(User, { email: fixtures.user[0].email })
            .then((resolve) => {
                throw new Error(`Unexpected Resolve`)
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal(`${User.collection.name} not found matching your search`)
            })
    })

})