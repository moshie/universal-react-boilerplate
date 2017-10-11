import { expect } from 'chai'
import User from './User'

describe('User Model', () => {

    var exampleUser = {
        email: 'example-user@testing-example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password'
    }

    // TODO: https://semaphoreci.com/community/tutorials/a-tdd-approach-to-building-a-todo-api-using-node-js-and-mongodb

    it('should be invalid if email is empty', (done) => {
        var u = new User()

        u.validate((err) => {
            expect(err.errors.email).to.exist
            done()
        })
    })

    it('should be invalid if first name is empty', (done) => {
        var u = new User()

        u.validate((err) => {
            expect(err.errors.first_name).to.exist
            done()
        })
    })

    it('should be invalid if password is empty', (done) => {
        var u = new User()

        u.validate((err) => {
            expect(err.errors.password).to.exist
            done()
        })
    })

})