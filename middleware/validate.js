const users = require('../users/userDb')
const posts = require('../posts/postDb')

const validateUserID = () => {
    return (req, res, next) => {
        users.getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user
                next()
            } else {
                res
                    .status(404)
                    .json({ message: "Resource not found."})
            }
        })
    }
}

const validateUser = () => {

}

const validatePost = () => {
    return (req, res, next) => {
    }
}


module.exports = {
    validateUserID,
    validateUser,
    validatePost
}