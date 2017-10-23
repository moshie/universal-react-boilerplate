// Vendor
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const { expect } = chai

// Testing
import authenticationController from '../../../src/api/authentication/controllers/authentication-controller'

// Fixtures
import validationFixture from '../../fixtures/validation'
import userFixtures from '../../fixtures/model-users'

describe('Authentication Controller', () => {

    var authenticate

    beforeEach(() => {
        authenticate = sinon.stub()
    })

    it('should return a 422 response', () => {
        let req = { _validationErrors: validationFixture }
        let res = {
            status: function (responseCode) {
                expect(responseCode).to.be.a('number')
                expect(responseCode).to.equal(422)
                return this
            },
            json: function () { return this }
        }

        authenticationController(req, res)
    })

    it('should return an object with validation results', () => {
        var req = { _validationErrors: validationFixture }
        var res = {
            status: function () { return this },
            json: function (json) {
                expect(json).to.be.an('object')
                expect(json).to.have.own.property('errors')
                expect(json.errors).to.eql({
                    foo: { param: 'foo', msg: 'blabla' },
                    bar: { param: 'bar', msg: 'yay' }
                })
            }
        }

        authenticationController(req, res)
    })

    it('should return a 200 response', () => {
        authenticate.resolves('Iamatoken')

        var req = { 
            body: {
                email: userFixtures[0].email,
                password: userFixtures[0].password
            } 
        }
        var res = {
            status: function (status) { 
                expect(status).to.be.a('number')
                expect(status).to.equal(200)
                return this 
            },
            json: function (json) { return this }
        }

        authenticationController(req, res)
    })

    it('should return the jwt token', () => {
        authenticate.resolves('Iamatoken')

        var req = { 
            body: {
                email: userFixtures[0].email,
                password: userFixtures[0].password
            } 
        }
        var res = {
            status: function (status) { return this },
            json: function (json) {
                expect(res.json.data).to.be.an('object')
                expect(res.json.data.token).to.be.a('string')
                expect(res.json.data.token).to.equal('Iamatoken')
            }
        }

        authenticationController(req, res)
    })

    it('should return 400 when authentication fails', () => {
        authenticate.rejects(new Error('Authentication Failed'))

        var req = {
            body: {
                email: userFixtures[0].email,
                password: userFixtures[0].password
            }
        }
        var res = {
            status: function (status) { 
                expect(status).to.be.a('number')
                expect(status).to.equal(400)
                return this
            },
            json: function (json) { return this }
        }

        authenticationController(req, res)
    })

})