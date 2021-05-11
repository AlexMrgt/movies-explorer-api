const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;

  return Movie.find({ owner })
    .orFail(() => new BadRequestError('Похоже, у вас нет сохраненных фильмов'))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  return Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } if (err.code === 11000) {
        return next(new ConflictError(`${Object.keys(err.keyValue).map((key) => `Сохраненный вами фильм с таким ${key} уже существует`)}`));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const currentUserId = req.user._id;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Похоже, вы не сохраняли этого фильма.'));
      }
      if (movie.owner.toString() !== currentUserId) {
        return next(new ForbiddenError('Удалять чужие сохраненные фильмы запрещено'));
      }
      return Movie.findOneAndDelete(movieId)
        .then((deletedMovie) => res.status(200).send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getSavedMovies,
};
