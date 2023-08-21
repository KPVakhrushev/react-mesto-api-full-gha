const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { SECRET, TOKEN_EXPIRES_IN } = require('../utils/constants');

const sendUserOrError = (user, res, next) => {
  if (user) res.send(user);
  else next(new ErrorNotfound('User not found'));
};
const getUserById = (id, req, res, next) => {
  User.findById(id)
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const {
    email, name, about, avatar, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, about, avatar, password: hash,
    }))
    .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => next(err.code === 11000 ? new ErrorConflict('Пользователь c таким email уже зарегистрирован') : err));
};
module.exports.getUser = (req, res, next) => {
  getUserById(req.params.userId, req, res, next);
};
module.exports.getMe = (req, res, next) => {
  getUserById(req.user._id, req, res, next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true, runValidators: true })
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('password')
    .then((user) => {
      const authenticated = user && bcrypt.compareSync(password, user.password);
      if (!authenticated) throw new ErrorUnauthorized();
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: TOKEN_EXPIRES_IN });
      res.cookie('jwt', token, { maxAge: TOKEN_EXPIRES_IN * 1000, httpOnly: true }).send(user);
    })
    .catch(next);
};
