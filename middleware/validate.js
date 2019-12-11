const users = require('../users/userDb')
const posts = require('../posts/postDb')

//custom middleware

function validateUserId(req, res, next) {
    return (req, res, next) => {
      users.findById(req.params.id)
        .then(user => {
          if (user) {
            req.user = user
            console.log("User id is valid.")
            next()
          } else {
            res
              .status(400)
              .json({ message: "Invalid user id." })
          }
        })
    }
  }
  
  // Checks the res.body to see if there's content there.
  // If there isn't, there's an error. 
  function validateUser(req, res, next) {
    return (req, res, next) => {
      if(!req.body) {
        return res
                .status(400)
                .json({ message: "Missing user data"})
      }
      next()
    }
  }
  
  function validatePost(req, res, next) {
    return (req, res, next) => {
      if(!req.body) {
        return res
                .status(400)
                .json({ message: "Missing post data"})
      }
      if(!req.body.text) {
        return res
                .status(400)
                .json({ message: "Missing required text field." })
      }
      next()
    }
  }


module.exports = {
    validateUserID,
    validateUser,
    validatePost
}