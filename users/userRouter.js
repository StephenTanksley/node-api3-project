const express = require('express');
const users = require('../users/userDb')
const posts = require('../posts/postDb')
const postRouter = require('../posts/postRouter')

//middleware import
const { 
  validatePost, 
  validateUserId,  
  validateUser } = require('../middleware/validate')

const router = express.Router();
router.use('/:id/posts', postRouter)


//adding a new user to the database
router.post('/', validateUser(), async (req, res, next) => {
  try {
    const user = { 
      name: req.body.name 
    }
    const newUser = await users.insert(user)
    res
      .status(201)
      .json(newUser)
  }
  catch (error) {
    next(error)
  }
});

//adding a new post attached to a user
router.post('/:id/posts', validatePost(), validateUserId(), async (req, res, next) => {
  try{
    const userPost = {
      text: req.body.text,
      user_id: req.params.id
    }
    const newUserPost = await posts.insert(userPost)
    res
      .status(201)
      .json(newUserPost)
    }
  catch (error) {
    next(error)
  }
});

//getting a list of all users from the database.
router.get('/', async (req, res, next) => {
  try {
    const userList = await users.get()
    res
      .status(200)
      .json(userList)
  }
  catch (error) {
    next(error)
  }
});

//trying to get a specific user
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

//getting a list of all posts associated with a user from a database.
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

//deleting a user from a database
router.delete('/:id', validateUserId(), async (req, res, next) => {
  try {
    const deletedUser = await users.remove(req.params.id)
    if(deletedUser > 0) {
      res
        .status(200)
        .json({messsage: "User was deleted"})
    }
  }
  catch (error) {
    next(error)
  }
});

//updating a user in the database.
router.put('/:id', validateUserId(), validateUser(), async (req, res, next) => {
  const user = {
    name: req.body.name
  }
  try {
    const updatedUser = await users.update(req.params.id, user)
    .then(udpatedUser => {
      res
        .status(200)
        .json(updatedUser)
    })
  }
  catch (error) {
    next(error)
  }
});

module.exports = router;
