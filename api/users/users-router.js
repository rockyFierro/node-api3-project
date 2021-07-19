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

router.route('/')
  .get(logger, (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    User.get()
      .then(
        users => res.json(users)
      )
      .catch(next);
  })
  .post([logger, validateUser], (req, res, next) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    User.insert(req.body)
      .then(newUser => res.status(201).json(newUser))
      .catch(err => {
        console.log(err);
        next();
      });
  });

router.route('/:id')
  .get([logger, validateUserId], (req, res) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    res.json(req.user);
    console.log(req.user);
  })
  .put([logger, validateUserId, validateUser], (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    User.update()
      .then(resp => res.status(201).json())
      .catch(next)
    console.log(req.user);

  })
  .delete([logger, validateUserId], (req, res) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    console.log(req.user);

  });

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);

});

router.post('/:id/posts', validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);

});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'You are stanging in the cavern of the ice wizard. All around you are the carcasses of slain ice dwarfs.',
    // error: err.message,
    stack: err.stack,
  });

})
// do not forget to export the router
module.exports = router;