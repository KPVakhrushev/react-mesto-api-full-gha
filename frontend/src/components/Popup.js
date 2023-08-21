import { useRef, useEffect } from 'react';
function Popup ({type, theme, content, opened, onClose, children,...props}) {

  const rootRef = useRef(null);
  const close = function(){
    onClose();
    props.afterClose && props.afterClose();
  }
  const handleClickOverlay = function(event){
    event.target === rootRef.current && close();
  }
  const handleEscape = useRef();
  useEffect(() => {
    if(opened){
      handleEscape.current = (e) => (e.key === 'Escape') && close();
      document.addEventListener('keydown', handleEscape.current);
    }
    else{
      document.removeEventListener('keydown', handleEscape.current)
    }
  },[opened]);


  return (
    <div className={`popup ${theme?'popup_theme_'+theme:''} ${opened? 'popup_opened':''}`}  onClick={handleClickOverlay} ref={rootRef}>
      <div className={`popup__content ${type ? `popup__content_type_${type}`:''}`}>
        <button className="popup__close-button" type="button" onClick={close}></button>
        {children}
        {content}
      </div>
    </div>
  )
}
export default Popup;

