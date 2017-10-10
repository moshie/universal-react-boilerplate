import { db } from '../../config'
import { expect } from 'chai'
import getUser from './get-user'
import mongoose from 'mongoose'

describe('Authentication', () => {

    before((done) => {
        mongoose.connect(db.testing, { useMongoClient: true })
        mongoose.connection.on('error', (error) => {
            console.error(error)
        })
        mongoose.connection.once('open', () => {
            console.log('We are connected to test database!')
            done()
        })
    })

    describe('#getUser()', () => {

        it('should fail attempting to get a user', (done) => {
            return getUser('example-user@testing-example.com')
                .catch((rejectedError) => {
                    expect(rejectedError).instanceof(Error)
                })
        })
        
    })

})