import Api from './Api.js';
import {configs} from './constants.js';

class ApiCards extends Api{
  getCards() {
    return this._get('/cards').then(res=> res.json() );
  }
  getMe(){
    return this._get('/users/me').then(res=> res.json() );
  }
  updateMe({name, about}){
    return  this._json('PATCH', '/users/me', {name: name, about:about}).then(res=> res.json() );
  }
  addCard({name, link}){
    return this._json('POST', '/cards', {name: name, link:link}).then(res=> res.json() );
  }
  deleteCard(id){
    return this._delete(`/cards/${id}`);
  }
  updateMeAvatar(avatarDataObject){
    return this._json('PATCH', '/users/me/avatar', avatarDataObject).then(res=> res.json() );
  }
  changeLikeCardStatus(id, liked){
    return (liked?this._put : this._delete).bind(this)(`/cards/${id}/likes`).then(res=> res.json() );
  }
}

export default new ApiCards(configs.apiCards);
