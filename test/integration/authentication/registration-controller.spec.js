// Vendor
import { expect } from 'chai'
import sinon from 'sinon'

import registrationController from '../../../src/api/authentication/controllers/registration-controller'

import User from '../../../src/api/authentication/models/User'

const userFixture = {
    "email": "batman@example.com",
    "first_name": "Bruce",
    "last_name": "Wayne",
    "password": "b4tm4nIsTh3B3st",
    "password_confirmation": "b4tm4nIsTh3B3st"
}

const _validationErrors = [{ 
    location: 'body',
    param: 'email',
    value: '',
    msg: 'Please provide a valid Email' 
}]


describe('Registration Controller', () => {

    var user

    beforeEach(() => {
        user = sinon.stub(User.prototype, 'save').resolves({
            fullname: function () {}
        })
    })

    afterEach(() => {
        user.restore()
    })

    it('should return a 422 response', () => {
        let req = { _validationErrors }
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
        var req = { _validationErrors }
        var res = {
            status: function () { return this },
            json: function (json) {
                expect(json).to.be.an('object')
                expect(json).to.have.own.property('errors')
                expect(json.errors).to.have.property('email')
            }
        }

        registrationController(req, res)
    })

    it('should return a 200 response', () => {
        
        var req = { body: userFixture }
        var res = {
            json: function () { return this },
            status: sinon.stub().returnsThis()
        }

        registrationController(req, res)

        return user()
            .then(() => {
                expect(res.status.called).to.be.true
                expect(res.status.firstCall.args[0]).to.be.a('number')
                expect(res.status.firstCall.args[0]).to.equal(200)
            })

    })

    it('should save the user')

    it('should return the jwt token')

    it('should return 500 when another error occurs')

})