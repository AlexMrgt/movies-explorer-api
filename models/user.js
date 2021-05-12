const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const NotFoundError = require('../errors/NotFoundError');

const {
  NOT_FOUND_ERROR_ON_LOGIN,
  DB_EMAIL_ERRORS,
  DB_NAME_ERRORS,
  DB_PASSWORD_ERRORS,
} = require('../utils/constants');

const emailValidator = [validator.isEmail, 'Неверный формат поля {PATH}'];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, DB_EMAIL_ERRORS.REQUIRED],
    unique: [true, DB_EMAIL_ERRORS.UNIQUE_VAL],
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, DB_PASSWORD_ERRORS.REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, DB_NAME_ERRORS.REQUIRED],
    minLength: [2, DB_NAME_ERRORS.MIN_LENGTH],
    maxLength: [30, DB_NAME_ERRORS.MAX_LENGTH],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError(NOT_FOUND_ERROR_ON_LOGIN));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotFoundError(NOT_FOUND_ERROR_ON_LOGIN));
          }
          return user;
        });
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
