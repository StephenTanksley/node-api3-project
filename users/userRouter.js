const express = require('express');
const user = require('./userDb')
const postRouter = require('../posts/postRouter')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
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
