import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const Main = ( (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Аватарка профиля" src={currentUser.avatar} />
          <button className="profile__avatar-edit" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button"  type="button" title="Редактировать данные"  onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button"  type="button" title="Добавить место"  onClick={props.onAddPlace}></button>
      </section>

      <section>
        <ul className="elements">
          {props.cards.filter((item)=>item.link.indexOf('.gif')===-1).map((card, i)=>(
            <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike={props.onCardLike}  onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
})
export default Main;
