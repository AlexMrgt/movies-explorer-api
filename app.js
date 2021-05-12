const express = require('express');
const mongoose = require('mongoose');

// middlewares
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, DB_HOST } = require('./config');

const { router } = require('./routes');
const BadRequestError = require('./errors/BadRequestError');

const { SUCCESS_START_MESSAGE, CORS_WHITELIST, CORS_ERROR_MESSAGE } = require('./utils/constants');

const app = express();

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new BadRequestError(CORS_ERROR_MESSAGE));
    }
  },
};

app.use(requestLogger);
app.use(limiter);

// в будущем наверное надо будет поставить, но это надо тестить с фронтом
// app.set('trust proxy', 1);

app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(SUCCESS_START_MESSAGE);
});
