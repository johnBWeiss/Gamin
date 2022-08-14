import React from 'react'
import logos from '../../assets/logos/logoController'
import './PopUp.css'
import { changePopUpStatus } from '../../store/gameSlice'
import { useDispatch, useSelector } from 'react-redux';
import { shorten } from '../../utils/functions';


const PopUp = () => {

    const { back, link } = logos
    const disptach = useDispatch()
    const popUpData = useSelector((state) => state.gameSlice.popUpData)
    const { title, thumbnail, release_date, publisher, short_description, game_url } = popUpData

    // the shorten function recives texts and slices them according to dynamic values.
    let even_shorter_description = shorten(short_description, 216)


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
                        {even_shorter_description}
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
                                title='Back to game search' />

                            <a href={game_url}
                                target='_blank'
                                rel='noreferrer noopener'
                                className='popUpLink'>
                                <img
                                    style={{ height: '100%' }}
                                    src={link.src}
                                    alt='link'
                                    title='Link to game page' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp