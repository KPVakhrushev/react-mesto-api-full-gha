import Popup from './Popup';
import iconSuccess from '../images/success.svg';
import iconFail from '../images/fail.svg';
function PopupTooltip ({title, icon, ...props}){
  const icons = {
    'fail': iconFail,
    'success': iconSuccess
  }

  return (
    <Popup type='tooltip' {...props}>
      <img src={icons[icon]} />
      <h2 className="popup__title">{title}</h2>
    </Popup>
  )
}
export default PopupTooltip;
