import React, { useEffect, useRef } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, gameSelector } from '../../store/gameSlice';
import HomeSingleItem from '../../components/HomeSingleItem/HomeSingleItem';
import SideNav from '../../components/SideNav/SideNav';
import CustomSpinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import logos from '../../assets/logos/logoController';
import PopUp from '../../components/PopUp/PopUp';
import topScroll from '../../assets/images/topScroll.png';


const Home = () => {
    const { rightPaginate, leftPaginate } = logos;
    const indexRef = useRef(0);
    const dispatch = useDispatch();
    const gameSlice = useSelector(gameSelector);
    const { homeGamesArray, homeGamesArrayTotalLength, homeGamesArrayTitle, pending, showPopUp, gameOptions } = gameSlice;

    /*
    the useEffect dispatches via the gameSlice a thunk request to get game information from the api.
    the gameOptions dependancy is there so the api call will happen again and rerender the page
     if the user changes the category filter, but not if the user clicks on the same icon again
    */

    useEffect(() => {
        dispatch(getAllGames([gameOptions, { indexStart: 0 }]));
    }, [gameOptions, dispatch])

    //The resetReffFatherHandler function resets the current index so each new search will display the results from the beginning

    const resetReffFatherHandler = () => {
        indexRef.current = 0;
    }

    /* 
    The Pagination function updates the index, so the api reuest will return an array according to the correct index.
     the logic in the function ensures the user cannot send a new index update request if the index is either over or under the limit.
 */

    const pagination = (operator) => {
        //true is pagination forward, false pagination back

        let current = operator ? indexRef.current + 8 : indexRef.current - 8;
        current = current < 0 ? 0 : current;

        //this condition ensures there will be no api call if equal to or over the limit for the index
        if (current === indexRef.current || current >= homeGamesArrayTotalLength) {
            return
        }
        indexRef.current = current;

        dispatch(getAllGames([gameOptions, { indexStart: current }]));
    }


    return (

        <>
            {!showPopUp && <div className='HomeContainer'>
                <div className='HomeInnerContainer'>
                    <div className='HomeDynamicTitle'>{homeGamesArrayTitle}
                    </div>
                    {!pending &&
                        <>
                            <Pagination left={{ src: leftPaginate.src, title: leftPaginate.title }} right={{ src: rightPaginate.src, title: rightPaginate.title }}
                                index={indexRef.current} gameArrayLength={homeGamesArrayTotalLength}
                                fatherPagination={pagination} />
                            <div className='HomeContainerGrid'>
                                {homeGamesArray?.length > 0 && <div
                                    className={'HomeInnerGrid'}>
                                    {homeGamesArray?.map((v, i) => (
                                        <div className='singleItem' key={v.id}>
                                            <HomeSingleItem data={v} />
                                        </div>
                                    ))}
                                </div>}
                            </div>
                            <Pagination left={{ src: leftPaginate.src, title: leftPaginate.title }} right={{ src: rightPaginate.src, title: rightPaginate.title }}
                                index={indexRef.current} gameArrayLength={homeGamesArrayTotalLength}
                                fatherPagination={pagination} />
                            <img src={topScroll} className='topScroll' alt='scroll to top' title='Scroll to top' onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }} />
                        </>}
                    {pending && <CustomSpinner />}
                </div>
                <SideNav resetReffHandler={resetReffFatherHandler} />
            </div >}
            {showPopUp && <PopUp />}
        </>);
};

export default Home;
