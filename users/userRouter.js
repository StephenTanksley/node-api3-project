const express = require('express');
const users = require('./userDb')
const postRouter = require('../posts/postRouter')
const { 
  validatePost, 
  validateUserId,  
  validateUser } = require('../middleware/validate')

const router = express.Router();

router.post('/', validatePost(), validateUserId(), async (req, res, next) => {
  try {
    users.insert(req.body)
  }
  catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validatePost(), (req, res, next) => {
  users.insert(req.body)
  .then(user => {
    res
      .status(201)
      .json(user)
  })
  .catch(error => 
    next(error))
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

router.get('/:id', validateUserId(), async (req, res, next) => {
  try {
    const payload = await users.getById(req.params.id)
    res
      .status(200)
      .json(payload)
    } 
  catch (error) {
    next(error)
    }
});

router.get('/:id/posts', validateUserId(), async (req, res, next) => {
  try {
    const posts = await users.getUserPosts(req.params.id)
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

router.delete('/:id', validateUserId(), (req, res, next) => {
  try {
    users.remove(req.params.id)
    .then(user => {
      if(user > 0) {
        res
          .status(204)
          .json({ message: "The user has been deleted."})
      }
    })
  }
  catch (error) {
    next(error)
  }
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  try {
    users.update(req.params.id, req.params.body)
    .then(user => {
      res
        .status(200)
        .json(user)
    })
  }
  catch (error) {
    next(error)
  }

});



module.exports = router;
