// code away!
const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const validate = require('./middleware/validate')

app.use(logger('short'))
app.use(express.json())

app.use((req, res) => {
    res
    .status(404)
    .json({ message: "Route was not found." })
})

app.use((err, req, res, next) => {
    console.log(err)
    res
    .status(500)
    .json({ message: "An internal error occurred." })
})



const port = 8080
const host = "127.0.0.1"

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})