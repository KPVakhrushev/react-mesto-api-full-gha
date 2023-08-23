require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit')

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const { requestLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  DB_CONNECTION = 'mongodb://localhost:27017/mydb',
} = process.env;
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100})

const app = express();
mongoose.connect(DB_CONNECTION); // mongoose.set('debug', true);

app.get('/crash-test', () =>  setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0) );
app.use(limiter)
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }), cookieParser());
app.use(requestLogger);
app.use(cors);
app.use('/', authRouter);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(errors);

app.listen(PORT, console.log(`App listening on port ${PORT}`));
