const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('./authRouter');

// Get logged in user's information: /user
userRouter.get('/', auth.required, function(req, res, next) {
    userController.getUser(req, res, next);
});

// Update user information: /user
userRouter.put('/', auth.required, function(req, res, next) {
    userController.updateUser(req, res, next);
});

// Post data to login a user: /user/login
userRouter.post('/login', function(req, res, next) {
    userController.loginUser(req, res, next);
});

// Post data to register a new user: /user
userRouter.post('/', function(req, res, next) {
    userController.registerUser(req, res, next);
});

module.exports = userRouter;
