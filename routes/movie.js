const movieRouter = require('express').Router();

const {
  getSavedMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

const { addMovieValidator, movieIdValidator } = require('../middlewares/celebrateValidation');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', addMovieValidator, createMovie);
movieRouter.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = movieRouter;
