import React from 'react';
import useFormValidation from './useFormValidation';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Popup from './Popup';

function PopupEditProfile(props){
  const currentUser = React.useContext(CurrentUserContext);
  const {values, errors, ...funcs } = useFormValidation(()=>{
    props.handleUpdateUser({...currentUser, name:values.name, about:values.about})
  }, currentUser);
  const isFormDisabled = Object.keys(errors).length;

  React.useEffect(() => {
    funcs.setValues(currentUser);
    funcs.setErrors({});
  }, [props.opened]);
  return (
    <Popup type="form" {...props}>
      <h2 className="popup__title">Редактировать профиль</h2>
      <form className="form" id={`form-edit-profile`} name='edit-profile' action="" method="post" onSubmit={funcs.handleSubmit} noValidate>
        <input className={`form__text-input ${errors.name && 'form__text-input_type_error'}`} name="name"  value={values.name}  onChange={funcs.handleChange} type="text" minLength="2" maxLength="40" required placeholder="Введите ваше имя" />
        <span className={`form__error`}>{errors.name}</span>

        <input className={`form__text-input ${errors.about && 'form__text-input_type_error'}`} name="about" value={values.about} onChange={funcs.handleChange} type="text" minLength="5" maxLength="200" required placeholder="Расскажите немного о себе" />
        <span className={`form__error`}>{errors.about}</span>
        <button type="submit" className={`form__save-button ${isFormDisabled&&'form__save-button_disabled'}`} title='Сохранить' disabled={isFormDisabled}>Сохранить</button>
      </form>
    </Popup>
  )
}

export default PopupEditProfile;
