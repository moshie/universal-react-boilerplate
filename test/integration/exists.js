import { expect } from 'chai'

import DB from '../database-helpers'
import fixtures from '../fixtures/model-users'

import User from '../../src/api/authentication/models/User'
import exists from '../../src/api/authentication/validation/rules/exists'

describe('#exists()', () => {

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

    it('should reject if no item was found', () => {
        return exists(User, { email: 'Example@test.com' })
            .then((unexpected) => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal(`${User.collection.name} not found matching your search`)
            })
    })

    it('should resolve with the correct user', () => {
        return exists(User, { email: fixtures.user[0].email })
            .then((user) => {
                expect(user).to.be.an('object')
                expect(user.email).to.equal(fixtures.user[0].email)
                expect(user.first_name).to.equal(fixtures.user[0].first_name)
                expect(user.last_name).to.equal(fixtures.user[0].last_name)
                expect(user.created_at).instanceof(Date)
                expect(user.updated_at).instanceof(Date)
            }, (error) => {
                throw new Error(`Unexpected Reject ${error.message}`)
            })
    })

})