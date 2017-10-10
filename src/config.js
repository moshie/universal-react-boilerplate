import path from 'path'
import fs from 'fs'

const PORT = process.env.NODE_ENV || 3000

exports.port = PORT

exports.key = fs.readFileSync(path.resolve(__dirname, '..', './server.key'))

exports.cert = fs.readFileSync(path.resolve(__dirname, '..', './server.crt'))

exports.db = {
    production: process.env.MONGODB || 'mongodb://127.0.0.1:27017/production',
    staging: process.env.MONGODB || 'mongodb://127.0.0.1:27017/staging',
    testing: 'mongodb://127.0.0.1:27017/testing'
}