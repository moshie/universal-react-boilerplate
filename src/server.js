import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import http2 from 'spdy'
import { port, key, cert, db } from './config'
import ApiRoutes from './api/routes'
import HttpRoutes from './http/routes'
import Promise from 'bluebird'

// Boot app
const app = express()

// Set promise agent
global.Promise = Promise

// Logger
app.use(morgan('dev'))

// Database
mongoose.connect(db.production, { useMongoClient: true })
mongoose.Promise = global.Promise

// Http request parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static assets
app.use(express.static('static'))

// Api endpoints
app.use('/api/v1', ApiRoutes)

// Http routes
app.use(HttpRoutes)

// Start server
http2.createServer({key, cert}, app)
    .listen(port, () => {
        console.log(`Server started on https://localhost:${port}`)
    })