const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NOT_FOUND_USER_ON_EDIT } = require('../utils/constants');

// в образовательных целях
// решил переписать на async/await - понятнее и лаконичнее код, к слову, не стал, а должен бы

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const editCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  const { name, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      _id,
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => new NotFoundError(NOT_FOUND_USER_ON_EDIT));
    return res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    }
    if (err.code === 11000) {
      return next(new ConflictError(`Email '${email}' уже используется`));
    }
    return next(err);
  }
};

module.exports = {
  getCurrentUser,
  editCurrentUser,
};
