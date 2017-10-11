import chai from 'chai'
import setDate from './set-date'
import dateTime from 'chai-datetime'
chai.use(dateTime)
const { expect } = chai

describe('Authentication', () => {

    describe('#setDate()', () => {

        it('should throw an error if incorrect argument passed', () => {
            expect(() => setDate([])).to.throw(Error)
            expect(() => setDate(12)).to.throw(Error)
            expect(() => setDate(null)).to.throw(Error)
            expect(() => setDate(true)).to.throw(Error)
            expect(() => setDate(undefined)).to.not.throw(Error)
            expect(() => setDate({})).to.not.throw(Error)
        })

        it('should return an object with created_at and updated_at', () => {
            let model = setDate()

            expect(model).to.be.an('object')
            expect(model).to.include.all.keys('created_at', 'updated_at')
            expect(model.created_at).instanceof(Date)
            expect(model.updated_at).instanceof(Date)
        })

        it('created_at should stay the same', () => {
            let created_at = new Date(2010, 7, 20)
            let model = setDate({ created_at })

            expect(model).to.be.an('object')
            expect(model).to.include.all.keys('created_at', 'updated_at')
            expect(model.created_at).instanceof(Date)
            expect(model.updated_at).instanceof(Date)
            expect(model.created_at).to.equalDate(created_at)
        })

        it('should update updated_at to the current date', () => {
            let previousUpdatedAt = new Date(2010, 7, 20)
            let created_at = new Date(2010, 7, 20)
            let updatedModel = setDate({ created_at, updated_at: previousUpdatedAt })

            expect(updatedModel).to.be.an('object')
            expect(updatedModel).to.include.all.keys('created_at', 'updated_at')
            expect(updatedModel.created_at).instanceof(Date)
            expect(updatedModel.updated_at).instanceof(Date)
            expect(updatedModel.updated_at).afterDate(previousUpdatedAt)
        })

    })

})