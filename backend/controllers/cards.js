const httpConstants = require('http2').constants;
const Card = require('../models/card');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorForbidden = require('../errors/ErrorForbidden');

const sendCardOrError = (card, res, next) => {
  if (card) res.send(card);
  else next(new ErrorNotfound('Card not found'));
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpConstants.HTTP_STATUS_CREATED).send(card))
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  Card.findById(_id)
    .then((card) => {
      if (!card) throw new ErrorNotfound('Card not found');
      if (req.user._id !== card.owner.toString()) throw new ErrorForbidden();
      Card.deleteOne({ _id })
        .then(() => sendCardOrError(card, res, next));
    })
    .catch(next);
};
