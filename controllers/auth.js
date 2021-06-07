const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const { JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const { email, name } = req.body;
      return User.create({ email, name, password: hash });
    })
    .then((user) => res.status(201).send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(`${Object.keys(err.keyValue).map((key) => `Пользователь с таким ${key} уже существует`)}`));
      } if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      return next(err);
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie(
        'jwt',
        token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
      )
        .end();
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const signOut = (req, res) => {
  res.clearCookie('jwt')
    .end();
};

module.exports = {
  createUser,
  signIn,
  signOut,
};
