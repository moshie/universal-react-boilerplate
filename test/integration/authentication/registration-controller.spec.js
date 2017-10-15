// Vendor
import { expect } from 'chai'
import sinon from 'sinon'

// Testing
import registrationController from '../../../src/api/authentication/controllers/registration-controller'

// Dependencies
import User from '../../../src/api/authentication/models/User'
import jwt from 'jsonwebtoken'

// Fixtures
import userFixtures from '../../fixtures/model-users'
import validationFixture from '../../fixtures/validation'

describe('Registration Controller', () => {

    var user,
        sign

    beforeEach(() => {
        sign = sinon.stub(jwt, 'sign').returns('Iamatoken')
        user = sinon.stub(User.prototype, 'save')
    })

    afterEach(() => {
        sign.restore()
        user.restore()
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

        registrationController(req, res)
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

        registrationController(req, res)
    })

    it('should return a 200 response', () => {
        user.resolves({
            fullname: function () {}
        })
        var req = { body: userFixtures[0] }
        var res = {
            json: function () { return this },
            status: sinon.stub().returnsThis()
        }

        registrationController(req, res)

        return user()
            .then(() => sign)
            .then(() => {
                expect(res.status.calledOnce).to.be.true
                expect(res.status.firstCall.args[0]).to.be.a('number')
                expect(res.status.firstCall.args[0]).to.equal(200)
            })

    })

    it('should return the jwt token', () => {
        user.resolves({
            fullname: function () {}
        })
        var req = { body: userFixtures[0] }
        var res = {
            json: sinon.stub().returnsThis(),
            status: function () { return this }
        }

        registrationController(req, res)

        return user()
            .then(() => sign.resolves('Iamatoken'))
            .then(() => {
                expect(res.json.calledOnce).to.be.true
                expect(res.json.firstCall.args[0]).to.be.an('object')
                expect(res.json.firstCall.args[0].token).to.be.a('string')
            })
    })

    it('should return 500 when another error occurs', () => {
        user.rejects(
            new Error('I am a potential error')
        )
        var req = { body: userFixtures[0] }
        var res = {
            json: sinon.stub().returnsThis(),
            status: function () { return this }
        }

        registrationController(req, res)

        return user()
            .then(() => {
                throw new Error('Unexpected Resolve')
            }, (error) => {
                expect(error).instanceof(Error)
                expect(error.message).to.equal('I am a potential error')
            })
    })

})