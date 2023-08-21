import Popup from './Popup';
function PopupConfirm(props){
  return (
    <Popup type="form" {...props}>
      <h2 className="popup__title">Вы уверены?</h2>
      <form className="form">
        <button onClick={props.onConfirm} className={`form__save-button`} type='button'>Да</button>
      </form>
    </Popup>
  )
}
export default PopupConfirm;
