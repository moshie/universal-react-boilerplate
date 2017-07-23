import express from 'express'
import Routes from './routes'

const app = express()

app.use(express.static('public'))
app.use(Routes)

const PORT = process.env.NODE_ENV || 3000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})