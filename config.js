require('dotenv').config();

const {
  JWT_SECRET = 'JWT_SECRET', DB_HOST = 'mongodb://localhost:27017/moviesdb', PORT = '3000',
} = process.env;

module.exports = {
  JWT_SECRET,
  DB_HOST,
  PORT,
};
