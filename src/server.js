import express from 'express'
import ApiRoutes from './api/routes'
import HttpRoutes from './http/routes'

const app = express()

app.use(express.static('static'))

app.use('/api/v1', ApiRoutes)

app.use(HttpRoutes)

const PORT = process.env.NODE_ENV || 3000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})