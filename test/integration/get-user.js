import { expect } from 'chai'

import DB from '../database-helpers'
import fixtures from '../fixtures/model-users'

import User from '../../src/api/authentication/models/User'
import getUser from '../../src/api/authentication/get-user'

describe('#getUser()', () => {

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

    it('should get a user based on their email', () => {
        return getUser(fixtures.user[0].email)
            .then((user) => {
                expect(user).to.be.an('object')
                expect(user.email).to.equal(fixtures.user[0].email)
                expect(user.first_name).to.equal(fixtures.user[0].first_name)
                expect(user.last_name).to.equal(fixtures.user[0].last_name)
                expect(user.created_at).instanceof(Date)
                expect(user.updated_at).instanceof(Date)
            }, (error) => {
                throw new Error(`Unexpected Error occured: ${error.message}`)
            })
    })

})