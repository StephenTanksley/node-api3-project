const express = require('express');
const users = require('../users/userDb')
const posts = require('./postDb')

const {
  validatePost,
  validatePostId
} = require('../middleware/validate')

const router = express.Router();

router.get('/', async (req, res, next) => {
  posts.get()
    .then(posts => {
      res
        .status(200)
        .json(posts)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validatePostId(), async (req, res, next) => {
  try {
    const posts = await posts.getById(req.params.id)
    .then(posts => {
      res
        .status(200)
        .json(posts)
    })
  }
  catch (error) {
    next(error)
  }
});

router.delete('/:id', validatePostId(), async (req, res, next) => {
try {
  posts.remove(req.params.id)
  .then(post => {
    if(post > 0) {
      res
        .status(204)
        .json({message: "The post has been deleted"})
    }
  })
}
  catch (error) {
    next(error)
  }
});

router.put('/:id', validatePostId(), validatePost(), async (req, res, next) => {
  try {
    const post = {
      text: req.body.text
    }
    const updatedPost = await posts.update(req.params.id, post)
    .then (post => {
      res
        .status(200)
        .json(post)
    })
  }
  catch (error) {
    next(error)
  }
});


module.exports = router;
