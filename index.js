// code away!
const express = require('express')
const server = express()
const logger = require('./middleware/logger')
// const validate = require('./middleware/validate')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
 
server.use(logger('long')) 
server.use(express.json())

server.use("/api/users", userRouter)
// server.use("/api/:id/posts", postRouter)
//pretty sure I should be adding my postRouter to my userRouter route since we'd need to chain posts off of users.


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