const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const ErrorValidation = require('./errors/ErrorValidation');
const ErrorNotfound = require('./errors/ErrorNotfound');
const ErrorDefault = require('./errors/ErrorDefault');
const validationUser = require('./validations/user');

const auth = require('./middlewares/auth');

const {
  PORT = 3000,
  DB_CONNECTION = 'mongodb://localhost:27017/mydb',
} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB_CONNECTION); // mongoose.set('debug', true);

app.post('/signin', validationUser.authCheck(), validationUser.errors(), login);
app.post('/signup', validationUser.fullCheck(), validationUser.errors(), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(() => { throw new ErrorNotfound('Страница не найдена'); });
app.use((err, req, res, next) => {
  console.log('ERROR: ', err.message);
  if (!err.code) {
    if (err.name === 'CastError') {
      throw new ErrorValidation(err.message);
    }
    if (err.name === 'ValidationError') {
      throw new ErrorValidation(err.message);
    }
    throw new ErrorDefault();
  } else next(err);
});
app.use((err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
