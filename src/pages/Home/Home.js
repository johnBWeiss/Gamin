import React, { useEffect, useRef } from 'react';
import './Home.css';
import HomeSingleItem from '../../components/HomeSingleItem/HomeSingleItem'

import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, } from '../../store/gameSlice';
import SideNav from '../../components/SideNav/SideNav';
import logos from '../../assets/logos/logoController'
import gear from '../../assets/images/Gear.png'
import topScroll from '../../assets/images/topScroll.png'

import { PopUp } from '../../components/PopUp/PopUp';



const HomeContainer = () => {
    const { rightPaginate, leftPaginate } = logos
    const gameOptions = useSelector((state) => state.gameSlice.gameOptions)
    const indexRef = useRef(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGames([gameOptions, { indexStart: 0 }]))
        return () => {
        }
    }, [gameOptions, dispatch])


    const gamesArray = useSelector((state) => state.gameSlice.homeGamesArray)
    const totalLength = useSelector((state) => state.gameSlice.homeGamesArrayTotalLength)
    const homeTitle = useSelector((state) => state.gameSlice.homeGamesArrayTitle)
    const pending = useSelector((state) => state.gameSlice.pending)
    const showPopUp = useSelector((state) => state.gameSlice.showPopUp)

    const resetReffFatherHandler = () => {
        indexRef.current = 0
    }

    const pagination = (operator) => {
        let current = operator ? indexRef.current + 8 : indexRef.current - 8
        //check if it will return empty array because of max .
        current = current < 0 ? 0 : current;
        if (current === indexRef.current || current >= totalLength) {// this condition being true means that the user tried to go over the boindsrirs of the result array. no need to dispatch in that case, so there is a return as not to waste compuation on unnesecarry dispatch
            return
        }
        indexRef.current = current;
        dispatch(getAllGames([gameOptions, { indexStart: current }]))
    }

    return (

        <>
            {!showPopUp && <div className='HomeContainer'>
                <div className='HomeInnerContainer'>
                    <div className='HomeDynamicTitle'>{homeTitle}</div>
                    {!pending && <div className='paginationContainer'>
                        <img className='paginateButton' src={leftPaginate.src} alt={leftPaginate.title} onClick={() => { pagination(false) }} />
                        <div className='indexCurrent'>{indexRef.current + 1}-{(totalLength < indexRef.current + 8) ? indexRef.current + totalLength - indexRef.current : indexRef.current + 8} / {totalLength}</div>
                        <img className='paginateButton' src={rightPaginate.src} alt={rightPaginate.title} onClick={() => { pagination(true) }} />
                    </div>}
                    {pending && <img src={gear} alt={'spinner'} className='spinner' />}
                    {!pending && <div className='HomeContainerGrid'>
                        {gamesArray.length > 0 && <div
                            className={'HomeInnerGrid'}>
                            {gamesArray.map((v, i) => (
                                <div className='singleItem'>
                                    <HomeSingleItem key={v.id} data={v} />
                                </div>
                            ))}
                        </div>}
                    </div>}
                    {!pending && <><div className='paginationContainer'>
                        <img className='paginateButton' src={leftPaginate.src} alt={leftPaginate.title} onClick={() => { pagination(false) }} />
                        <div className='indexCurrent'>{indexRef.current + 1}-{(totalLength < indexRef.current + 8) ? indexRef.current + totalLength - indexRef.current : indexRef.current + 8} / {totalLength}</div>
                        <img className='paginateButton' src={rightPaginate.src} alt={rightPaginate.title} onClick={() => { pagination(true) }} />
                    </div>
                        <img src={topScroll} className='topScroll' alt='scroll to top' title='Scroll to top' onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }} />
                    </>}
                </div>
                <SideNav resetReffHandler={resetReffFatherHandler} />

            </div >
            }
            {showPopUp && <PopUp />
            }        </>);
};

export default HomeContainer;
