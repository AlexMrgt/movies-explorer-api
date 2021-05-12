// BadRequestError - нет смысла

const NOT_FOUND_SAVED_MOVIES = 'Похоже, у вас еще нет сохраненных фильмов';
const NOT_FOUND_MOVIE_FOR_DELETE = 'Похоже, вы не сохраняли этого фильма.';
const NOT_FOUND_USER_ON_EDIT = 'Пользователь с таким ID не найден';
const FIRBIDDEN_ERROR_ON_DELETE_FILM = 'Удалять чужие сохраненные фильмы запрещено';
const CONFLICT_ON_SAVE_MOVIE = 'Этот фильм уже у вас в избранном';

const CELEBRATE_EMAIL_ERRORS = {
  TYPE: 'В поле email должны быть данные типа String',
  EMAIL: 'Необходимо ввести корректный email ',
  REQUIRED: 'Поле email обязательно для заполнения',
};

const CELEBRATE_PASSWORD_ERRORS = {
  TYPE: 'В поле password должны быть данные типа String',
  MIN_LENGTH: 'Минимальная длина поля password - 8 символа',
  MAX_LENGTH: 'Максимальная длина поля password - 30 символов',
  REQUIRED: 'Поле password обязательно для заполнения',
};

const CELEBRATE_NAME_ERRORS = {
  TYPE: 'В поле name должны быть данные типа String',
  MIN_LENGTH: 'Минимальная длина поля name - 8 символа',
  MAX_LENGTH: 'Максимальная длина поля name - 30 символов',
};

const CELEBRATE_COUNTRY_ERRORS = {
  TYPE: 'В поле name должны быть данные типа String',
  REQUIRED: 'Поле country обязательно для заполнения',
};

const CELEBRATE_DIRECTOR_ERRORS = {
  TYPE: 'В director name должны быть данные типа String',
  REQUIRED: 'Поле director обязательно для заполнения',
};

const CELEBRATE_DURATION_ERRORS = {
  TYPE: 'В поле duration должны быть данные типа Number',
  REQUIRED: 'Поле duration обязательно для заполнения',
};

const CELEBRATE_YEAR_ERRORS = {
  TYPE: 'В поле year должны быть данные типа String',
  REQUIRED: 'Поле year обязательно для заполнения',
};

const CELEBRATE_DESCRIPTION_ERROR = {
  TYPE: 'В поле description должны быть данные типа String',
  REQUIRED: 'Поле description обязательно для заполнения',
};

const CELEBRATE_IMAGE_ERRORS = {
  TYPE: 'В image name должны быть данные типа String',
  REQUIRED: 'Поле image обязательно для заполнения',
};

const CELEBRATE_TRAILER_ERRORS = {
  TYPE: 'В поле trailer должны быть данные типа String',
  REQUIRED: 'Поле trailer обязательно для заполнения',
};

const CELEBRATE_THUMBNAIL_ERRORS = {
  TYPE: 'В поле thumbnail должны быть данные типа String',
  REQUIRED: 'Поле thumbnail обязательно для заполнения',
};

const CELEBRATE_MOVIE_ID_ERRORS = {
  TYPE: 'В поле movieId должны быть данные типа Number',
  REQUIRED: 'Поле movieId обязательно для заполнения',
};

const CELEBRATE_NAME_RU_ERRORS = {
  TYPE: 'В поле nameRU должны быть данные типа String',
  REQUIRED: 'Поле nameRU обязательно для заполнения',
};

const CELEBRATE_NAME_EN_ERRORS = {
  TYPE: 'В поле nameEN должны быть данные типа String',
  REQUIRED: 'Поле nameEN обязательно для заполнения',
};

const DB_EMAIL_ERRORS = {
  REQUIRED: 'Поле email обязательно для заполнения',
  UNIQUE_VAL: 'Такой email уже используется',
};

const DB_NAME_ERRORS = {
  REQUIRED: 'Поле name обязательно для заполнения',
  MIN_LENGTH: 'Поле Имя не может быть короче 2 символов',
  MAX_LENGTH: 'Поле Имя не может быть длиннее 30 символов',
};

const DB_PASSWORD_ERRORS = {
  REQUIRED: 'Поле password обязательно для заполнения',
};

module.exports = {
  NOT_FOUND_SAVED_MOVIES,
  NOT_FOUND_MOVIE_FOR_DELETE,
  NOT_FOUND_USER_ON_EDIT,
  FIRBIDDEN_ERROR_ON_DELETE_FILM,
  CONFLICT_ON_SAVE_MOVIE,

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

  DB_EMAIL_ERRORS,
  DB_NAME_ERRORS,
  DB_PASSWORD_ERRORS,
};
