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
    user.findById(req.params.id)
      .then(item => {
        if (item) {
          req.user = item
          next()
        } else {
          res.status(404).json({ message: "Resource not found." })
        }
      })
  }
}

function validateUser(req, res, next) {
  return (req, res, next) => {

  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
