const users = require('../users/userDb')
const posts = require('../posts/postDb')

//refactoring middleware to arrow functions because it's more readable.

//custom middleware

const validateUserId = () => async (req, res, next) => {
    const userId = await users.getById(req.params.id)
    if(!userId) {
        return res
            .status(400)
            .json({ message: "Invalid user id."})
    }
    req.user = userId
    next()
};

// function validateUserId(req, res, next) {
//     return (req, res, next) => {
//       users.findById(req.params.id)
//         .then(user => {
//           if (user) {
//             req.user = user
//             console.log("User id is valid.")
//             next()
//           } else {
//             res
//               .status(400)
//               .json({ message: "Invalid user id." })
//           }
//         })
//     }
//   }
  
  // Checks the res.body to see if there's content there.
  // If there isn't, there's an error. 

const validateUser = () => async (req, res, next) => {
    if(!req.body) {
        return res
                .status(400)
                .json({ message: "Missing user data"})
      } else if (!req.body.name) {
          return res
                .status(400)
                .json({message: "Missing required name field."})
      }
      next()
}


//   function validateUser(req, res, next) {
//     return (req, res, next) => {
//       if(!req.body) {
//         return res
//                 .status(400)
//                 .json({ message: "Missing user data"})
//       } else if (!req.body.name) {
//           return res
//                 .status(400)
//                 .json({message: "Missing required name field."})
//       }
//       next()
//     }
//   }
  
const validatePost = () => async (req, res, next) => {
    if(!req.body) {
        return res
                .status(400)
                .json({ message: "Missing post data"})
    } else if(!req.body.text) {
        return res
                .status(400)
                .json({ message: "Missing required text field." })
        }
    next()
}


//   function validatePost(req, res, next) {
//     return (req, res, next) => {
//       if(!req.body) {
//         return res
//                 .status(400)
//                 .json({ message: "Missing post data"})
//       } else if(!req.body.text) {
//         return res
//                 .status(400)
//                 .json({ message: "Missing required text field." })
//       }
//       next()
//     }
//   }


const validatePostId = () => async (req, res, next) => {
    const userId = await users.getById(req.params.id)
    const postId = await posts.getById(req.params.postId)

    if(!userId) {
        return res
                .status(400)
                .json({message: "Invalid user id."})
    } else if (!postId) {
        return res
                .status(400)
                .json({message: "Invalid post id."})
    }
    req.post = postId
    next()
}

// function validatePostId(req, res, next) {
//     // do your magic!
//   }


module.exports = {
    validateUserId,
    validateUser,
    validatePost, 
    validatePostId
}