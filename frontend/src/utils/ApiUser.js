import Api from './Api.js'
import {configs} from './constants.js';

class ApiUser extends Api{
  signUp({password, email}){
    return this._json('POST', '/signup', {password, email}).then(res=> res.json() )
  }
  signIn({password, email}){
    return this._json('POST', '/signin',{password, email}).then(res=> res.json() )
  }
  checkJwt(token){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
    return this._fetch('GET', '/users/me', headers).then(res=> res.json() );
  }
}

export default new ApiUser(configs.apiUser);
