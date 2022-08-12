import React from 'react'
import './SideNav.css'
import logos from '../../assets/logos/logoController'
import { gameByCategory, getAllGamesOptions } from '../../utils/axiosPaths';
import { changeOptions } from '../../store/gameSlice';
import { useDispatch } from 'react-redux';


export const SideNav = (resetReff) => {

    const { resetReffHandler } = resetReff
    const { shooter, racing, strategy, sports, zombie, martialArts, home, controller } = logos
    const logoArray = [home, controller, shooter, strategy, racing, sports, zombie, martialArts]

    const dispatch = useDispatch()



    const dispatchCategoryHandler = (v) => {
        resetReffHandler()

        if (v.title === 'home') {
            return
        }
        if (v.title === 'All') {
            dispatch(changeOptions(getAllGamesOptions))

        }

        else {
            dispatch(changeOptions({ ...gameByCategory, params: { category: v.title } }))
        }
    }
    return (

        // <div className='SideNavContainerBackground'>
        <div className='SideNavContainer'>
            <div className='SideNavInnerContainer'>
                {logoArray.map((v, i) => (

                    <img
                        onClick={() => { dispatchCategoryHandler(v); resetReff() }}
                        key={v.title}
                        src={v.src}
                        alt='logo'
                        title={v.title}
                        className='SideNavLogo'
                    />
                ))}








            </div>
        </div>
        // </div>
    )
}

export default SideNav