const express = require('express');
const mongoose = require('mongoose');

// middlewares
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const { PORT, DB_HOST } = require('./config');

const { router } = require('./routes');

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

const CORS_WHITELIST = [
  'https://movies.project.nomoredomains.monster',
  'https://api.movies.project.nomoredomains.monster',
  'http://movies.project.nomoredomains.monster',
  'http://api.movies.project.nomoredomains.monster',
  'http://localhost:3001'];

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(requestLogger);
app.use(limiter);

// в будущем
// app.set('trust proxy', 1);

app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Server error' : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app has been started succesfully');
});
