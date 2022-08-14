import React from 'react';
import { useDispatch } from 'react-redux';
import { changePopUpStatus } from '../../store/gameSlice'
import './HomeSingleItem.css';

const HomeSingleItem = (singleItem) => {


  const { data } = singleItem
  const { title, thumbnail, release_date, publisher } = data
  const disptach = useDispatch()


  // the shorten function recives texts and slices them according to dynamic values.
  const shorten = (text, limit) => {
    let slicedText = text?.substring(0, limit) ?? ''
    slicedText = text?.length >= limit ? slicedText + '...' : slicedText
    return slicedText
  }

  let shortenedTitle = shorten(title, 19)
  let shortenedPublisher = shorten(publisher, 19)

  // the PopUpHandler function updates the state so the popup will show, along with the correct data as the payload
  const popUpHandler = () => {
    disptach(changePopUpStatus(data))
  }

  return (
    <div className='galleryContainer vertContainerFlex'>
      <img
        onClick={popUpHandler}
        className='HomeSingleItemImage'
        src={thumbnail}
        alt={title}
        title={title} />
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
