//putting models here to use... TODO: put models in server in case someone decides not to use this middleware.
const User = require('../users/users-model');

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] : ${method} <<  ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      req.user = user;
      console.log('validateUserId:', user);
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: ' you have been frozen by the wizard Aghanam; His reign will last 5000 years. Better luck next time.',
      error: error.message,
      stack: error.stack,
      time: new Date().toLocaleString,
    })
  }
  next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name ) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    console.log('validateUser: ', name);
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    req.text = text.trim();
    console.log('validatePost: ', text);
    next();
  }
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}