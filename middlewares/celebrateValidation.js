const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidator = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Невалидный URL');
};

const registrationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': 'В поле email должны быть данные типа String',
      'string.email': 'Необходимо ввести корректный email',
      'any.required': 'Поле email обязательно для заполнения',
    }),
    password: Joi.string().required().min(8).max(30)
      .messages({
        'string.base': 'В поле password должны быть данные типа String',
        'string.min': 'Минимальная длина поля password - 8 символа',
        'string.max': 'Максимальная длина поля password - 30 символов',
      }),
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'В поле name должны быть данные типа String',
      'string.min': 'Минимальная длина поля name - 8 символа',
      'string.max': 'Максимальная длина поля name - 30 символов',
    }),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': 'В поле email должны быть данные типа String',
      'string.email': 'Необходимо ввести корректный email',
      'any.required': 'Поле email обязательно для заполнения',
    }),
    password: Joi.string().required().min(8).max(30)
      .messages({
        'string.base': 'В поле password должны быть данные типа String',
        'string.min': 'Минимальная длина поля password - 8 символа',
        'string.max': 'Максимальная длина поля password - 30 символов',
      }),
  }),
});

const editUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'В поле ИМЯ должны быть данные типа String',
      'string.min': 'Минимальная длина поля ИМЯ - 2 символа',
      'string.max': 'Максимальная длина поля ИМЯ - 30 символов',
    }),
    email: Joi.string().email().messages({
      'string.base': 'В поле "Email" должны быть данные типа String',
      'string.email': 'Необходимо ввести корректный email',
    }),
  }),
});

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.base': 'В поле country должны быть данные типа String',
      'any.required': 'Поле country обязательно для заполнения',
    }),
    director: Joi.string().required().messages({
      'string.base': 'В поле director должны быть данные типа String',
      'any.required': 'Поле director обязательно для заполнения',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'В поле duration должны быть данные типа Number',
      'any.required': 'Поле duration обязательно для заполнения',
    }),
    year: Joi.string().required().messages({
      'string.base': 'В поле year должны быть данные типа String',
      'any.required': 'Поле year обязательно для заполнения',
    }),
    description: Joi.string().required().messages({
      'string.base': 'В поле description должны быть данные типа String',
      'any.required': 'Поле description обязательно для заполнения',
    }),
    image: Joi.string().required().custom(urlValidator).messages({
      'string.base': 'В поле image должны быть данные типа String',
      'any.required': 'Поле image обязательно для заполнения',
    }),
    trailer: Joi.string().required().custom(urlValidator).messages({
      'string.base': 'В поле trailer должны быть данные типа String',
      'any.required': 'Поле trailer обязательно для заполнения',
    }),
    thumbnail: Joi.string().required().custom(urlValidator).messages({
      'string.base': 'В поле thumbnail должны быть данные типа String',
      'any.required': 'Поле thumbnail обязательно для заполнения',
    }),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number().required().messages({
      'number.base': 'В поле movieId должны быть данные типа Number',
      'any.required': 'Поле movieId обязательно для заполнения',
    }),
    nameRU: Joi.string().required().messages({
      'string.base': 'В поле nameRU должны быть данные типа String',
      'any.required': 'Поле nameRU обязательно для заполнения',
    }),
    nameEN: Joi.string().required().messages({
      'string.base': 'В поле nameEN должны быть данные типа String',
      'any.required': 'Поле nameEN обязательно для заполнения',
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
