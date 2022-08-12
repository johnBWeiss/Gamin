import React, { useEffect, useRef } from 'react';
import './Home.css';
import HomeSingleItem from '../../components/HomeSingleItem/HomeSingleItem'
import { getAllGamesOptions } from '../../utils/axiosPaths';

import { useDispatch, useSelector } from 'react-redux';
import {
    getAllGames,
} from '../../store/gameSlice';
import SideNav from '../../components/SideNav/SideNav';

const HomeContainer = () => {

    const indexRef = useRef(0)




    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGames([getAllGamesOptions, { indexStart: indexRef.current }]))
        return () => {
        }
    }, [dispatch])


    const gamesArray = useSelector((state) => state.gameSlice.homeGamesArray)
    const totalLength = useSelector((state) => state.gameSlice.homeGamesArrayTotalLength)
    const homeTitle = useSelector((state) => state.gameSlice.homeGamesArrayTitle)


    const pagination = (operator) => {
        let current = operator ? indexRef.current + 8 : indexRef.current - 8
        //check if it will return empty array because of max .
        current = current < 0 ? 0 : current;
        if (current === indexRef.current || current > totalLength) {// this condition being true means that the user tried to go over the boindsrirs of the result array. no need to dispatch in that case, so there is a return as not to waste compuation on unnesecarry dispatch
            return
        }

        indexRef.current = current; dispatch(getAllGames([getAllGamesOptions, { indexStart: current }]))
    }



    return (

        <div className='HomeContainer'>
            <div className='HomeInnerContainer'>
                <div className='HomeDynamicTitle'>{homeTitle}</div>
                <div onClick={() => { pagination(false) }}>botton left example</div>
                <div onClick={() => { pagination(true) }}>botton right example</div>
                <div>{indexRef.current}-{(totalLength < indexRef.current + 8) ? indexRef.current + totalLength - indexRef.current : indexRef.current + 8}</div>
                <div className='HomeContainerGrid'>
                    {gamesArray.length > 0 && <div
                        className={'HomeInnerGrid'}>
                        {gamesArray.map((v, i) => (
                            <div className='singleItem'>
                                <HomeSingleItem key={v.id} data={v} />
                            </div>
                        ))}
                    </div>}
                </div></div>
            <SideNav />

        </div >

    );
};

export default HomeContainer;
