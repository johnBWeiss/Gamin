import React, { useState } from 'react';
import './HomeSingleItem.css';

const HomeSingleItem = (singleItem) => {
  const { data } = singleItem
  const { title, thumbnail, release_date, publisher, short_description } = data
  let shortenedTitle = title.substring(0, 16)
  shortenedTitle = title.length >= 16 ? shortenedTitle + '...' : shortenedTitle

  let shortenedPublisher = title.substring(0, 16)
  shortenedPublisher = publisher.length >= 16 ? shortenedPublisher + '...' : shortenedPublisher



  const [showPopUp, setShowPopUp] = useState(false)

  const popUpHandler = () => {
    setShowPopUp(!showPopUp)
  }

  return (
    <div className='galleryContainer vertContainerFlex' onClick={popUpHandler}>
      <img
        className='HomeSingleItemImage'
        src={thumbnail}
        alt="item pic" />
      <div
        className='vertFlex itemDetailsContainer'>
        <div className='itemTitleMore'>
          {shortenedTitle}
        </div>
        <div>
          {release_date}
        </div>
        <div>
          {shortenedPublisher}
        </div>
      </div>
      {showPopUp && (
        <div className='popUp' onClick={popUpHandler}>
          <div className='popUpInnerContainer'>
            <div className='popUpTitle'>{title}</div>
            <div className='upperPopUpContent'>
              <img
                className='popUpImage'
                src={thumbnail}
                alt="pic"
              />
              <div className='popUpDescription'>
                {short_description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSingleItem;
