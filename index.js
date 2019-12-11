// code away!
const express = require('express')
const server = express()
const logger = require('./middleware/logger')
// const validate = require('./middleware/validate')

const userRouter = require('./users/userRouter')
 
server.use(logger('short')) 
server.use(express.json())
server.use("/", (req, res) => {
    res
    .json({ message: "Welcome to the Node API3 project!"})
})

server.use("/api/users", userRouter)

server.use((req, res) => {
res
.status(404)
.json({ message: "Route was not found." })
})
server.use((err, req, res, next) => {
console.log(err)
res
.status(500)
.json({ message: "An internal error occurred." })
})

const port = 8080
const host = "127.0.0.1"
 server.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})