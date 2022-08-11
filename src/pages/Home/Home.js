import React, { useEffect, useRef } from 'react';
import './Home.css';
import HomeSingleItem from '../../components/HomeSingleItem/HomeSingleItem'
// import { mockData } from '../../mockData/mockData';
import { getAllGamesOptions } from '../../utils/axiosPaths';

import { useDispatch, useSelector } from 'react-redux';
import {
    getAllGames,
    gameSliceSelector
} from '../../store/gameSlice';
import SideNav from '../../components/SideNav/SideNav';

const HomeContainer = () => {

    const indexRef = useRef(0)



    const mockData = [{
        developer: "Blizzard Entertainment",
        freetogame_profile_url: "https://www.freetogame.com/diablo-immortal",
        game_url: "https://www.freetogame.com/open/diablo-immortal",
        genre: "MMOARPG",
        id: 521,
        platform: "PC (Windows)",
        publisher: "Blizzard Entertainment",
        release_date: "2022-06-02",
        short_description: "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
        thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
        title: "Diablo Immortal"
    }
    ]
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGames([getAllGamesOptions, { indexStart: indexRef.current }]))
        return () => {
        }
    }, [])


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
