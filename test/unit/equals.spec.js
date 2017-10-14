// Vendor
import { expect } from 'chai'

// Testing
import equals from '../../src/api/authentication/validation/rules/equals'

describe('#equals()', () => {

    it('should error when no values are passed', () => {
        expect(() => equals()).to.throw(TypeError)
    })

    it('should return true when one argument is passed', () => {
        expect(equals(1)).to.be.true
    })

    it('should return true when arguments match', () => {
        expect(equals(1, 1)).to.be.true
        expect(equals(1, 1, 1, 1)).to.be.true
        expect(equals('I am a string', 'I am a string')).to.be.true
        expect(equals('I am a string', 'I am a string', 'I am a string')).to.be.true
    })

    it('should return false when arguments do not match', () => {
        expect(equals(1, true)).to.be.false
        expect(equals(1, 1, 2, 1)).to.be.false
        expect(equals('I am a string', 'I am also a string')).to.be.false
        expect(equals('I am a string', 'I am also a string', 'I am a string')).to.be.false
        expect(equals(null, {})).to.be.false
    })

})