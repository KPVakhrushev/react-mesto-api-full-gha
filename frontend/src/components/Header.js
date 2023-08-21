import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


function Header({onLogout}){
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const isMobile = useMediaQuery({ query: '(max-width:600px)' })
  const [menuOpened, setMenuOpened] = React.useState(false);
  const handleClickLogout = function(e){
    e.preventDefault();
    onLogout();
  }
  const handleButtonClick = function(){
    setMenuOpened(!menuOpened);
  }
  let menu;
  let addHeaderLine = '';
  const logo = <Link to="/" title='На главную'><div className="header__logo"></div></Link>;

  if(currentUser.email){
    const userMenu =
      <div className='header__user-menu'>
        {currentUser.email}
        <Link className={`page__link header__logout`} onClick={handleClickLogout}>Выйти</Link>
      </div>
    menu = isMobile? <button className={`header__button  ${menuOpened && 'header__button_action_close'}`} onClick={handleButtonClick}></button> : userMenu;
    addHeaderLine = isMobile && menuOpened? <div className='header__line'>{userMenu}</div> : '';
  }
  else{
    menu = location.pathname=='/sign-in'? <Link className='page__link' to='/sign-up'>Регистрация</Link> : <Link className='page__link' to='/sign-in'>Войти</Link>
  }
  return (
    <header className="header page__header">
      {addHeaderLine}
      <div className='header__line'>{logo}{menu}</div>
    </header>
  );
}
export default Header;
