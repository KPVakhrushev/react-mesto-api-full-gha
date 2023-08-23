import React from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom';

import api from '../utils/Api.js';
import Header from  './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';

import Popup from './Popup.js';
import PopupImage from './PopupImage.js';
import PopupEditProfile from './PopupEditProfile.js';
import PopupEditAvatar from './PopupEditAvatar.js';
import PopupAddPlace from  './PopupAddPlace.js';
import PopupTooltip from  './PopupTooltip.js';
import PopupConfirm from  './PopupConfirm.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const navigate = useNavigate();
  const tooltips = {
    regestrationSuccess: {title: "Вы успешно зарегистрировались!", icon:'success'},
    fail: {title: "Что-то пошло не так! Попробуйте ещё раз.", icon:'fail'}
  }

  const openPopup   = function(element, props){
    PopupElement.current = element;
    setPopupProps({...props, onClose:closePopup, opened:true});
    //setPopupOpened(true);
  }
  const closePopup  = function(){
    setPopupOpened(false);
  }
  const logout      = function(){
    api.logout().then(()=>{
      setCurrentUser({});
      navigate('/', { replace: true });
    })
    .catch((er)=>{
      handleError(er);
    })
  }
  const getUser   = function(){
    api.getMe().then((answer)=>{
      setCurrentUser(answer);
      navigate('/', { replace: true });
    })
    .catch((er)=>{
      setCurrentUser({});
      if(er.status!==401) handleError(er);
    })
   }
  const deleteCard = function(card){
    api.deleteCard(card._id)
      .then(()=>setCards(cards.filter(item=>item._id!==card._id)))
      .catch(handleError);
  }

  const handleError      = function(error){
    console.log(error);
    openPopup(PopupTooltip, {...tooltips.fail});
  }
  const handleCardDelete = function(card){
    openPopup(PopupConfirm, {onConfirm: ()=>{
      deleteCard(card);
      closePopup();
    }});
  }
  const handleCardLike   = function(card) {
    const isLiked = card.likes.some(i => {
      return i === currentUser._id
    });
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => setCards((items)=> items.map((c) => c._id === card._id ? newCard : c)))
      .catch(handleError);
  }
  const handleCardAdd    = function(card){
    api.addCard(card)
      .then((newCard)=>setCards([newCard, ...cards]))
      .then(()=>closePopup())
      .catch(handleError)
  }
  const handleUpdateUser = function(user){
    api.updateMe(user)
      .then(()=>setCurrentUser(user))
      .then(()=>closePopup())
      .catch(handleError);
  }
  const handleSignIn     = function(user){
    api.signIn(user)
      .then((answer)=>{
        setCurrentUser(answer);
        navigate('/',{ replace: true });
      })
      .catch(handleError)
  }
  const handleSignUp     = function(user){
    api.signUp(user)
      .then((answer)=>{
        openPopup(PopupTooltip, {...tooltips.regestrationSuccess, afterClose: ()=>navigate('/sign-in')});
      })
      .catch(handleError)
  }

  const [currentUser,  setCurrentUser]  = React.useState();
  const [popupProps,   setPopupProps]   = React.useState({opened:false});
  const [popupOpened,  setPopupOpened]  = React.useState(false);
  const [cards,        setCards]        = React.useState([]);

  const PopupElement = React.useRef();
  PopupElement.current = PopupElement.current??Popup;

  React.useEffect(()=>{
    //currentUser? api.getCards().then(cards=>setCards(cards)).catch(handleError) : getUser();
    if(currentUser?.name){
      api.getCards().then(cards=>setCards(cards)).catch(handleError)
    }
    if(currentUser===undefined){
      getUser();
    }
  }, [currentUser]);

  /* для прориcовки содержимого попапа до его открытия */
  React.useEffect(()=> setPopupOpened(popupProps.opened), [popupProps]);

  /* Пока не завершилась проверка пользователя, маршруты не должны обрабатываться */
  if(currentUser===undefined) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header  onLogout={logout} />
      <Routes>
        <Route path="/" element={<ProtectedRoute path="/" element={
          <Main
            onCardLike   = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onCardClick  = {(card)=>openPopup(PopupImage, {card})}
            onEditAvatar = {()=>openPopup(PopupEditAvatar,  {handleUpdateUser})}
            onEditProfile= {()=>openPopup(PopupEditProfile, {handleUpdateUser})}
            onAddPlace   = {()=>openPopup(PopupAddPlace,    {handleCardAdd} )}
            cards={cards}
          />
        }/>}/>
        <Route path="/sign-up" element={<Register  onSubmit={handleSignUp} />} />
        <Route path="/sign-in" element={<Login     onSubmit={handleSignIn} />} />
      </Routes>
      <Footer />

      {/* По ПР11 все попапы должны были явно присутствовать в дереве и для каждого был отдельный стейт открытости. ИМХО попап должен быть в дереве один, а меняться должно его содержимое, поэтому переделал, заодно поэксперемнтировал с useRef */}
      <PopupElement.current {...popupProps} opened={popupOpened}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
