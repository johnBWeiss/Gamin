import React, { useState } from 'react';
import './HomeSingleItem.css';
import logos from '../../assets/logos/logoController'

const HomeSingleItem = (singleItem) => {
  const { data } = singleItem
  const { title, thumbnail, release_date, publisher, short_description, game_url, id } = data
  const { back, heart, link } = logos
  console.log(data);
  let shortenedTitle = title?.substring(0, 16) ?? ''
  shortenedTitle = title?.length >= 20 ? shortenedTitle + '...' : shortenedTitle

  let shortenedPublisher = publisher?.substring(0, 28) ?? ''
  shortenedPublisher = publisher?.length >= 28 ? shortenedPublisher + '...' : shortenedPublisher

  const [showPopUp, setShowPopUp] = useState(false)

  const popUpHandler = () => {
    setShowPopUp(!showPopUp)
  }

  return (
    <div className='galleryContainer vertContainerFlex'>
      <img
        onClick={popUpHandler}
        className='HomeSingleItemImage'
        src={thumbnail}
        alt="item pic" />
      <div
        className='vertFlex itemDetailsContainer' onClick={popUpHandler}>
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
        <div className='popUp' >
          <div className='upperPopUpContent'>
            <img
              className='popUpImage'
              src={thumbnail}
              alt="pic"
            />
            <div className='popUpDescriptionContainer'>
              <div className='popUpTitle'>{title}</div>

              <div className='popUpDescription'>
                {short_description}
              </div>
              <div className='popUpCommercialDetailsContainer'>
                <div className='popUpCommercialDetailsInnerContainer'>
                  <div>{publisher}</div>
                  <div>{release_date}</div>
                </div>
              </div>
              <div className='popUpMiniFooterContainer'>
                <div className='popUpMiniFooter'>

                  <img
                    className='popUpLogo'
                    src={back.src}
                    alt="back"
                    onClick={popUpHandler}
                    title='Back to game search'

                  />
                  {/* <img
                    className='popUpLogo'
                    src={heart.src}
                    alt="heart"
                  /> */}
                  <a
                    href={game_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className='popUpLink'


                  >
                    <img
                      style={{ height: '100%' }}
                      src={link.src}
                      alt="link"
                      title='Link to game page'
                    />
                  </a>


                </div>
              </div>








            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSingleItem;
