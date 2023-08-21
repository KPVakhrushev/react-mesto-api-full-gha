import React from 'react';
import useFormValidation from './useFormValidation';
import Popup from './Popup';

function PopupAddPlace(props){
  const {values, errors, ...funcs } = useFormValidation(()=>props.handleCardAdd(values), {name:'', link:''});
  const isFormDisabled = Object.keys(errors).length || !values.name || !values.link;

  React.useEffect(() => {
    funcs.setValues({name:'', link:''});
    funcs.setErrors({});
  }, [props.opened]);

  return (
    <Popup type="form" {...props}>
      <h2 className="popup__title">Новое место</h2>
      <form className="form" id={`form-add-card`} name='add-card' action="" method="post" onSubmit={funcs.handleSubmit} noValidate>
        <input className={`form__text-input ${errors.name && 'form__text-input_type_error'}`}  name="name" placeholder="Название" type="text"  minLength="2" maxLength="30" required  value={values.name} onChange={funcs.handleChange}/>
        <span  className="form__error">{errors.name}</span>

        <input className={`form__text-input ${errors.link && 'form__text-input_type_error'}`}  name="link" placeholder="Ссылка на картинку" type="url" required  value={values.link} onChange={funcs.handleChange}/>
        <span  className="form__error">{errors.link}</span>

        <button type="submit" className={`form__save-button ${isFormDisabled&&'form__save-button_disabled'}`} title='Создать' disabled={isFormDisabled}>Создать</button>
      </form>
    </Popup>
  )
}
export default PopupAddPlace;
