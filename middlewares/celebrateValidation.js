const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  CELEBRATE_EMAIL_ERRORS,
  CELEBRATE_PASSWORD_ERRORS,
  CELEBRATE_NAME_ERRORS,

  CELEBRATE_COUNTRY_ERRORS,
  CELEBRATE_DIRECTOR_ERRORS,
  CELEBRATE_DURATION_ERRORS,
  CELEBRATE_YEAR_ERRORS,
  CELEBRATE_DESCRIPTION_ERROR,
  CELEBRATE_IMAGE_ERRORS,
  CELEBRATE_TRAILER_ERRORS,
  CELEBRATE_THUMBNAIL_ERRORS,
  CELEBRATE_MOVIE_ID_ERRORS,
  CELEBRATE_NAME_RU_ERRORS,
  CELEBRATE_NAME_EN_ERRORS,
} = require('../utils/constants');

const urlValidator = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Невалидный URL');
};

const registrationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': CELEBRATE_EMAIL_ERRORS.TYPE,
      'string.email': CELEBRATE_EMAIL_ERRORS.EMAIL,
      'string.empty': CELEBRATE_EMAIL_ERRORS.REQUIRED,
    }),
    password: Joi.string().required().min(8).max(30)
      .messages({
        'string.base': CELEBRATE_PASSWORD_ERRORS.TYPE,
        'string.min': CELEBRATE_PASSWORD_ERRORS.MIN_LENGTH,
        'string.max': CELEBRATE_PASSWORD_ERRORS.MAX_LENGTH,
        'string.empty': CELEBRATE_PASSWORD_ERRORS.REQUIRED,
      }),
    name: Joi.string().min(2).max(30).messages({
      'string.base': CELEBRATE_NAME_ERRORS.TYPE,
      'string.min': CELEBRATE_NAME_ERRORS.MIN_LENGTH,
      'string.max': CELEBRATE_NAME_ERRORS.MAX_LENGTH,
    }),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': CELEBRATE_EMAIL_ERRORS.TYPE,
      'string.email': CELEBRATE_EMAIL_ERRORS.EMAIL,
      'string.empty': CELEBRATE_EMAIL_ERRORS.REQUIRED,
    }),
    password: Joi.string().required().min(8).max(30)
      .messages({
        'string.base': CELEBRATE_PASSWORD_ERRORS.TYPE,
        'string.min': CELEBRATE_PASSWORD_ERRORS.MIN_LENGTH,
        'string.max': CELEBRATE_PASSWORD_ERRORS.MAX_LENGTH,
        'string.empty': CELEBRATE_PASSWORD_ERRORS.REQUIRED,
      }),
  }),
});

const editUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.base': CELEBRATE_NAME_ERRORS.TYPE,
      'string.min': CELEBRATE_NAME_ERRORS.MIN_LENGTH,
      'string.max': CELEBRATE_NAME_ERRORS.MAX_LENGTH,
    }),
    email: Joi.string().required().email().messages({
      'string.base': CELEBRATE_EMAIL_ERRORS.TYPE,
      'string.email': CELEBRATE_EMAIL_ERRORS.EMAIL,
      'string.empty': CELEBRATE_EMAIL_ERRORS.REQUIRED,
    }),
  }),
});

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.base': CELEBRATE_COUNTRY_ERRORS.TYPE,
      'string.empty': CELEBRATE_COUNTRY_ERRORS.REQUIRED,
    }),
    director: Joi.string().required().messages({
      'string.base': CELEBRATE_DIRECTOR_ERRORS.TYPE,
      'string.empty': CELEBRATE_DIRECTOR_ERRORS.REQUIRED,
    }),
    duration: Joi.number().required().messages({
      'number.base': CELEBRATE_DURATION_ERRORS.TYPE,
      'string.empty': CELEBRATE_DURATION_ERRORS.REQUIRED,
    }),
    year: Joi.string().required().messages({
      'string.base': CELEBRATE_YEAR_ERRORS.TYPE,
      'string.empty': CELEBRATE_YEAR_ERRORS.REQUIRED,
    }),
    description: Joi.string().required().messages({
      'string.base': CELEBRATE_DESCRIPTION_ERROR.TYPE,
      'string.empty': CELEBRATE_DESCRIPTION_ERROR.REQUIRED,
    }),
    image: Joi.string().required().custom(urlValidator).messages({
      'string.base': CELEBRATE_IMAGE_ERRORS.TYPE,
      'string.empty': CELEBRATE_IMAGE_ERRORS.REQUIRED,
    }),
    trailer: Joi.string().required().custom(urlValidator).messages({
      'string.base': CELEBRATE_TRAILER_ERRORS.TYPE,
      'string.empty': CELEBRATE_TRAILER_ERRORS.REQUIRED,
    }),
    thumbnail: Joi.string().required().custom(urlValidator).messages({
      'string.base': CELEBRATE_THUMBNAIL_ERRORS.TYPE,
      'string.empty': CELEBRATE_THUMBNAIL_ERRORS.REQUIRED,
    }),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number().required().messages({
      'number.base': CELEBRATE_MOVIE_ID_ERRORS.TYPE,
      'string.empty': CELEBRATE_MOVIE_ID_ERRORS.REQUIRED,
    }),
    nameRU: Joi.string().required().messages({
      'string.base': CELEBRATE_NAME_RU_ERRORS.TYPE,
      'string.empty': CELEBRATE_NAME_RU_ERRORS.REQUIRED,
    }),
    nameEN: Joi.string().required().messages({
      'string.base': CELEBRATE_NAME_EN_ERRORS.TYPE,
      'string.empty': CELEBRATE_NAME_EN_ERRORS.REQUIRED,
    }),
  }),
});

const movieIdValidator = celebrate(
  { params: Joi.object().keys({ movieId: Joi.string().hex().length(24) }) },
);

module.exports = {
  registrationValidator,
  loginValidator,
  editUserValidator,
  addMovieValidator,
  movieIdValidator,
};
