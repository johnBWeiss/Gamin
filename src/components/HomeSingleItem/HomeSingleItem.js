import React from 'react';
import { useDispatch } from 'react-redux';
import { changePopUpStatus } from '../../store/gameSlice'
import './HomeSingleItem.css';

const HomeSingleItem = (singleItem) => {
  const { data } = singleItem
  const { title, thumbnail, release_date, publisher } = data


  // TODO encapsulate to function tha recieves tring and how much to cut
  let shortenedTitle = title?.substring(0, 16) ?? ''
  shortenedTitle = title?.length >= 20 ? shortenedTitle + '...' : shortenedTitle

  let shortenedPublisher = publisher?.substring(0, 28) ?? ''
  shortenedPublisher = publisher?.length >= 28 ? shortenedPublisher + '...' : shortenedPublisher

  const disptach = useDispatch()

  const popUpHandler = () => {
    disptach(changePopUpStatus(data))
  }

  return (
    <div className='galleryContainer vertContainerFlex'>
      <img
        onClick={popUpHandler}
        className='HomeSingleItemImage'
        src={thumbnail}
        alt="item pic" />
      <div
        className='vertFlex itemDetailsContainer' onClick={() => popUpHandler()}>
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
    </div>
  );
};

export default HomeSingleItem;
