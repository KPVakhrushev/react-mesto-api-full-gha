import React from 'react';
import useFormValidation from './useFormValidation';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Popup from './Popup';

function PopupEditAvatar(props){
  const currentUser = React.useContext(CurrentUserContext);
  const {values, errors, ...funcs } = useFormValidation(()=>{
    props.handleUpdateUser({...currentUser, avatar:values.avatar})
}, {avatar: currentUser.avatar});
  const isFormDisabled = Object.keys(errors).length;

  React.useEffect(() => {
    funcs.setValues(currentUser);
    funcs.setErrors({});
  }, [props.opened]);

  return (
    <Popup {...props} type='form'>
        <h2 className="popup__title">Обновить аватар</h2>
        <form className="form" name='edit-profile' action="" method="post" onSubmit={funcs.handleSubmit} noValidate>
          <input className={`form__text-input ${errors.avatar && 'form__text-input_type_error'}`} name="avatar"  id="input-avatar-src"  placeholder="Ссылка на картинку аватара" type="url" required value={values.avatar}  onChange={funcs.handleChange}/>
          <span className="form__error">{errors.avatar}</span>

          <button type="submit" className={`form__save-button ${isFormDisabled&&'form__save-button_disabled'}`} title='Сохранить' disabled={isFormDisabled}>Сохранить</button>
        </form>
    </Popup>
  )
}
export default PopupEditAvatar;
