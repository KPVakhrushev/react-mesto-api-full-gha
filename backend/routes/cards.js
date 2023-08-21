const router = require('express').Router();
const {
  createCard, getCard, getCards, dislikeCard, likeCard, deleteCard,
} = require('../controllers/cards');

const validation = require('../validations/card');
const valiadtionId = require('../validations/objectId');

const fullCheck = [validation.check(), validation.errors()];
const idCheck = [valiadtionId.check('cardId'), validation.errors()];

router.route('/')
  .get(getCards)
  .post(fullCheck, createCard);

router.route('/:cardId')
  .get(idCheck, getCard)
  .delete(idCheck, deleteCard);

router.route('/:cardId/likes')
  .put(idCheck, likeCard)
  .delete(idCheck, dislikeCard);

module.exports = router;
