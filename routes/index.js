const router = require('express').Router();

const { signIn, createUser, signOut } = require('../controllers/auth');

const auth = require('../middlewares/auth');

const userRouter = require('./user');
const movieRouter = require('./movie');
const { registrationValidator, loginValidator } = require('../middlewares/celebrateValidation');

router.post('/signup', registrationValidator, createUser);
router.post('/signin', loginValidator, signIn);
router.delete('/signout', signOut);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = { router };
