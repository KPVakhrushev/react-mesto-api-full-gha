class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  _get(url){
    return this._fetch('GET', url);
  }
  _json(method, url, data){
    return this._fetch(method, url, { 'Content-Type': 'application/json'}, JSON.stringify(data));
  }
  _delete(url){
    return this._fetch('DELETE', url);
  }
  _put(url){
    return this._fetch('PUT', url);
  }
  _fetch(method, url, headers={}, body=null){
    const data =  {
      method: method,
      credentials: "include",
      headers
    }
    if(body){
      data.body = body
    }
    const fetchPromise = fetch(this._baseUrl+url, data).then( (result)=> result.ok?result : Promise.reject(result));
    return fetchPromise;
    //return (new Promise(resolve => setTimeout(resolve, 1000))).then(()=>fetchPromise);
  }

  /* Методы для работы с карточками */
  getCards() {
    return this._get('/cards').then(res=> res.json() );
  }
  getMe(){
    return this._get('/users/me', true).then(res=> res.json() );
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
  /* Методы для работы с пользователями */
  signUp({password, email}){
    return this._json('POST', '/signup', {password, email}).then(res=> res.json() )
  }
  signIn({password, email}){
    return this._json('POST', '/signin',{password, email}).then(res=> res.json() )
  }
  logout(){
    return this._fetch('POST', '/logout');
  }
}

export default new Api(process.env.REACT_APP_API);
