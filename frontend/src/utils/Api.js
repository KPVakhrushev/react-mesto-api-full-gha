class Api {
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Authorization': authorization
    };
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
      headers: Object.assign({},this._headers, headers)
    }
    if(body){
      data.body = body
    }
    const fetchPromise = fetch(this._baseUrl+url, data).then( (result)=> result.ok?result : Promise.reject(result));
    return fetchPromise;
    //return (new Promise(resolve => setTimeout(resolve, 1000))).then(()=>fetchPromise);
  }
}

export default Api;
