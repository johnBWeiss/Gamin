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




    return (

        <div className='HomeContainer'>
            <div className='HomeContainerGrid'>
                {gamesArray.length > 0 && <div
                    className={'HomeInnerGrid'}>
                    {gamesArray.map((v, i) => (
                        <div className='singleItem'>
                            <HomeSingleItem key={v.id} data={v} />
                        </div>
                    ))}
                </div>}
            </div>
            <SideNav />

        </div >

    );
};

export default HomeContainer;
