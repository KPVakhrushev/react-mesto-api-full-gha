import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const  Card = ( ({card, onCardClick, onCardLike, onCardDelete}) => {
  function handleClick() {
    onCardClick(card);
  }
  function handleDelete(){
    onCardDelete(card);
  }
  function handleLike(){
    onCardLike(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn       = card.owner._id === currentUser._id;
  const isLiked     = card.likes.some(i => i._id === currentUser._id);

  const likeButtonClass =  `element__like ${isLiked && 'element__like_active'}` ;

  return (
    <li className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <h2 className="element__title">{card.name}</h2>
      <button className={likeButtonClass} type="button" onClick={handleLike}>{card.likes.length}</button>
      {isOwn && <button className="element__delete" type="button" onClick={handleDelete}></button>}
    </li>
  )
})
export default Card;
