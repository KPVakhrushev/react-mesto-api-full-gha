import Popup from "./Popup";
import React from 'react';
import noimage from '../images/no_image.jpg';

function PopupImage ({card, ...props}){
  const [src, setSrc] = React.useState([card.link, 0]);
  const handleImageLoad  = ()=>setSrc([card.link, 200]);
  const handleImageError = ()=>setSrc([card.link, 404]);
  const[link, status] = src;
  const loaded = link==card.link && status;
  return (
    <Popup theme="dark" type="image" {...props}>
      <img className={`popup__image ${ (status!==200 || !loaded) && 'page__hidden'}`} alt={card.name} src={card.link} onLoad={handleImageLoad} onError={handleImageError} />
      {status==404 && loaded  && <img className={`popup__image`} alt="Нет изображения" src={noimage}/>}
      <h2  className="popup__image-title">{loaded?card.name:'Загружаем....'}</h2>
    </Popup>
  )
}
export default PopupImage;
