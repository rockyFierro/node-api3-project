const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
const { logger,
  validateUserId,
  validateUser,
  validatePost } = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
router.all('/', logger);
router.all('/:id', [
  validateUserId,
  validateUser,
  logger,
]);
router.all('/:id/*', [
  logger,
  validateUserId,
  validateUser,
  validatePost,
]);

router.route('/')
  .get((req, res) => {
    // RETURN AN ARRAY WITH ALL THE USERS
  })
  .post((req, res) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
  });

router.route('/:id')
  .get((req, res) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    console.log(req.user);
  })
  .put((req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    console.log(req.user);

  })
  .delete((req, res) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    console.log(req.user);

  });

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);

});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);

});

// do not forget to export the router
module.exports = router;