import React from 'react';

function Login({onSubmit}){
  const [email, setEmail] = React.useState('');
  const [password,  setPassword] = React.useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <div className="login">
      <h2 className="login__title">Войти</h2>
      <form className="login__form" id="" name="login" action="" method="post" onSubmit={handleSubmit}>
        <input className="login__input" name="email"    id="input-login"     type="email"    minLength="5" maxLength="40"  required placeholder="Email"  value={email}    onChange={(e)=>setEmail(e.target.value)} />
        <input className="login__input" name="password" id="input-password"  type="password" minLength="1" maxLength="200" required placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="on"/>
        <button type="submit" className="login__button" title="" >Войти</button>
      </form>
    </div>
  );
}
export default Login;
