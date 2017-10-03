import express from 'express'
import morgan from 'morgan'
import http2 from 'spdy'
import { port, key, cert } from './config'
import ApiRoutes from './api/routes'
import HttpRoutes from './http/routes'

const app = express()

app.use(morgan('dev'))

app.use(express.static('static'))

app.use('/api/v1', ApiRoutes)

app.use(HttpRoutes)

http2.createServer({key, cert}, app)
    .listen(port, () => {
        console.log(`Server started on https://localhost:${port}`)
    })