const router = require('express').Router();

const { signIn, createUser, signOut } = require('../controllers/auth');

const auth = require('../middlewares/auth');

const userRouter = require('./user');
const movieRouter = require('./movie');
const { registrationValidator, loginValidator } = require('../middlewares/celebrateValidation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registrationValidator, createUser);
router.post('/signin', loginValidator, signIn);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.delete('/signout', signOut);

router.use('/*', () => {
  throw new NotFoundError('Ресурса по этому адресу не нашлось :[ Пожалуйста, проверьте правильность URL-адреса');
});

module.exports = { router };
