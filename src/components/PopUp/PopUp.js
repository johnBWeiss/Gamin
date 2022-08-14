import React from 'react'
import logos from '../../assets/logos/logoController'
import './PopUp.css'
import { changePopUpStatus } from '../../store/gameSlice'
import { useDispatch, useSelector } from 'react-redux';


export const PopUp = () => {

    const { back,
        //  heart,
        link } = logos

    const disptach = useDispatch()
    const popUpData = useSelector((state) => state.gameSlice.popUpData)
    const { title, thumbnail, release_date, publisher, short_description, game_url } = popUpData

    const popUpHandler = () => {
        disptach(changePopUpStatus({}))
    }

    return (
        <div className='popUp'>
            <div className='upperPopUpContent'>
                <img
                    className='popUpImage'
                    src={thumbnail}
                    alt="pic" />
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
                                target='_blank'
                                rel='noreferrer noopener'
                                className='popUpLink'
                            >
                                <img
                                    style={{ height: '100%' }}
                                    src={link.src}
                                    alt='link'
                                    title='Link to game page'
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
