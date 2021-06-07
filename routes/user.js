const userRouter = require('express').Router();

const {
  getCurrentUser, editCurrentUser,
} = require('../controllers/user');

const { editUserValidator } = require('../middlewares/celebrateValidation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', editUserValidator, editCurrentUser);

module.exports = userRouter;
