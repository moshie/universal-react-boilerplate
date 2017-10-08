import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import setDate from '../set-date'

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    first_name: String,
    last_name: String,
    password: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
})

userSchema.methods.fullname = function () {
    var lastName = typeof this.last_name == 'undefined' ? '' : ` ${this.last_name}`
    return `${this.first_name}${lastName}`
}

userSchema.pre('save', function (next) {

    var { updated_at, created_at } = setDate(this)

    this.updated_at = updated_at
    this.created_at = created_at

    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            next()
        })
        .error((error) => {
            if (error instanceof Error) {
                return next(error)
            }

            next(
                new Error('Unexpected Error occurred!')
            )
        })

})

export default mongoose.model('User', userSchema)