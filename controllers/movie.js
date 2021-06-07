const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const {
  NOT_FOUND_SAVED_MOVIES,
  NOT_FOUND_MOVIE_FOR_DELETE,
  FIRBIDDEN_ERROR_ON_DELETE_FILM,
  CONFLICT_ON_SAVE_MOVIE,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;

  return Movie.find({ owner })
    .orFail(() => new NotFoundError(NOT_FOUND_SAVED_MOVIES))
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
        return next(new ConflictError(CONFLICT_ON_SAVE_MOVIE));
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

  return Movie.findById({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(NOT_FOUND_MOVIE_FOR_DELETE));
      }
      if (movie.owner.toString() !== currentUserId) {
        return next(new ForbiddenError(FIRBIDDEN_ERROR_ON_DELETE_FILM));
      }
      return Movie.findOneAndDelete({ _id: movieId })
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
