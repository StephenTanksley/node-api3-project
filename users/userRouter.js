const express = require('express');
const users = require('./userDb')
const postRouter = require('../posts/postRouter')

const router = express.Router();

router.post('/', async (req, res) => {
  // do your magic!
});

router.post('/:id/posts', async (req, res) => {
  // do your magic!
});

router.get('/', (req, res, next) => {
  users.get()
    .then(users => {
      res
        .status(200)
        .json(users)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validateUserId(), async (req, res) => {
  // do your magic!
});

router.get('/:id/posts', async (req, res) => {
  // do your magic!
});

router.delete('/:id', async (req, res) => {
  // do your magic!
});

router.put('/:id', async (req, res) => {
  // do your magic!
});

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
  // do your magic!
}

module.exports = router;
